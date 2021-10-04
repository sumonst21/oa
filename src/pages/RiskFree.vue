<template>
	<div>
		<div class="copy-confirmation">copied to clipboard</div>
		<Nav/>
		<form @submit.prevent="calculateRiskFree">
			<!-- <div class="toggle-mode toggle">
				<div :class="{ 'enabled': !freeBetMode }" class="text left">Arb</div>
				<input id="mode" v-model="freeBetMode" type="checkbox" value="true">
				<label for="mode"></label>
				<div class="knob"></div>
				<div :class="{ 'enabled': freeBetMode }" class="text right">Free Bet</div>
			</div> -->
			<div class="book">
				<input v-show="isEditingLabelA" type="text" v-model="labelA" class="label-input" ref="labelInputA" @blur="isEditingLabelA = false">
				<h2 v-show="!isEditingLabelA" @click="editLabel('A')">{{ labelA }}</h2>
				<div class="field-wrap flex-center">
					<div class="field">
						<label for="">Stake</label>
						<input type="text" v-model="stakeA" value="25" @keyup="onKeyUp" required>
					</div>
					<div class="field">
						<label for="">Odds</label>
						<input type="text" v-model="oddsA" value="100" required @keyup="onKeyUp">
					</div>
				</div>
			</div>
			<div class="book">
				<input v-show="isEditingLabelB" type="text" v-model="labelB" class="label-input" ref="labelInputB" @blur="isEditingLabelB = false">
				<h2 v-show="!isEditingLabelB" @click="editLabel('B')">{{ labelB }}</h2>
				<div class="field-wrap flex-center">
					<div class="field">
						<label for="">Odds</label>
						<input type="text" v-model="oddsB" value="375" required @keyup="onKeyUp">
					</div>
				</div>
			</div>
			<div class="flex-center button-wrap">
				<button class="btn" type="submit" name="button">Calculate hedge</button>
			</div>
		</form>
	
	
		<section v-if="loading" class="loading flex-center">
			<div class="spinner"></div>
		</section>
	
		<section class="card-section alt">		
			<transition>
				<div v-if="rfbSafe && rfbRisky" class="card-wrap">
					<CardRiskFree :play="rfbRisky"/>
					<CardRiskFree :play="rfbSafe"/>
				</div>
			</transition>
		</section>
	</div>
</template>

<script>
import CardRiskFree from '@/components/CardRiskFree';
import Nav from '@/components/Nav';
import helpers from '@/components/mixins/helpers';

export default {
	name: 'RiskFree',
	mixins: [helpers],
	components: {
		CardRiskFree,
		Nav,
	},
	data() {
		return {
			isFocusingInput: false,
			viewingBookmark: false,
			stakeA: 500,
			oddsA: -350,
			oddsB: -325,
			loading: false,
			freshInput: true,
			hasSearched: false,
			labelA: 'Book A',
			labelB: 'Book B',
			isEditingLabelA: false,
			isEditingLabelB: false,
			rfbSafe: false,
			rfbRisky: false,
			conversionRate: 75,
		};
	},
	computed: {
	},
	methods: {
		calculateRiskFree() {
			this.calculateRisky();
			this.calculateSafe();
		},
		calculateRisky() {
			const conversion = Number(this.stakeA * (this.conversionRate / 100));
			const payoutA = this.getPayout(this.oddsA, this.stakeA);
			const stakeB = payoutA - this.stakeA;
			const payoutB = Number(this.getPayout(this.oddsB, stakeB));
			const profitB = payoutB - stakeB - this.stakeA;
			
			this.rfbRisky = {
				safe: false,
				stakeA: this.stakeA,
				oddsA: this.oddsA,
				payoutA,
				profitA: 0,
				stakeB,
				oddsB: this.oddsB,
				payoutB,
				profitB: Number(profitB.toFixed(2)),
				conversion,
				profitAfterConversion: Number((profitB + conversion).toFixed(2)),
				conversionRate: this.conversionRate,
			}
		},
		calculateSafe() {
			const conversion = Number(this.stakeA * (this.conversionRate / 100));
			const payoutA = this.getPayout(Number(this.oddsA), Number(this.stakeA));
			const o = ( this.oddsB * -1 ) / 100;
			let stakeB = (payoutA - conversion) / (1 + (1/o) );
			stakeB = Math.round(stakeB);
			const payoutB = Number(this.getPayout(this.oddsB, stakeB));
			const profitB = Number(payoutB - this.stakeA - stakeB);

			this.rfbSafe = {
				safe: true,
				stakeA: this.stakeA,
				oddsA: this.oddsA,
				payoutA,
				profitA: payoutA - this.stakeA - stakeB,
				stakeB,
				oddsB: this.oddsB,
				payoutB,
				profitB,
				conversion,
				profitAfterConversion: Number((profitB + conversion).toFixed(2)),
				conversionRate: this.conversionRate,
			}
		},
		editLabel(l) {
			const prop = `isEditingLabel${l}`;
			const ref = `labelInput${l}`;
			this[prop] = true;

			this.$nextTick(() => {
				this.$refs[ref].focus();
			})
		},
	},
	watch: {
		freeBetMode() {
			this.plays = []
			this.viewingBookmark = false;
			this.conversion = false;
			this.hasSearched = false;  
		},
	},
}
</script>