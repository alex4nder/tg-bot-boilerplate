<template>
  <ThemeSwitcher />
  <div class="card flex justify-center">
    <Toast />

    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
      <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">
          {{ $form.username.error?.message }}
        </Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";
import axios from "axios";

let tg = window.Telegram.WebApp;

const toast = useToast();

const initialValues = reactive({
  username: "",
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.username) {
    errors.username = [{ message: "Username is required." }];
  }

  return {
    errors,
  };
};

const onFormSubmit = ({ valid, states }) => {
  console.log(tg)
  if (valid) {
    axios
      .post(`${import.meta.env.VITE_API_URL}/users/update`, { userId: tg.initDataUnsafe.user.id, username: states.username.value })
      .then((response) => {
        toast.add({
          severity: "success",
          summary: "Username updated",
          life: 3000,
        });
      }).catch(function (error) {
        toast.add({
          severity: "error",
          summary: error,
          life: 3000,
        });
      });
  }
};
</script>
