<template>
    <div v-if="search" class="result-container">
        <span
                v-for="(result, index) in sortedResults"
                :key="index" class="result"
                @click="selectIndex"
        >
            {{ ingredientLabel(result.name) }}
        </span>
    </div>
</template>

<script>
import _ from 'lodash';

export default {
    name: "ResultList",
    props: {
        results: { type: Array, default: () => [] },
        search: { type: String, default: '' },
    },
    computed: {
        sortedResults() {
            // limit to 10
            return _.sortBy(this.results, ['name.length']).slice(0, 10);

        },
    },
    methods: {
        selectIndex(event) {
            this.$emit('select-index', event.target.innerText);
        },
        ingredientLabel(ingredient) {
            return _.startCase(ingredient);
        },
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Patua+One&display=swap');
.result-container {
    font-family: 'PT Sans', sans-serif;
    background-color: white;
    color: black;
    margin: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 6px black;
    width: 15rem;
    position: fixed;
}
.result {
    display: block;
    color: #656565;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid black;
}
.result:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}
.result:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border: none;
}
.result:hover {
    cursor: pointer;
    background-color: #e0e0e0;
}
</style>