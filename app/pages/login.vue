<script setup lang="ts">

definePageMeta({
  middleware: 'guest-only'
})

const email = ref('')
const password = ref('')
const error = ref<string | null>(null);


async function add() {
  error.value = null;

  if (!email.value || !password.value) {
    error.value = "Enter All fields"
  }


  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    });

    window.location.href = '/dashboard';

  } catch (error: any) {
    error.value = error?.statusMessage
    console.log(error)
  }
}

</script>
<template>
  <div class=" flex justify-center items-center mt-50">

    <form @submit.prevent="add">
      <div class="space-y-5">
        <Label>Email</Label>
        <Input v-model="email" class="w-100" />
        <Label>Password</Label>
        <Input v-model="password" class="w-100" />
        <div class="flex justify-between">
          <Button @click="add">Login</Button>
          <NuxtLink to="/register"><Button>Register</Button></NuxtLink>
        </div>

        <div v-if="error">{{ error }}</div>

      </div>
    </form>







  </div>
</template>
