<template>
  <div id="home">
    <label for="numero-valesorte" class="dados"
      ><strong>Insira o número do certificado</strong></label
    >
    <input
      type="number"
      id="numero-valesorte"
      class="dados"
      v-model="numeroCertificado"
    />
    <label for="data-sorteio" class="dados"
      ><strong>Data do sorteio</strong>
    </label>
    <input type="date" id="data-sorteio" class="dados" v-model="dataSorteio" />
    <button id="enviar-numero" class="dados" @click="verificaCertificado()">
      Enviar
    </button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      numeroCertificado: 0,
      dataSorteio: new Date().toLocaleDateString(),
    };
  },
  methods: {
    verificaCertificado() {
      this.$router.push({
        path: "inserir-certificado/" + this.numeroCertificado
      });
    },
  },
};
</script>

<style scoped>
#home {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.dados {
  grid-column-start: 2;
}
</style>