<template>
	<div>
		<div class="copy-confirmation">copied to clipboard</div>
		<div v-if="bookmarks.length" class="bookmarks">
			<div v-for="(play, i) in bookmarks.arb" class="bookmark flex-stretch" :key="i" @click="loadBookmark(play)">
				<div class="ev flex-center">${{ play.ev }}</div>
				<div class="games">
					{{ play.labelA }} <strong>{{ play.oddsA }}</strong><br>
					{{ play.labelB }} <strong>{{ play.oddsB }}</strong>
				</div>
			</div>
		</div>
	
		<form @submit.prevent="calculate">
			<!-- <div class="settings">
				<div>
					<label for="" style="display:block;">Rounding</label>
					<div class="toggle toggle-round">
						<input id="round" v-model="round" type="checkbox" value="true">
						<label for="round"></label>
						<div class="knob"></div>
					</div>
				</div>
			</div> -->
			<div class="book">
				<input v-show="isEditingLabelA" type="text" v-model="labelA" class="label-input" ref="labelInputA" @blur="isEditingLabelA = false">
				<h2 v-show="!isEditingLabelA" @click="editLabel('A')">{{ labelA }}</h2>
				<div class="field-wrap flex-center">
					<div class="field">
						<label for="" class="color-arb">Max stake</label>
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
				<div>
					<button class="btn btn-calculate" type="submit" name="button">Calculate hedge</button>
					<button v-if="plays.length && !loading" :class="{ 'viewing-bookmark': viewingBookmark }" class="save-play btn-util" @click.prevent="bookmarkPlay"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"/></svg></button>
				</div>
			</div>
		</form>
	
	
		<section v-if="loading" class="loading flex-center">
			<div class="spinner"></div>
		</section>
	
		<section class="card-section alt">
			<transition name="fade">
				<div v-if="plays.length && !loading" class="card-wrap">
					<CardUnderdog :play="underdog" />
					<CardBalanced :play="balanced" />
					<CardFavorite :play="favorite" />
				</div>
			</transition>
		</section>
	</div>
</template>

<script>
import CardUnderdog from '@/components/CardUnderdog';
import CardFavorite from '@/components/CardFavorite';
import CardBalanced from '@/components/CardBalanced';
import _ from 'lodash';
import helpers from '@/components/mixins/helpers';

export default {
	name: 'Arb',
	mixins: [helpers],
	components: {
		CardUnderdog,
		CardBalanced,
		CardFavorite,
	},
	data() {
		return {
			isFocusingInput: false,
			viewingBookmark: false,
			oddsA: '',
			stakeA: '',
			oddsB: '',
			maxB: '',
			plays: [],
			loading: false,
			freshInput: true,
			hasSearched: false,
			labelA: 'Book A',
			labelB: 'Book B',
			isEditingLabelA: false,
			isEditingLabelB: false,
			bookmarks: [],
			noLossA: false,
			noLossB: false,
		};
	},
	created() {
		this.bindShortcuts();
		this.calcFromUrl();
	},
	computed: {
		lowProximity() {
			if ( !this.plays.length ) return false;

			return this.plays.slice(0).sort((a, b) => {
				return a.proximity - b.proximity;
			});
		},
		maxedStakeA() {
			return this.plays.filter(obj => {
				return obj.stakeA === Number(this.stakeA);
			});
		},
		balanced() {
			if ( !this.plays.length ) return false;

			return this.maxedStakeA.reduce((prev, current) => {
				return (prev.proximity < current.proximity) ? prev : current;
			});
		},
		highestA() {
			if ( !this.plays.length ) return false;

			return this.plays.reduce((prev, current) => {
				return (prev.profitA > current.profitA) ? prev : current;
			});
		},
		highestB() {
			if ( !this.plays.length ) return false;

			return this.plays.reduce((prev, current) => {
				return (prev.profitB > current.profitB) ? prev : current;
			});
		},
		underdog() {
			return this.oddsAx > this.oddsBx ? this.highestA : this.highestB;
		},
		favorite() {
			return this.oddsAx < this.oddsBx ? this.highestA : this.highestB;
		},
	},
	methods: {
		bindShortcuts() {
			document.addEventListener( 'keydown', (event) => {
				if ( this.isEditingLabelA || this.isEditingLabelB ) {
					return;
				}

				event = event || window.event;

				if ( event.keyCode === 83 ) {
					this.bookmarkPlay();
				}
			});
		},
		calculate() {
			// Don't search again if we haven't changed any inputs
			if ( !this.freshInput ) return;
			if ( !this.oddsA || !this.stakeA || !this.oddsB ) return;
			
			// Min loss
			if ( Number(this.oddsA) + Number(this.oddsB) < 0 ) {
				this.calculateMinLoss();
			}
			
			// Bookmarks
			if ( _.find(this.bookmarks, { 'id': `${this.oddsA}${this.oddsB}` }) ) {
				this.viewingBookmark = true;
			} else {
				this.viewingBookmark = false;
			}

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
		calcFromUrl() {
			const a = this.getQueryString('oddsa');
			const ax = this.getQueryString('stakea');
			const b = this.getQueryString('oddsb');
			
			console.log('calc from url', a, ax, b);
			this.oddsA = a;
			this.stakeA = ax;
			this.oddsB = b;

			this.calculate();
		},
		editLabel(l) {
			const prop = `isEditingLabel${l}`;
			const ref = `labelInput${l}`;
			this[prop] = true;

			this.$nextTick(() => {
				this.$refs[ref].focus();
			})
		},
		onKeyUp() {
			this.freshInput = true;
		},
		bookmarkPlay() {
			if ( !this.hasSearched ) {
				return;
			}
			
			if ( this.viewingBookmark ) {
				_.remove(this.bookmarks, (obj) => {
					return obj.id == `${this.oddsA}${this.oddsB}`;
				});
				
				this.viewingBookmark = false;
				return;
			}

			const play = {
				id: `${this.oddsA}${this.oddsB}`,
				labelA: this.labelA,
				labelB: this.labelB,
				oddsA: this.oddsA,
				oddsB: this.oddsB,
				delta: this.getDelta(this.oddsA, this.oddsB),
				ev: this.balanced ? this.balanced.ev.toFixed(2) : 0,
				percent: this.conversion ? this.conversion.percent : 0,
				hedge: this.conversion ? this.conversion.stakeB : 0,
			};
			this.bookmarks.push(play);
			this.viewingBookmark = true;
		},
		loadBookmark(play) {
			this.oddsA = play.oddsA;
			this.oddsB = play.oddsB;
			this.labelA = play.labelA;
			this.labelB = play.labelB;
			this.freshInput = true;
			this.calculate();
		}
	},
}
</script>