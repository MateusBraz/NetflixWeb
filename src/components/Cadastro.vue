<template>
  <div class="fundo">

    <div id="entrar">
      <a href="/">Entrar</a>
    </div>

    <div id="login">

      <div class="container">
        <b-alert show :variant="tipoAlert" id="mensagem" v-show="Mensagem"></b-alert>
      </div>


      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="usuario.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>


        <b-form-group id="input-group-1" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="usuario.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>


        <b-button type="submit" value="Cadastrado" variant="primary" v-on:click="onSubmit()">Cadastrar</b-button>


      </b-form>

    </div>
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
        Mensagem: false,
        usuariosCadastrados: [],
        tipoAlert : ""
      }
    },

    created() {
      this.$http.get('http://localhost:3000/usuario').then(response => {
        this.usuariosCadastrados = response.body;
      });

    },

    methods: {

      atualizarBanco() {
        this.$http.get('http://localhost:3000/usuario').then(response => {
          this.usuariosCadastrados = response.body;
        });

      },

      onSubmit(evt) {
        this.$http.get('http://localhost:3000/usuario').then(response => {
          this.usuariosCadastrados = response.body;
        });


        var filtered = this.usuariosCadastrados.filter(this.verificacao);

        if (filtered.length > 0) {
          this.tipoAlert = "danger";
          document.getElementById("mensagem").innerText = "Email já cadastrado!!!";
          this.Mensagem = true;
        }
        else {
          evt.preventDefault();
          this.$http.post('http://localhost:3000/usuario', this.usuario).then(response => {
            this.cadastroUsuario = response.body;
            this.tipoAlert = "success";
            document.getElementById("mensagem").innerText = "Cadastro realizado!";
            this.Mensagem = true;
            this.atualizarBanco();
            setTimeout(()=>{
              this.$router.push('/');
            }, 1000)
          })
        }

      },

      verificacao(value) {
        return value.email === this.usuario.email;
      }
    }

  }
</script>

<style scoped>

  #entrar{
    position: absolute;
    right: 40px;
    top: 10px;
    font-size: 30px;
  }

  .fundo {
    background-image: url("http://hoje.unisul.br/wp-content/uploads/2018/12/fita-crepe-cinema.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  #login {
    position: absolute;
    text-align: center;
    height: 380px;
    width: 450px;
    top : 65%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

 #input-group-1{
   margin: 30px;
 }

</style>
