import { config } from "@repo/config";
import { logger } from "@repo/logger";
import Redis, { RedisOptions } from "ioredis";

interface RedisSetOptions {
  key: string;
  value: string;
  ttl?: number;
}

const { redisOptions } = config;

export default class MemStore {
  private static redis: Redis;

  private static initialize() {
    if (!this.redis) {
      this.redis = new Redis({
        ...(redisOptions as RedisOptions),
        retryStrategy: this.retryStrategy,
      });

      this.initializeEventListeners();
    }
  }

  private static initializeEventListeners() {
    this.redis.on("connect", () => logger.info("Redis connected"));
    this.redis.on("ready", () => logger.info("Redis connection is ready"));
    this.redis.on("error", (error) =>
      logger.error("Redis connection error:", error),
    );
  }

  private static retryStrategy(times: number): number | null {
    const delay = Math.min(times * 50, 2000);
    if (times > 10) {
      logger.error("Max retry attempts for Redis reached");
      return null;
    }
    return delay;
  }

  static async set({ key, value, ttl }: RedisSetOptions): Promise<boolean> {
    this.initialize();
    try {
      ttl
        ? await this.redis.setex(key, ttl, value)
        : await this.redis.set(key, value);
      return true;
    } catch (error) {
      logger.error(`Error setting value in Redis for key "${key}":`, error);
      return false;
    }
  }

  static async get<T>(key: string): Promise<T | null> {
    this.initialize();
    try {
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error("Error getting value from Redis:", error);
      return null;
    }
  }

  static async del(key: string): Promise<boolean> {
    this.initialize();
    try {
      const result = await this.redis.del(key);
      return result === 1;
    } catch (error) {
      logger.error("Error deleting value from Redis:", error);
      return false;
    }
  }

  static async keys(pattern: string = "*"): Promise<string[]> {
    this.initialize();
    try {
      const keys = await this.redis.keys(pattern);
      return keys;
    } catch (error) {
      logger.error(
        `Error fetching keys with pattern "${pattern}" from Redis:`,
        error,
      );
      return [];
    }
  }

  static async exists(key: string): Promise<boolean> {
    this.initialize();
    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`Error checking existence of key "${key}" in Redis:`, error);
      return false;
    }
  }

  static async flushAll(): Promise<boolean> {
    this.initialize();
    try {
      await this.redis.flushall();
      logger.info("All keys have been flushed from Redis");
      return true;
    } catch (error) {
      logger.error("Error flushing all keys from Redis:", error);
      return false;
    }
  }
}
