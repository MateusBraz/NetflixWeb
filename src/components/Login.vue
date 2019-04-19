<template>
  <div class="login">

    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->

        <!-- Icon -->
        <div class="fadeIn first">
          <h1>GirenFlix</h1>
        </div>


        <form>
          <input type="text" id="login" class="fadeIn second" name="login" placeholder="Usuario">
          <input type="password" id="password" class="fadeIn third" name="login" placeholder="Senha">
          <input v-on:click="logado" type="button" class="fadeIn fourth botao" value="Entrar">
        </form>



        <a style="color: #B9090B;" v-if="existente"> Login e(ou) senha incorreto</a>

        <div id="formFooter">
          <a class="underlineHover" href="#/cadastro">Cadastre-se</a>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        usuarios: [],
        existente: false
      }
    },

    created() {
      this.$http.get('http://localhost:3000/usuario').then(response => {
        this.usuarios = response.body;
      });
    },

    methods: {
      logado: function (event){
        for (var k in this.usuarios) {
          if (document.getElementById("login").value == this.usuarios[k].email &&
            document.getElementById("password").value == this.usuarios[k].password) {
            window.location.href="#/filmes"
            this.existente = false;
          }
        }
        this.existente = true;
      }
    }
  }
</script>

<style scoped>

</style>
