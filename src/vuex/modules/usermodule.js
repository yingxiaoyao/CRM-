export default{
    state:{
        user: {

    	},
        corp : {

        }
    },
    mutations:{
        saveUser (state,msg) {
            state.user = msg;
        },
        saveCorp (state , msg) {
            state.corp = msg;
        }

    },
}