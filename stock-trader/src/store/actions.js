import Vue from 'vue'
export default{
    loadData({commit}){
        Vue.prototype.$http.get('data.json').then(resp=>{
            const data=resp.data
            if (data){ // verifica se existe dados
                commit('setStocks', data.stocks)
                commit('setPortfolio', {
                    funds:data.funds,
                    stockPortfolio:data.stockPortfolio
                })
            }
        })
    }
}