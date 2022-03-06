<template>
  <div class='login_container'>
    <div class='login_box'>
      <logo></logo>
      <Form></Form>
    </div>
  </div>
</template>

<script>
  import Logo from '../../components/common/login/Logo.vue'
  import Form from '../../components/common/login/Form.vue'
  export default {
    name: "Login",
    components: {
      Logo,
      Form
    }
  }
</script>

<style>
  .login_container {
    height: 100%;
    background-color: #2030a82a;
  }

  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 300px;
    background-color: rgba(118, 128, 118, 0.829);
    border-radius: 3px;
  }
</style>