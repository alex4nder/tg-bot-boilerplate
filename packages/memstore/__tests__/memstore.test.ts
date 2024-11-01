import MemStore from "../src";
import Redis from "ioredis";
import { config } from "@repo/config";

const { appName } = config;

jest.mock("ioredis");

describe("MemStore", () => {
  beforeAll(() => {
    const mockRedisInstance = {
      setex: jest.fn(),
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
      keys: jest.fn(),
      exists: jest.fn(),
      flushall: jest.fn(),
    };

    (Redis as unknown as jest.Mock).mockImplementation(() => mockRedisInstance);

    (MemStore as any).redis = mockRedisInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set a value with TTL", async () => {
    const mockSetex = MemStore["redis"].setex as jest.Mock;
    await MemStore.set({
      key: "testKey",
      value: JSON.stringify({ name: "Alice" }),
      ttl: 300,
    });
    expect(mockSetex).toHaveBeenCalledWith(
      `${appName}:testKey`,
      300,
      JSON.stringify({ name: "Alice" }),
    );
  });

  it("should set a value without TTL", async () => {
    const mockSet = MemStore["redis"].set as jest.Mock;
    await MemStore.set({ key: "testKeyNoTTL", value: "testValue" });
    expect(mockSet).toHaveBeenCalledWith(
      `${appName}:testKeyNoTTL`,
      "testValue",
    );
  });

  it("should get a value", async () => {
    const mockGet = MemStore["redis"].get as jest.Mock;
    mockGet.mockResolvedValue(JSON.stringify({ name: "Alice" }));
    const result = await MemStore.get<{ name: string }>("testKey");
    expect(result).toEqual({ name: "Alice" });
  });

  it("should return null for a non-existent key", async () => {
    const mockGet = MemStore["redis"].get as jest.Mock;
    mockGet.mockResolvedValue(null);
    const result = await MemStore.get("nonExistentKey");
    expect(result).toBeNull();
  });

  it("should delete a key", async () => {
    const mockDel = MemStore["redis"].del as jest.Mock;
    mockDel.mockResolvedValue(1);
    const result = await MemStore.del("testKey");
    expect(mockDel).toHaveBeenCalledWith(`${appName}:testKey`);
    expect(result).toBe(true);
  });

  it("should check if a key exists", async () => {
    const mockExists = MemStore["redis"].exists as jest.Mock;
    mockExists.mockResolvedValue(1);
    const result = await MemStore.exists("testKey");
    expect(mockExists).toHaveBeenCalledWith(`${appName}:testKey`);
    expect(result).toBe(true);
  });

  it("should get all keys matching a pattern", async () => {
    const mockKeys = MemStore["redis"].keys as jest.Mock;
    mockKeys.mockResolvedValue(["key1", "key2"]);
    const result = await MemStore.keys("key*");
    expect(mockKeys).toHaveBeenCalledWith(`${appName}:key*`);
    expect(result).toEqual(["key1", "key2"]);
  });

  it("should flush all keys", async () => {
    const mockFlushAll = MemStore["redis"].flushall as jest.Mock;
    mockFlushAll.mockResolvedValue("OK");
    const result = await MemStore.flushAll();
    expect(mockFlushAll).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
