export default{
    state:{
        funds:8000,
        stocks:[]
    },
    mutations:{
        buyStock(state, {stockId, quantity, stockPrice}){
            const record=state.stocks.find(element => element.id == stockId)
            if(record){
               record.quantity+=quantity
            }
            else{
                state.stocks.push({
                   id:stockId,
                   quantity:quantity
                })
            }
            state.funds-=quantity*stockPrice
        },
        sellStock(state, {stockId, quantity, stockPrice})
        {
            const record=state.stocks.find(element=>element.id=stockId)
            if (record.quantity>quantity){
                record.quantity-=quantity
            }
            else{
                state.stocks.splice(state.stocks.indexOf(record), 1)
            }
            state.funds+=stockPrice*quantity
        },
        setPortfolio(state, portfolio){ //seta o saldo e as ações que possuo
            state.funds=portfolio.funds
            state.stocks=portfolio.stockPortfolio ? portfolio.stockPortfolio : []
        }
    },
    actions:{
        sellStock({commit}, order){
            commit('sellStock', order)
        }
    },
    getters:{ // apartir desse getter vai retornar as informações completas
        stockPortfolio(state, getters){ // apartir desse getter é possivel acessar o getter que está dentro de stocks, para pegar todas as ações
            return state.stocks.map(stock=>{
                const record=getters.stocks.find(element=>element.id==stock.id)
                return{
                    id:stock.id,
                    quantity:stock.quantity,
                    name:record.name,
                    price:record.price
                }
            })
        },
        funds(state){
            return state.funds
        }
    }
}