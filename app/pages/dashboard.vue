<script lang="ts" setup>
import { on } from 'events';






const { clear } = useUserSession();


async function logout() {
  await clear();
  await navigateTo('/login');
}

const name = ref("")
async function addFruit() {
  try {
    await $fetch('/api/fruits', {
      method: 'post',
      body: {
        name: name.value
      }
    });
    name.value = ""
  } catch (error) {
    console.log(error)
  }

}

const fruits = ref<Array<{ id: number, name: string }>>([])
async function fetchFruits() {
  try {
    const data = await $fetch('/api/fruits', {
      method: 'get',
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchFruits()
});
</script>

<template>
  <div>
    Welcome to dashboard

    <NuxtLink to="/login"><button @click="logout">Logout</button></NuxtLink>


    <div class="flex justify-center items-center mt-50 space-x-5">
      <Input v-model="name" class="w-100" />
      <Button @click="addFruit">Add fruit</Button>

      <ul>
        <li v-for="fruit in fruits" :key="fruit.id">{{ fruit.name }}</li>

      </ul>
    </div>



  </div>


</template>
