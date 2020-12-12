<template>
  <div id="inserir-certificado">
      <div class="info-certificado">
          <span>Número certificado: 5</span>
      </div>
    <div class="matriz">
      <div class="linha-matriz" v-for="(linha, index) in matriz" :key="index">
        <div
          class="numero-matriz"
          v-for="(coluna, i) in linha"
          :key="i"
          @click="edit(index, i)"
        >
          {{ coluna }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InserirCertificado",
//   props:{
//       numeroCertificado: Number
//   },
  data() {
    return {
      matriz: new Array(4)
    };
  },
  methods: {
    edit(linha, coluna) {
      const novoValor = prompt("Valor: ", this.matriz[linha][coluna]);

      if (novoValor != null) {
        this.matriz[linha][coluna] = novoValor;
      }
    },
  },
  mounted() {
    let cont = 0;
    for (let i = 0; i < this.matriz.length; i++) {
      this.matriz[i] = new Array(5);

      for (let j = 0; j < this.matriz[i].length; j++) {
        this.matriz[i][j] = ++cont;
      }
    }
  },
};
</script>

<style scoped>
.matriz {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.linha-matriz {
  grid-column-start: 2;
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
}
.numero-matriz {
  padding: 10px;
}
</style>