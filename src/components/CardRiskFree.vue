
<template>
	<div class="card risk-free">
		<button @click="copyToClipboard('copyConversion')" class="copy-to-clipboard"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"/></svg></button>
		<input id="copyConversion" class="copy-string" type="text" :value="sheetString">
		<h2>{{ play.safe ? 'Safe' : 'Risky' }}</h2>
		<div v-if="play.safe && play.oddsB > 0" class="card-body">
			<p>Place risk-free bet on positive odds and hedge on negative</p>
		</div>
		<div v-else class="card-body">
			<div class="flex split">
				<div class="amount">
					<label>{{ this.$parent.labelA }} ({{ this.play.oddsA }})</label>
					<div class="number">{{ play.stakeA|currency }}</div>
					<small>risk-free</small>
				</div>
				<div class="amount">
					<label>{{ this.$parent.labelB }} ({{ this.play.oddsB }})</label>
					<div class="number">{{ play.stakeB|currency }}</div>
					<small>stake</small>
				</div>
			</div>
			<div class="flex-center mt-15 mb-25">
				<div class="amount">
					<div class="number sunk color-orange">{{ Number(play.stakeA) + Number(play.stakeB)|currency }}</div>
					<small>sunk</small>
				</div>
			</div>
			<div class="flex split card-bottom flex-bottom">
				<div class="amount">
					<div class="number color-green">{{ play.profitA|currency }}</div>
					<small>{{ play.payoutA|currency }} payout</small>
				</div>
				<span class="or">or</span>
				<div class="amount">
					<div class="number color-red small">{{ play.profitB|currency }}</div>
					<small>{{ play.payoutB|currency }} payout</small>
					
					<div class="number color-blue small mt-10">+{{ play.conversion|currency }}</div>
					<small>{{ play.conversionRate }}% conversion</small>
					
					<div class="number color-green mt-10">{{ play.profitAfterConversion|currency }}</div>
					<small>after conversion</small>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import helpers from '@/components/mixins/helpers';

export default {
	name: 'CardConversion',
	props: {
		play: Object,
	},
	mixins: [helpers],
}
</script>