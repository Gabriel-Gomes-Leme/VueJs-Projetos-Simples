import stocks from '@/data/stocks'
export default{
    state:{
        stocks:[],
    },
    mutations:{
        setStocks(state, stock){
            state.stocks=stocks
        },
        randomizeStocks(state){
            state.stocks.forEach(stock => {
                stock.price= Math.round(stock.price * (1 + Math.random() - 0.45))
            })
        }
    },
    actions:{
        buyStock({commit}, order){
            commit('buyStock', order)
        },
        initStocks({commit}){ //pega os stocks que foram importados e vai setar a mutation para alterar o estado
            console.log('initStocks..')
            commit('setStocks', stocks)
        },
        randomizeStocks({commit}){
            commit('randomizeStocks')
        }
    },
    getters:{
        stocks(state){
            return state.stocks
        }
    }
}