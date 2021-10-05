<template>
		<nav>
			<router-link class="flex-center" :to="{ name: 'arb'}">Arbitrage</router-link>
			<router-link class="flex-center" :to="{ name: 'free-bet'}">Free bet</router-link>
			<router-link class="flex-center" :to="{ name: 'risk-free'}">Risk-Free</router-link>
		</nav>
</template>

<script>
export default {
	name: 'Navigation',
}
</script>