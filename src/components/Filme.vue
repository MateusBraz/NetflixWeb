<template>
  <div class="gui-card" :style="efeito" v-on:click="clickEfeito" v-on:mouseout="removeClickEfeito">
    <div class="gui-card__media">
      <br v-if="!reproduzindo" v-on:mouseout="reproduzindo=false" style="font-size: 17px; ">
      <div v-if="!reproduzindo" v-on:mouseout="reproduzindo=false" class="gui-card__media">
        <img v-on:mouseover="reproduzindo=true" class="gui-card__img" v-bind:src="imagem" alt=""/>
      </div>
    </div>


    <iframe id="video" v-if="reproduzindo" v-on:mouseout="reproduzindo=false" class="gui-card__img container" v-bind:src='link'
            frameborder="0" allow="autoplay;  encrypted-media"  allowfullscreen></iframe>


    <div class="gui-card__details">
      <div v-if="!reproduzindo" v-on:mouseout="reproduzindo=false" class="gui-card__title" style="font-size: 17px;">
        {{nomeFilme}}
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "Filme",
    props: ['nomeFilme', 'imagem', 'link'],

    data() {
      return {
        efeito: null
      }
    },
    methods: {
      clickEfeito() {
        this.efeito = 'transform: scale(1.9); margin-right: 110px;'
      },
      removeClickEfeito() {
        this.efeito = null;
      }
    }

  }
</script>

<style scoped>

</style>
