<template>
    <div class="cupboard">

        <div v-if="ingredients && ingredients.length === 0" class="empty-cupboard">
            <div v-if="!randomCocktailUrl" class="spinner">
                <HalfCircleSpinner
                    :animation-duration="1000"
                    :size="100"
                    color="grey"
                />
            </div>
            <img v-if="randomCocktailUrl" :src="randomCocktailUrl" class="random-drink">
            <h1>Add some drinks to see what you can make</h1>
        </div>
        <DrinkPopup v-if="showDrinkPopup" v-click-outside="closeDrinkPopup" />
        <div class="left-container">
            <div class="top">
                <h1> Cupboard </h1>
                <input v-model="ingredient" placeholder="Add ingredient" />
                <span class="add-button">
                    <button @click="updateIngredients">Add</button>
                </span>
            </div>
            <ResultList :results="searchIngredients" :search="ingredient" @select-index="updateIngredients"/>
            <div class="ingredients">
                <span
                        v-for="(i, index) in ingredients"
                        :key="index" class="ingredient"
                        @click="removeIngredient(index)"
                >
                    <span>{{ ingredientLabel(i) }}</span>
                    <fa-icon icon="minus-circle" class="icon"/>
                </span>
            </div>
        </div>
        <div class="results">
            <Drink v-for="drink in drinks" :drink="drink" :key="drink._id" @openDrinkPopup="openDrinkPopup"/>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import Drink from "@/components/Drink";
    import DrinkPopup from "@/components/DrinkPopup";
    import _ from 'lodash'
    import ResultList from "@/components/ResultList";
    import { HalfCircleSpinner } from 'epic-spinners';

    export default {
        name: "Cupboard",
        components: { ResultList, DrinkPopup, Drink, HalfCircleSpinner },
        data () {
            return {
                ingredient: '',
                showDrinkPopup: false,
                selectedId: null,
                emptyImage: null,
            };
        },
        computed: {
            ...mapState('drinks', ['drinks', 'drink', 'ingredients', 'searchIngredients']),
            ...mapState('cocktailApi', ['randomCocktailUrl']),
        },
        mounted() {
            if (localStorage.getItem('ingredients')) {
                // local storage saves as comma separated values
                this.setIngredients(localStorage.getItem('ingredients').split(','));
            } else {
                // if we don't have ingredients saved, want a random cocktail to display
                this.getRandomCocktail();
            }
        },
        watch: {
            ingredients(to) {
                if (to.length > 0) {
                    this.getDrinksByIngredients({
                        params: {
                            ingredients:  to.toString(),
                        },
                    });
                } else {
                    // get random cocktail to display if no ingredients
                    this.getRandomCocktail();
                }
                // save ingredients to browser storage
                localStorage.setItem('ingredients', to);
            },
            ingredient(to) {
              if (to) {
                  this.getIngredientsByString({
                      params: {
                          name: to.toLowerCase(),
                      }
                  });
              }
            },
            randomCocktailUrl(to) {
                console.log(to)
            }
        },
        methods: {
            ...mapActions('drinks', [
                'getDrinksByIngredients',
                'clearDrink',
                'setDrink',
                'addIngredient',
                'removeIngredient',
                'getIngredientsByString',
                'setIngredients',
            ]),
            ...mapActions('cocktailApi', ['getRandomCocktail']),
            updateIngredients(ingredient) {
                if (!ingredient.target) {
                    this.addIngredient(ingredient.toLowerCase());
                } else if (this.ingredient) {
                    this.addIngredient(this.ingredient.toLowerCase());
                }
                this.ingredient = '';
            },
            async openDrinkPopup(drinkId) {
                const index = this.drinks.findIndex(drink => drink.drinkId === drinkId);
                this.setDrink(index);
                this.showDrinkPopup = true;
            },
            closeDrinkPopup() {
              this.showDrinkPopup = false;
              this.clearDrink();
            },
            ingredientLabel(ingredient) {
                return _.startCase(ingredient)
            },
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Patua+One&display=swap');
    .cupboard {
        font-family: 'Patua One', sans-serif;
    }
    .left-container {
        text-align: left;
        height: 100%;
        width: 16.5rem;
        box-shadow: 0 0 4px 0 black;
        margin-right: 1em;
        padding: 1rem;
        background-color: #204051;
        position: fixed;
        top: 0;
        left: 0;
    }
    .ingredients {
        margin: 1rem;
        text-align: center;
    }
    .ingredient {
        padding: 0.5rem;
        margin: 1rem 0;
        border-radius: 1rem;
        background-color: white;
        color: #656565;
        display: block;
        transition: box-shadow, transform 0.2s ease-in-out;
    }
    .ingredient:hover {
        box-shadow: 0 2px 8px 0 #525151;
        display: block;
        transform: translateY(-2px);
    }
    .ingredient:hover * {
        opacity: 1;
    }
    .results {
        margin-left: 20rem;
        overflow: visible;
        word-wrap: normal;
    }
    input {
        margin: 0 1rem;
        max-height: 50%;
        padding: 0.5rem 0.5rem 0.5rem 0.9rem;
        border-radius: 1rem;
        border: none;
        transition: box-shadow, transform 0.2s ease-in-out;
    }
    input:hover {
        box-shadow: 0 2px 8px 0 #525151;
        transform: translateY(-1px);
    }
    input:focus {
        box-shadow: 0 0 3px #525151;
        outline: 0;
    }
    button {
        cursor: pointer;
        font-family: 'PT Sans', sans-serif;
        background-color: #51cf58;
        border: none;
        padding: 0.5rem;
        border-radius: 0.25rem;
        color: white;
        outline: none;
        box-shadow: 0 0 2px #525151;
        transition: box-shadow, transform 0.2s ease-in-out;
    }
    button:hover {
        box-shadow: 0 0 4px #525151;
        transform: translateY(-1px);
    }
    h1 {
        margin-left: 3rem;
    }
    .empty-cupboard {
        margin-left: 35%;
        margin-top: 10rem;
        border-radius: 2rem;
        text-align: center;
        font-family: 'PT Sans', sans-serif;
        width: 40rem;
        height: auto;
        color: black;
        padding: 1rem;
        background-color: white;
        position: fixed;
    }
    .random-drink {
        width: 250px;
        height: 250px;
        margin: 1rem;
        border-radius: 2rem;
    }
    .icon {
        top: 0.6rem;
        position: fixed;
        left: 0.8rem;
        color: grey;
        opacity: 0;
        transition: opacity 0.2s linear;
    }
    .icon:hover {
        color: red;
        cursor: pointer;
    }
    .spinner {
        text-align: -webkit-center;
        width: 250px;
        margin-left: 12rem;
        padding-top: 60px;
        height: 190px;
    }
</style>