<script lang="ts" setup>

  const data =await $fetch('/api/fruits', {
    method: 'GET'
  })

</script>

<template>
  <div>
      Welcome to dashboard


      <ul v-for="fruits in data">
        <li>{{ fruits }}</li>
      </ul>
  </div>
</template>


