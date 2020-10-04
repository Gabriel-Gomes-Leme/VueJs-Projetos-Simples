<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-lg-12">
        <div class="conversor">
          <div class="area-campo">
            <label> Selecione a moeda </label>
            <div class="field">
              <select v-model="moeda" class="form-field">
                <option
                  v-for="moeda in moedas"
                  :value="moeda.cotacao"
                  :key="moeda.id"
                  :selected="moeda.id === 1"
                >
                  {{ moeda.nome }}
                </option>
              </select>
            </div>
          </div>
          <div class="area-campo">
            <label> Cotação atual: </label>
            <div class="field">
              <input
                type="text"
                placeholder="cotação atual"
                class="form-field"
                :value="moeda"
                readonly
              />
            </div>
          </div>
          <div class="area-campo">
            <label> Valor para converter em R$ : </label>
            <div class="field">
              <input
                type="text"
                placeholder="Informe o valor"
                class="form-field"
                v-model="valor"
              />
            </div>
          </div>
          <div class="area-campo">
            <label> Valor convertido em R$ : </label>
            <div class="field">
              <input
                type="text"
                placeholder="Resultado : R$"
                class="form-field result"
                readonly
                :value="valor * moeda"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moeda: "",
      moedas: [
        { id: 1, nome: "Dolar", cotacao: 5.68 },
        { id: 2, nome: "Euro", cotacao: 6.66 },
        { id: 3, nome: "Libra", cotacao: 7.35 },
      ],
      valor: "",
    };
  },
};
</script>

<style>
.conversor {
  width: 50%;
  min-height: 370px;
  background-color: whitesmoke;
  position: relative;
  z-index: 1;
  top: -70px;
  left: 25%;
  box-shadow: 5px 3px 4px 3px rgb(65, 64, 64);
  padding: 20px;
  border-top-left-radius: 30px;
}
.area-campo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
}
.field {
  display: flex;
  align-self: stretch;
  margin-top: -25px;
}
.form-field {
  display: block;
  width: 70%;
  margin: 25px auto;
  height: 45px;
  border: 0;
  border-bottom: 2px solid rgb(42, 95, 165);
  outline-style: none;
  background-color: transparent;
  text-indent: 5px;
}
.converter {
  width: 200px;
  height: 45px;
  background-color: seagreen;
  color: white;
  border: none;
  border-radius: 4px;
}
.resultado {
  background-color: white;
  width: 200px;
  height: 200px;
}
.result {
  border-bottom: 2px solid seagreen;
}
</style>