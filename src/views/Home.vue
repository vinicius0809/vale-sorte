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

  <div v-if="carregando">Carregando...</div>
</template>

<script>
import { db } from "../db";
export default {
  name: "Home",
  data() {
    return {
      numeroCertificado: 1,
      dataSorteio: new Date().toISOString().slice(0, 10),
      carregando: false,
    };
  },
  methods: {
    verificaCertificado() {
      this.carregando = true;
      let rota = this.dataSorteio + "/" + this.numeroCertificado;
      const ref = db
        .collection(this.dataSorteio + "")
        .doc(this.numeroCertificado + "");

      ref
        .get()
        .then((snapshot) => {
          let dados = snapshot.data();
          if (dados != undefined) {
            rota = "/visualizar-certificado/" + rota;
          } else {
            rota = "/inserir-certificado/" + rota;
          }
          this.$router.push({
            path: rota,
          });
        })
        .catch((error) => {
          console.log("Erro ao buscar certificado! ", error);
          rota = "/inserir-certificado/" + rota;
          this.carregando = false;
          this.$router.push({
            path: rota,
          });
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
