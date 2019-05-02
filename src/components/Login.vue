<template>
  <div class="background" id="fundo">
    <img id="imagem"
         src="https://assets.nflxext.com/ffe/siteui/vlv3/58a3d29a-63a2-4753-b5c6-63df88ab7f95/b947e64e-22df-4f90-9b1a-80e21883b216/BR-pt-20190414-popsignuptwoweeks-perspective_alpha_website_small.jpg"
         srcset="https://assets.nflxext.com/ffe/siteui/vlv3/58a3d29a-63a2-4753-b5c6-63df88ab7f95/b947e64e-22df-4f90-9b1a-80e21883b216/BR-pt-20190414-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/58a3d29a-63a2-4753-b5c6-63df88ab7f95/b947e64e-22df-4f90-9b1a-80e21883b216/BR-pt-20190414-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/58a3d29a-63a2-4753-b5c6-63df88ab7f95/b947e64e-22df-4f90-9b1a-80e21883b216/BR-pt-20190414-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
         alt="">
    <div class="login-fundo">

      <div id="login">

        <div class="titulo">
          <h1 id="jiren" style="color: white">JirenFlix</h1>
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


          <div>
            <b-button type="submit" value="Cadastrado" variant="danger" v-on:click="onSubmit()">Entrar</b-button>
            <a href="#/cadastro">Cadastre-se</a>
          </div>

        </b-form>

        <div class="container">
          <b-alert show :variant="tipoAlert" style="color: red" id="mensagem" v-show="Mensagem"></b-alert>
        </div>

      </div>
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
        usuarios: [],
        tipoAlert: "",
        Mensagem: false
      }
    },

    created() {
      this.$http.get('http://localhost:3000/usuario').then(response => {
        this.usuarios = response.body;
      });
    },

    methods: {

      onSubmit: function (evt) {

        this.$http.get('http://localhost:3000/usuario').then(response => {
          this.usuarios = response.body;
        });

        var filtered = this.usuarios.filter(this.verificacaoCadastroOk);
        if (filtered.length == 1) {
          window.location.href = "#/filmes"
        }


        filtered = this.usuarios.filter(this.verificacaoLoginOuSenhaIncorreto);
        if (filtered.length > 0 && this.usuario.password != "" && this.usuario.email != ""){
          document.getElementById("mensagem").innerText = "Email ou Senha incorreto!";
          this.Mensagem = true;
        }else if(filtered.length == 0 && this.usuario.password != "" && this.usuario.email != ""){
          document.getElementById("mensagem").innerText = "Usuário não cadastrado!";
          this.Mensagem = true;
        }
      },

      verificacaoCadastroOk(value) {
        return (value.email === this.usuario.email && value.password === this.usuario.password);
      },

      verificacaoLoginOuSenhaIncorreto(value) {
        return (value.email === this.usuario.email || value.password === this.usuario.password);
      }
    }


  }
</script>

<style>


  #fundo {
    width: 100%;
  }

  #imagem {
    width: 100%;
  }

  .login-fundo {
    background-image: url("https://i0.wp.com/www.multarte.com.br/wp-content/uploads/2018/12/fundo-preto-background109.png?resize=696%2C696&ssl=1");

    position: absolute;
    text-align: center;
    height: 380px;
    width: 450px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .login-fundo:hover {
    background-image: url("https://image.winudf.com/v2/image/amlyZW4ud2FsbHBhcGVyX3NjcmVlbl8xXzE1MTg3MzE4NTVfMDIz/screen-1.jpg?h=800&fakeurl=1&type=.jpg");
  }

  #jiren {
    font-size: 100px;
    text-shadow: 0 0 4px red;
  }

  #input-group-1 {
    margin: 30px;
  }


</style>
