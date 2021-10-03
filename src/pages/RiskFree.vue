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
				<div v-if="rfbMaxProfit || rfbHedged" class="card-wrap">
					<CardRiskFree :play="rfbMaxProfit" />
						<!-- <div>or</div> -->
					<!-- <CardRiskFree :play="rfbHedged" /> -->
				</div>
			</transition>
		</section>
	</div>
</template>

<script>
import CardRiskFree from '@/components/CardRiskFree';
import Nav from '@/components/Nav';
import _ from 'lodash';
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
			stakeA: '',
			oddsA: '',
			oddsB: '',
			loading: false,
			freshInput: true,
			hasSearched: false,
			labelA: 'Book A',
			labelB: 'Book B',
			isEditingLabelA: false,
			isEditingLabelB: false,
			rfbMaxProfit: false,
			rfbHedged: false,
			conversionPercent: 75,
		};
	},
	computed: {
	},
	methods: {
		calculateRiskFree() {
			const stakeB = this.stakeA * (this.oddsA / 100);
			const payoutB = Number(this.getPayout(this.oddsB, stakeB));
			
			this.rfbMaxProfit = {
				stakeA: this.stakeA,
				oddsA: this.oddsA,
				payoutA: Number(this.stakeA) + stakeB,
				profitA: 0,
				stakeB,
				oddsB: this.oddsB,
				payoutB,
				profitB: payoutB - stakeB - this.stakeA,
			}
		},
		calculateArb() {
			// Don't search again if we haven't changed any inputs
			if ( !this.freshInput ) return;

			// Reset stuff
			this.plays = [];
			this.loading = true;
			this.freshInput = false;
			this.oddsAx = this.oddsA;
			this.oddsBx = this.oddsB;

			if ( this.stakeA ) {

				// Start at max stake and decrement
				for (var xa = Number(this.stakeA); xa > 0; xa -= 0.5 ) {
					var payoutA = Number(this.getPayout(this.oddsA, xa));

					// For this stake on book A, try stakes on book B starting at 0 and incrementing
					for (var xb = 0; xb < 1000; xb += 0.5 ) {
						var payoutB = Number(this.getPayout(this.oddsB, xb));
						var sunk = xa + xb;

						// Exit loop.. no longer profitable or above maxB bet
						if ( sunk > payoutA || (this.maxB && xb > this.maxB) ) {
							break;
						}

						// If arb opportunity exists
						if ( payoutB >= sunk && payoutA >= sunk ) {
							var profitA = Number((payoutA - sunk).toFixed(2));
							var profitB = Number((payoutB - sunk).toFixed(2));

							this.plays.push({
								stakeA: xa,
								payoutA: payoutA,
								profitA: profitA,
								stakeB: xb,
								payoutB: payoutB,
								profitB: profitB,
								ev: ( (payoutA - sunk) + (payoutB - sunk) ) / 2,
								proximity: Math.abs( profitA - profitB )
							});
						}
					}
				}
			}

			this.loading = false;
			this.hasSearched = true;

			if ( _.find(this.bookmarks.arb, { 'id': `${this.oddsA}${this.oddsB}` }) ) {
				this.viewingBookmark = true;
			} else {
				this.viewingBookmark = false;
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