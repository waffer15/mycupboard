<template>
    <div v-if="!pending.drink" class="container">
        <img class="pic" :src="imgSrc" />
        <div  class="drink-container">
            <h2 class="ingredient-title"> What you need... </h2>
            <div class="ingredient-list">
                <ul>
                    <li v-for="(ingredient, index) in ingredients" :key="index">
                        {{ingredient.measure ? ingredient.measure + 'of ' : ''}}
                        {{ingredient.ingredient }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="drink-details">
            <h2 class="name"> {{name}} </h2>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    export default {
        name: "DrinkPopup",
        props: {},
        computed: {
          ...mapState(['drink', 'pending']),
            ingredients() {
              let ingredients = [];
              // json has up to 15 separate properties
              for (let i = 1; i <= 15; i += 1) {
                  const cur = this.drink[`strIngredient${i}`];
                  if (cur) {
                      ingredients.push(cur);
                  } else {
                      break;
                  }
              }
              return ingredients.map((ingredient, index) => {
                  return { ingredient, measure: this.drink[`strMeasure${index + 1}`] };
              });
            },
            name() {
              return this.drink && this.drink.strDrink;
            },
            imgSrc() {
              return this.drink && this.drink.strDrinkThumb;
            },
        },
    }
</script>

<style scoped>
    .container {
        position: fixed;
        height: 35em;
        width: auto;
        z-index: 10;
        margin: 5em 25%;
        background-color: #F9EEA3;
        border-radius: 1rem;
        box-shadow: 0 0 11px 3px black;
        color: #5c5c5c
    }
    .drink-container {
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
        box-shadow: 0 0 8px 1px black;
        border-radius: 0.5rem;
        background-color: white;
    }
    .ingredient-title {
        margin: 0.5rem;
    }
</style>