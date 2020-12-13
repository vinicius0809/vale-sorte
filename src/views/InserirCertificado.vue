<template>
<div id="inserir-certificado">
  <div class="info-certificado">
    <span>Data Sorteio: <strong>{{dataSorteio}}</strong></span>
    <span>Número certificado: <strong>{{numeroCertificado}}</strong></span>
  </div>
  <div class="matrizes">
    <div class="matriz" v-for="(matriz, j) in matrizes" :key="j">
      <div class="linha-matriz" v-for="(linha, index) in matriz" :key="index">
        <template v-if="index == 1">
          <span class="numero-matriz" v-for="z in 5" :key="z">-</span>
        </template>
        <div class="numero-matriz" v-for="(coluna, i) in linha" :key="i" @click="edit(index, i, j)">
          {{ coluna }}
        </div>
      </div>
    </div>
    <button @click="novaMatriz" class="btn-nova-matriz">Nova Matriz</button>
  </div>
  <button @click="salvarMatrizes" class="btn-nova-matriz">Salvar matrizes</button>
</div>
</template>

<script>
import {
  db
} from '../db';
export default {
  name: "InserirCertificado",
  data() {
    return {
      matrizes: new Array(1),
      numeroCertificado: this.$route.params.numeroCertificado,
      dataSorteio: this.$route.params.dataSorteio,
      quantidadeMatrizes: 0
    };
  },
  methods: {
    salvarMatrizes() {
      db.collection(this.dataSorteio).doc(this.numeroCertificado).set(this.matrizes)
        .then(function() {
          alert("Matrizes salvas com sucesso!");
        });
    },
    edit(linha, coluna, matriz) {
      if (this.matrizes[matriz][linha][coluna] != '-') {
        const novoValor = prompt("Valor: ", this.matrizes[matriz][linha][coluna]);

        if (novoValor != null) {
          this.matrizes[matriz][linha][coluna] = novoValor;
        }
      }
    },
    novaMatriz() {
      let tamanhoMatrizes = 0;
      for (var i = 0; i < 20; i++) {
        if (!this.matrizes[i]) {
          tamanhoMatrizes = i;
          break;
        }
      }

      let novaMatriz = this.matrizes[0];
      this.matrizes[tamanhoMatrizes] = novaMatriz;
    }
  },
  mounted() {
    // let matriz = new Array(9);
    // for (let i = 0; i < matriz.length; i++) {
    //   matriz[i] = new Array(5);
    //
    //   for (let j = 0; j < matriz[i].length; j++) {
    //     if (i == 4) {
    //       matriz[i][j] = '-';
    //     } else {
    //       matriz[i][j] = 0;
    //     }
    //   }
    // }

    db.collection(this.dataSorteio).doc(this.numeroCertificado).get().then(snapshot => {
      this.matrizes = snapshot.data();
    });
  },
};
</script>

<style scoped>
.matrizes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, auto));
  row-gap: 1rem;
}

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
  outline: solid;
}

.numero-matriz:hover {
  background-color: black;
  color: white;
}

.info-certificado {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-start: 2;
}

.btn-nova-matriz {
  justify-self: center;
  align-self: center;
}
</style>
