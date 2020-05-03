import _ from 'lodash';
import axios from 'axios'
import ENV from '@/config'
import types from '@/stores/mutation-types';
import Vapi from 'vuex-rest-api';

function handleDrinkList(drinks, ingredientList) {
    // map missing ingredients to drink list
    let updatedDrinkList = drinks.map(drink => {
        let missing = [];
        let contains = [];
        for (let i = 0; i < drink.ingredients.length; i += 1) {
            const cur = drink.ingredients[i];
            if (ingredientList.indexOf(cur.toLowerCase()) === -1) {
                missing.push(cur);
            } else {
                contains.push(cur);
            }
        }
        return { ...drink, missing, contains }
    });
    return _.orderBy(updatedDrinkList, ['missing.length', 'contains.length'], ['asc', 'desc']);
}

const api = new Vapi({
    baseURL: ENV.LOCAL_BASE_URL,
    state: {
        drinks: [],
        ingredients: [],
        searchIngredients: [],
        drink: null,
    },
})
.get({
    action: 'getDrinksByIngredients',
    property: 'drinks',
    queryParams: true,
    path: () => `drink/drinks`,
    onSuccess: (state, payload) => {
        if (payload.data.drinks === 'None Found') {
            state.drinks = [];
        } else {
            state.drinks = handleDrinkList(payload.data, state.ingredients);
        }
    }
})
.get({
    action: 'getIngredientsByString',
    property: 'searchIngredients',
    queryParams: true,
    path: () => 'ingredient/list',
})
.get({
    action: 'getDrinksByFirstLetter',
    path: ({ letter }) => `search.php?f=${letter}`,
    onSuccess: (state, payload) => {
        const drinks = payload.data.drinks;
        for (let i = 0; i < drinks.length; i += 1) {
            let ingred = [];
            let measures = [];
            const drinkDetail = drinks[i];
            for (let j = 1; j <= 15; j += 1) {
                const cur = drinkDetail[`strIngredient${j}`];
                let mes = drinkDetail[`strMeasure${j}`];
                if (cur) {
                    ingred.push(cur.toLowerCase());
                    const send2 = {
                        name: cur.toLowerCase(),
                        ingredientId: j + drinks.length,
                    };
                    axios.post('http://localhost:3000/ingredient/create', send2);

                    if (!mes) mes = '';
                    measures.push(mes);
                } else if (!cur) {
                    break;
                }
            }
            /*const send = {
                drinkId: drinkDetail.idDrink,
                ingredients: ingred,
                instructions: drinkDetail.strInstructions,
                name: drinkDetail.strDrink,
                thumb: drinkDetail.strDrinkThumb,
                measurements: measures,
            };
            axios.post('http://localhost:3000/drink/create', send);*/
        }
    }
})
.getStore();

const actions = {
    clearDrink({ commit }) {
        commit(types.CLEAR_DRINK);
    },
    setDrink({ commit }, index) {
      commit(types.SET_DRINK, index);
    },
    addIngredient({ commit }, ingredient) {
        commit(types.ADD_INGREDIENT, ingredient);
    },
    setIngredients({ commit }, ingredients) {
      commit(types.SET_INGREDIENTS, ingredients);
    },
    removeIngredient({ commit }, index) {
        commit(types.REMOVE_INGREDIENT, index);
    },
};

const mutations = {
    [types.CLEAR_DRINK](state) {
      state.drink = null;
    },
    [types.SET_DRINK](state, index) {
        state.drink = state.drinks[index];
    },
    [types.ADD_INGREDIENT](state, ingredient) {
        state.ingredients.push(ingredient);
        state.searchIngredients = [];
    },
    [types.SET_INGREDIENTS](state, ingredients) {
        state.ingredients = ingredients;
    },
    [types.REMOVE_INGREDIENT](state, index) {
        state.ingredients.splice(index, 1);
        if (state.ingredients.length === 0) {
            state.drinks = [];
        }
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