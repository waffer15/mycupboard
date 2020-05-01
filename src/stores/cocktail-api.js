import Vapi from 'vuex-rest-api';
import ENV from '@/config'

const  api = new Vapi({
    baseURL: ENV.BASE_URL,
    state: {
      randomCocktailUrl: null,
    },
})
.get({
    action: 'getRandomCocktail',
    property: 'randomCocktailUrl',
    path: () => '/random.php',
    onSuccess: (state, payload) => {
        state.randomCocktailUrl = payload.data.drinks[0].strDrinkThumb;
    },
})
.getStore();

export default {
    namespaced: true,
    state: {
        ...api.state,
    },
    mutations: {
        ...api.mutations,
    },
    actions: {
        ...api.actions,
    },
};