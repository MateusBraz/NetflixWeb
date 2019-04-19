<template>
  <div>

    <div class="container">
      <b-alert show variant="success" id="mensagem" v-show="showMensagem"></b-alert>
    </div>


    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="usuario.email"
          type="text"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>


      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="usuario.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>


      <!--<input type="submit" class="fadeIn fourth" v-on:click="usuariosCadastrados()" value="Pronto">-->
      <!--<input type="button" class="fadeIn fourth" v-on:click="voltar" value="Voltar">-->


      <b-button type="submit" value="Cadastrado" variant="primary" v-on:click="usuariosCadastrados()">Cadastrar</b-button>

      <div id="formFooter">
        <a class="underlineHover" href="#/">Login</a>
      </div>

      <!--<input type="submit" class="fadeIn fourth" v-on:click="usuariosSalvos()" value="Pronto">-->
      <!--<input type="button" class="fadeIn fourth" v-on:click="voltar" value="Voltar">-->

    </b-form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        usuario: {
          email: '',
          password: ''
        },
        cadastroUsuario: null,
        showMensagem: false,
        usuariosCadastrados: []
      }
    },
    methods: {
      onSubmit(evt) {


        this.$http.get('http://localhost:3000/usuario').then(response => {
          this.usuariosCadastrados = response.body;
        });

        var cadastrado = false;

        for (var i in this.usuariosCadastrados) {
          if (document.getElementById("input-1").value == this.usuariosCadastrados[i].email && document.getElementById("input-2").value == this.usuariosCadastrados[i].password) {
            cadastrado = true;
            document.getElementById("mensagem").innerText = "email ou passaword já cadastrado!!!";
            this.showMensagem = true;
          }
        }

        if (cadastrado == false) {
          evt.preventDefault();
          this.$http.post('http://localhost:3000/usuario', this.usuario).then(response => {
            this.cadastroUsuario = response.body;
            document.getElementById("mensagem").innerText = "Cadastro realizado!";
            this.showMensagem = true;
          })

        }

      }
    },

    created() {
      this.$http.get('http://localhost:3000/usuario').then(response => {
        this.usuariosCadastrados = response.body;
      });

    },


    onReset(evt) {
      evt.preventDefault();
      this.usuario.email = '';
      this.showMensagem = false;
    },

  }
</script>

<style scoped>

</style>
