<template>
    <div>
        <p>Exchange base: {{currency.base}}</p>
        <p>Convert {{convert | currencyFormat from}} to {{converted | currencyFormat to}}</p>

        <label> Convert:
            <input v-model="convert" type="number">
        </label>
        <label> From:
            <select v-model="from">
                <option v-for="(name, rate) in currency.rates">{{name}}</option>
            </select>
        </label>
        <label> To:
            <select v-model="to">
                <option v-for="(name, rate) in currency.rates">{{name}}</option>
            </select>
        </label>
    </div>
</template>

<style>

</style>

<script>
    export default {
        props: ['currency'],
        data () {
            return {
                from: 'USD',
                to: 'GBP',
                convert: 0
            }
        },
        computed: {
            converted () {
                return this.currency.convert(this.convert, {from: this.from, to: this.to})
            }
        }
    }
</script>
