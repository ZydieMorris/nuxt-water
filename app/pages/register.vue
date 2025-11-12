<template>
  <div>
    <div class=" flex justify-center items-center mt-50">
      <form @submit.prevent="add">
        <div v-if="successMessage">{{ successMessage }}</div>

        <div class="space-y-5">
          <Label>Username</Label>
          <Input v-model="username" class="w-100" />

          <Label>Email</Label>
          <Input v-model="email" class="w-100" />

          <Label>Password</Label>
          <Input v-model="password" class="w-100" />


          <Button type="submit" :disabled="loading">Register</Button>
          <div v-if="error" class="text-red-500">
            {{ error }}
          </div>
        </div>
      </form>

    </div>
  </div>


</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'guest-only'
})

const session = useUserSession();


const username = ref('')
const password = ref('')
const email = ref('')
const loading = ref(false)
const error = ref("");
const successMessage = ref("")


async function add() {
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username: username.value,
        email: email.value,
        password: password.value
      }
    });

        window.location.href = '/dashboard';
        
    username.value = ""
    password.value = ""




  } catch (err: any) {

    console.error(err)

  } finally {
    loading.value = false
  }


}
</script>
