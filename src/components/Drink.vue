<template>
    <div class="drink" @click.stop="selectDrink">
        <img class="thumb" :src="imgSrc + '/preview'"/>
        <span class="text">{{ name }}</span>
    </div>
</template>

<script>
    export default {
        name: "Drink",
        props: {
            drink: { type: Object, default: () => {} },
        },
        data() {
            return {
                imgSrc: this.drink.strDrinkThumb || '',
                name: this.drink.strDrink || '',
            }
        },
        methods: {
          selectDrink() {
              this.$emit('openDrinkPopup', Number(this.drink.idDrink));
          },
        },
    }
</script>

<style scoped>
.drink {
    margin: 1rem;
    border-radius: 0.75rem;
    border: solid 1px black;
    background-color: white;
    width: 25rem;
    color: #5c5c5c;
    transition: box-shadow, transform 0.2s ease-in-out;
}
.drink:hover {
    box-shadow: 0 0 5px #525151;
    transform: scale(1.01, 1.01);
}
.thumb {
    max-width: 100px;
    max-height: 100px;
    border-radius: 0.75rem;
    vertical-align: middle;
    margin: 1rem;
}
</style>