import ENV from '@/config'
import types from '@/stores/mutation-types';
import Vapi from 'vuex-rest-api';

const api = new Vapi({
    baseURL: ENV.BASE_URL,
    state: {
        drinks: [],
        drink: null,
    },
})
.get({
    action: 'getDrinksByIngredients',
    property: 'drinks',
    path: ({ ingredients }) => `filter.php?i=${ingredients}`,
    onSuccess: (state, payload) => {
        if (payload.data.drinks === 'None Found') {
            state.drinks = [];
        } else {
            state.drinks = payload.data.drinks;
        }
    }
})
.get({
    action: 'getDrink',
    property: 'drink',
    path: ({ id }) => `lookup.php?i=${id}`,
    onSuccess: (state, payload) => {
      state.drink = payload.data.drinks[0];
    },
})
.getStore();

const actions = {
    clearDrink({ commit }) {
        commit(types.CLEAR_DRINK);
    },
};

const mutations = {
    [types.CLEAR_DRINK](state) {
      state.drink = null;
    },
};

export default {
    namespaced: true,
    state: {
        ...api.state,
    },
    mutations: {
        ...api.mutations,
        ...mutations,
    },
    actions: {
        ...api.actions,
        ...actions,
    },
};