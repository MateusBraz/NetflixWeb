<template>


  <div class="gui-card" v-on:click="reproduzindo= !reproduzindo">

    <div class="gui-card__media">
      <img v-if="!reproduzindo" class="gui-card__img" v-bind:src="imagem"/>
    </div>


    <iframe classe="gui-card_img" v-if="reproduzindo" v-on:mouseout="reproduzindo = !reproduzindo" v-bind:src="url"
            allowfullscreen></iframe>

  </div>

</template>

<script>
  export default {
    name: "Filme",
    props: ['nome', 'imagem', 'url'],

    data() {
      return {
        reproduzindo: false
      }
    }
  }
</script>

<style scoped>

</style>
