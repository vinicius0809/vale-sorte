<template>
  <div id="visualizar-certificado">
    <div class="info-certificado">
      <span
        >Data Sorteio: <strong>{{ dataSorteio }}</strong></span
      >
      <span
        >Número certificado: <strong>{{ numeroCertificado }}</strong></span
      >
    </div>
    <div class="matrizes">
      <div class="matriz" v-for="(matriz, j) in matrizes" :key="j">
        <strong class="numero-sorteio"
          >{{ numeroSorteioValor(j) }}º Sorteio</strong
        >
        <template v-if="acertos(j, 0) > 0">
          <div class="numero-sorteio">
            <strong
              >{{ acertos(j, 0) }}/{{ quantidadeSorteados(j) }} acertos</strong
            >
          </div>
          <div class="numero-sorteio">
            <strong>10:</strong> {{ dezProximas(j, 0) }} <strong>5:</strong>
            {{ cincoProximas(j, 0) }} <strong>3:</strong>
            {{ tresProximas(j, 0) }} <strong>1:</strong> {{ umaProximas(j, 0) }}
          </div></template
        >
        <div class="linha-matriz" v-for="(linha, index) in matriz" :key="index">
          <template v-if="index == 1">
            <span class="numero-matriz" v-for="z in 5" :key="z">-</span>
          </template>
          <div
            class="numero-matriz"
            v-bind:class="{
              'numero-marcado': numeroMarcado(j, getNumero(index, i, j)),
            }"
            v-for="(coluna, i) in linha"
            :key="i"
            @click="marcar(index, i, j)"
          >
            {{ coluna }}
          </div>
        </div>
        <template v-if="acertos(j, 1) > 0">
          <div class="numero-sorteio">
            <strong>10:</strong> {{ dezProximas(j, 1) }} <strong>5:</strong>
            {{ cincoProximas(j, 1) }} <strong>3:</strong>
            {{ tresProximas(j, 1) }} <strong>1:</strong> {{ umaProximas(j, 1) }}
          </div>
          <div class="numero-sorteio">
            <strong
              >{{ acertos(j, 1) }}/{{ quantidadeSorteados(j) }} acertos</strong
            >
          </div>
        </template>
      </div>
    </div>
  </div>
  <div class="dados">
    <label for="numero-sorteado" class="dados"
      ><strong>Sorteio nº: </strong></label
    >
    <input type="number" id="numero-sorteio" v-model="numeroSorteio" />
    <label for="numero-sorteado" class="dados"><strong>Número: </strong></label>
    <input type="number" id="numero-sorteado" v-model="numeroSorteado" />
    <button @click="marcarBotao()">OK</button>
  </div>
</template>

<script>
import { db } from "../db";
export default {
  name: "VisualizarCertificado",
  data() {
    return {
      matrizes: new Array(1),
      numeroCertificado: this.$route.params.numeroCertificado,
      dataSorteio: this.$route.params.dataSorteio,
      numeroSorteado: 1,
      numeroSorteio: 1,
      numerosSorteados: [],
      acertosSorteios: [],
    };
  },
  methods: {
    acertos(matriz, linha) {
      let valor = 0;
      if (this.acertosSorteios.length > 0) {
        valor = this.acertosSorteios[matriz][linha];
      }

      return valor;
    },
    marcar(linha, coluna, matriz) {
      if (this.matrizes[matriz][linha][coluna] != "-") {
        const numero = this.matrizes[matriz][linha][coluna];
        const sorteado = { matriz, numero };
        this.acertosSorteios[matriz][linha] += 1;
        this.numerosSorteados.push(sorteado);
      }
    },
    marcarBotao() {
      const matriz = this.numeroSorteio - 1;
      const numero = this.numeroSorteado;
      const sorteado = { matriz, numero };
      this.numerosSorteados.push(sorteado);
      for (let i = 0; i < this.matrizes[matriz][0].length; i++) {
        const el = this.matrizes[matriz][0][i];
        if (el == numero) {
          this.acertosSorteios[matriz][0] += 1;
        }
      }
      for (let j = 0; j < this.matrizes[matriz][1].length; j++) {
        const e = this.matrizes[matriz][1][j];
        if (e == numero) {
          this.acertosSorteios[matriz][1] += 1;
        }
      }
    },
    getNumero(linha, coluna, matriz) {
      return this.matrizes[matriz][linha][coluna];
    },
    numeroSorteioValor(valor) {
      return parseInt(valor) + 1;
    },
    numeroMarcado(matriz, numero) {
      if (this.numerosSorteados.length > 0) {
        for (let i = 0; i < this.numerosSorteados.length; i++) {
          const e = this.numerosSorteados[i];
          if (e.matriz == matriz && e.numero == numero) {
            return true;
          }
        }
      }
      return false;
    },
    quantidadeSorteados(matriz) {
      let qtd = 0;
      if (this.numerosSorteados.length > 0) {
        for (let i = 0; i < this.numerosSorteados.length; i++) {
          const e = this.numerosSorteados[i];
          if (e.matriz == matriz) {
            qtd++;
          }
        }
      }
      return qtd;
    },
    dezProximas(matriz, linha) {
      return this.proximas(10, matriz, linha);
    },
    cincoProximas(matriz, linha) {
      return this.proximas(5, matriz, linha);
    },
    tresProximas(matriz, linha) {
      return this.proximas(3, matriz, linha);
    },
    umaProximas(matriz, linha) {
      return this.proximas(1, matriz, linha);
    },
    proximas(valorAcertos, matriz, linha) {
      let totalSorteados = 0;
      let totalAcertos = this.acertos(matriz, linha);
      for (let i = 0; i < this.numerosSorteados.length; i++) {
        const el = this.numerosSorteados[i];
        if (el.matriz == matriz) {
          totalSorteados++;
        }
      }
      if (
        totalSorteados < 20 - valorAcertos ||
        totalAcertos < 20 - valorAcertos
      ) {
        return "0%";
      } else {
        let possiveisNumeros = 60 - totalSorteados;
        let probabilidade = 20 - totalAcertos;
        return (
          parseFloat(
            100 /
              (this.fatorial(possiveisNumeros) /
                (this.fatorial(probabilidade) *
                  this.fatorial(possiveisNumeros - probabilidade)))
          ).toFixed(8) + "%"
        );
      }
    },
    fatorial(numero) {
      let total = 1;
      while (numero > 1) {
        total *= numero--;
      }
      return total;
    },
  },
  mounted() {
    db.collection(this.dataSorteio)
      .doc(this.numeroCertificado)
      .get()
      .then((snapshot) => {
        this.matrizes = snapshot.data();
        let tamanhoMatrizes = 0;
        for (var i = 0; i < 20; i++) {
          if (!this.matrizes[i]) {
            tamanhoMatrizes = i;
            break;
          }
        }

        this.acertosSorteios = Array(tamanhoMatrizes)
          .fill(null)
          .map(() => Array(2).fill(0));
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

.numero-sorteio {
  grid-column-start: 2;
  padding: 10px;
}

.dados {
  padding: 10px;
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

.numero-marcado {
  background-color: yellow;
  color: black;
  font-weight: bold;
}
</style>
