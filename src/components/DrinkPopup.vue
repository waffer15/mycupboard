<template>
    <div v-if="!pending.drink" class="container">
        <div  class="top-section">
            <img class="pic" :src="imgSrc" />
            <div class="ingredients">
                <h2 class="ingredient-title"> Ingredients </h2>
                <div class="ingredient-list">
                    <ul>
                        <li v-for="(ingredient, index) in ingredients" :key="index">
                            {{ingredient.measure ? ingredient.measure + 'of ' : ''}}
                            {{ingredient.ingredient }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="drink-details">
            <h2 class="name"> {{name}} </h2>
            <h3>How To Make:</h3>
            <p class="description"> {{ instructions }}</p>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "DrinkPopup",
        props: {},
        computed: {
          ...mapState('drinks', ['drink', 'pending']),
            ingredients() {
              return this.drink.ingredients.map((ingredient, index) => {
                  return { ingredient, measure: this.drink.measurements[index] };
              });
            },
            name() {
              return this.drink && this.drink.name;
            },
            imgSrc() {
              return this.drink && this.drink.thumb;
            },
            instructions() {
              return this.drink && this.drink.instructions;
            },
        },
    }
</script>

<style scoped>
    .container {
        position: fixed;
        min-height: 35em;
        width: min-content;
        padding: 1rem;
        z-index: 10;
        margin: 1em 35%;
        background-color: whitesmoke;
        border-radius: 1rem;
        box-shadow: 0 0 11px 3px black;
        color: #5c5c5c
    }
    .top-section {
        display: inline-flex;
    }
    .drink-details {
        margin: 1rem;
    }
    .pic {
        width: 300px;
        height: 300px;
        margin: 1rem;
        box-shadow: 0 0 8px 1px black;
        border-radius: 0.5rem;
    }
    .ingredient-list {
        width: max-content;
        margin: 1rem;
        border-radius: 0.5rem;
        background-color: white;
        height: 75%;
        padding-top: 0.5rem;
        padding-right: 0.5rem;
        display: inline-block;
        text-align: left;
    }
    .ingredient-title {
        margin: 0.5rem;
    }
    .ingredients {
        text-align: center;
    }
    .description {
        padding: 0.5rem;
        min-height: 5rem;
        background-color: white;
        border-radius: 0.75rem;
    }
</style>