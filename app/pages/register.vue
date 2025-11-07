<template>
    <div>
        <div class=" flex justify-center items-center mt-50">
        <form @submit.prevent="add">
                <div class="space-y-5">
      <Label>Username</Label>
      <Input v-model="username" class="w-100" />
      <div v-if="errorUsername">
        {{ errorUsername }}
      </div>
    
      <Label>Password</Label>
      <Input v-model="password" class="w-100" />
      <div v-if="errorPassword">
        {{ errorPassword }}
      </div>

      <Button @click="add" :disabled="loading" >Add</Button>
</div>
        </form>

</div>
    </div>
    

</template>

<script setup lang="ts">

const username = ref('')
const password = ref('')   
const loading = ref(false)
const errorUsername = ref<String | null>(null);
const errorPassword = ref<String | null>(null);

async function add(){
    try{
        loading.value = true
        if(username.value.length === 0){
              errorUsername.value = "Enter a username"
              return;
        } 

        if(password.value.length ===0){
            errorPassword.value = "Enter a password"
            return;
        }
      


       await $fetch('/api/auth/register',{
        method:'POST',
        body:{
            username:username.value,
            password:password.value
        }
       });

       
        
    }catch(error){
        console.log(error)
        
    }finally {
    loading.value = false
  }


}
</script>

