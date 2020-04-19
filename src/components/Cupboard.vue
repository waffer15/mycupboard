<template>
    <div class="cupboard">
        <DrinkPopup v-if="showDrinkPopup" v-click-outside="closeDrinkPopup" />
        <div class="left-container">
            <h1> Cupboard </h1>
            <span class="add-button">
                <button @click="updateList">Add</button>
            </span>
            <input v-model="ingredient" placeholder="Add ingredient" />
            <div class="ingredients">
                <div class="ingredient" v-for="i in ingredientList" :key="i">
                    {{i}}
                </div>
            </div>
        </div>
        <div class="results">
            <Drink v-for="drink in drinks" :drink="drink" :key="drink.idDrink" @openDrinkPopup="openDrinkPopup"/>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import Drink from "@/components/Drink";
    import DrinkPopup from "@/components/DrinkPopup";
    export default {
        name: "Cupboard",
        components: {DrinkPopup, Drink},
        data () {
            return {
                ingredient: '',
                ingredientList: [],
                showDrinkPopup: false,
                selectedId: null,
            };
        },
        computed: {
            ...mapState(['drinks', 'drink']),
        },
        watch: {
            ingredientList(to) {
                if (to) {
                    this.getDrinksByIngredients({
                        params: {
                            ingredients:  to.toString(),
                        },
                    });
                }
            },
            drink(to) {
              if (to) {
                  this.showDrinkPopup = true;
              }
            },
        },
        methods: {
            ...mapActions(['getDrinksByIngredients', 'clearDrink', 'getDrink']),
            updateList() {
                if (this.ingredient) {
                    this.ingredientList = [...this.ingredientList, this.ingredient];
                    this.ingredient = '';
                }
            },
            async openDrinkPopup(drinkId) {
                await this.getDrink({ params: { id: drinkId } });
            },
            closeDrinkPopup() {
              this.showDrinkPopup = false;
              this.clearDrink();
            },
        }
    }
</script>

<style scoped>
    .cupboard {

    }
    .left-container {
        text-align: left;
        height: 100%;
        width: 16.5rem;
        box-shadow: 0 0 4px 0 black;
        margin-right: 1em;
        padding: 1rem;
        background-color: #097F81;
        position: fixed;
        top: 0;
        left: 0;
    }
    .ingredients {
        display: inline;
        text-align: center;
    }
    .ingredient {
        margin: 1.5rem 1rem;
        padding: 0.5rem;
        border: 1px solid black;
        border-radius: 1rem;
        background-color: white;
        color: black;
        transition: box-shadow, transform 0.2s ease-in-out;
    }
    .ingredient:hover {
        box-shadow: 0 0 3px black;
        transform: translateY(-2px);
    }
    .results {
        margin-left: 20rem;
    }
    input {
        margin: 0 1rem;
        max-height: 50%;
        padding: 0.5rem 0.5rem 0.5rem 0.9rem;
        border-radius: 1rem;
        border: 0.5px solid black;
        transition: box-shadow, transform 0.2s ease-in-out;
    }
    input:hover {
        box-shadow: 0 0 2px black;
        transform: translateY(-1px);
    }
    input:focus {
        box-shadow: 0 0 1px 0 #525151;
        outline: 0;
    }
    button {
        background-color: #51cf58;
        border: 0.5px solid black;
        padding: 0.5rem;
        border-radius: 0.25rem;
        color: white;
        outline: none;
        transition: box-shadow, transform 0.2s ease-in-out;
    }
    button:hover {
        box-shadow: 0 0 2px #525151;
        transform: translateY(-1px);
    }
    h1 {
        margin-left: 3rem;
    }
    img {
        position: relative;
        top: 0.5rem;
        max-width: 30px;
        max-height: 30px;
    }
</style>