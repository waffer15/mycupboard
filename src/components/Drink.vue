<template>
    <span class="drink" @click.stop="selectDrink">
        <img class="thumb" :src="imgSrc"/>
        <p class="text">{{ name }}</p>
        <p class="missing" :class="{ 'ready': missing === 0, 'not-ready': missing > 0 }"> {{ missingLabel }}</p>
    </span>
</template>

<script>
    export default {
        name: "Drink",
        props: {
            drink: { type: Object, default: () => {} },
        },
        computed: {
            imgSrc() {
                return this.drink && this.drink.thumb;
            },
            name() {
              return this.drink && this.drink.name;
            },
            missingLabel() {
              if (this.drink) {
                  if (this.missing === 0) {
                      return 'Ready to make';
                  } else {
                      return `Missing ${this.missing} ingredient${this.missing > 1 ? 's' : ''}`
                  }
              }
              return '';
            },
            missing() {
                return this.drink && this.drink.missing.length;
            }
        },
        methods: {
          selectDrink() {
              this.$emit('openDrinkPopup', Number(this.drink.drinkId));
          },
        },
    }
</script>

<style scoped>
.drink {
    margin: 1rem;
    border-radius: 0.75rem;
    background-color: white;
    box-shadow: 0 0 3px black;
    width: min-content;
    color: #5c5c5c;
    transition: box-shadow 0.1s ease-in, transform 0.2s ease-in-out;
    display: inline-block;
    padding: 1rem;
    text-align: center;
}
.drink:hover {
    box-shadow: 0 3px 5px 2px #525151;
    transform: translateY(-3px);
}
.thumb {
    max-width: 150px;
    max-height: 150px;
    border-radius: 0.75rem;
    vertical-align: middle;
    margin: 1rem;
}
.missing {
    font-size: 0.75rem;
    padding: 0.25rem;
    color: black;
    border-radius: 0.5rem;
}
.ready {
    background-color: #71ff86;
}
.not-ready {
    background-color: #ffa2a2;
}
</style>