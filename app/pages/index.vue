<script setup lang="ts">
const name = ref('')
const email = ref('')
const password = ref('')

function add() {
  $fetch('/api/users', {
    method: 'POST',
    body: {
      name: name.value,
      email: email.value,
      password: password.value
    }
  })
}

</script>
<template>
   <div class="p-20">
    <NuxtLink to="/dashboard"><Button>Dashboard</Button></NuxtLink>
   </div>

  <div class=" flex justify-center items-center mt-50">
    <div class="space-y-5">
      <Label>Username</Label>
      <Input v-model="name" class="w-100" />
      <Label>Email</Label>
      <Input v-model="email" class="w-100" />
      <Label>Password</Label>
      <Input v-model="password" class="w-100" />
      <Button @click="add">Add</Button>
    </div>

   




  </div>
</template>
