<template>
	<div>
		<div class="copy-confirmation">copied to clipboard</div>
	
		<form @submit.prevent="calculate">
			<div v-if="bookmarks.length" class="bookmarks">
				<div v-for="(play, i) in bookmarks" class="bookmark flex-stretch" :key="i" @click="loadBookmark(play)">
					<div class="ev flex-center">{{ play.ev|currency }}</div>
					<div class="games">
						{{ play.labelA }} <strong>{{ play.oddsA }}</strong><br>
						{{ play.labelB }} <strong>{{ play.oddsB }}</strong>
					</div>
				</div>
			</div>
			<div class="settings">
				<div>
					<label for="" style="display:block;">Rounding</label>
					<div class="toggle toggle-round">
						<input id="round" v-model="round" type="checkbox" value="true">
						<label for="round"></label>
						<div class="knob"></div>
					</div>
				</div>
			</div>
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
					<button v-if="arbBalanced && !loading" :class="{ 'viewing-bookmark': viewingBookmark }" class="save-play btn-util" @click.prevent="bookmarkPlay"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"/></svg></button>
				</div>
			</div>
		</form>
	
	
		<section v-if="loading" class="loading flex-center">
			<div class="spinner"></div>
		</section>
	
		<section class="card-section alt">
			<transition name="fade">
				<div v-if="arbBalanced && !loading" class="card-wrap">
					<CardUnderdog v-if="underdog" :play="underdog" />
					<CardBalanced :play="arbBalanced" />
					<CardFavorite v-if="favorite" :play="favorite" />
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
			arbBalanced: false,
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
			
			// Reset stuff
			this.loading = true;
			this.freshInput = false;
			
			// Calculations
			const payoutA = Number(this.getPayout(this.oddsA, this.stakeA));				
			let stakeB = this.getStake(this.oddsB, payoutA);
			if ( this.round ) {
				stakeB = Math.round(stakeB);
			}
			const payoutB = Number(this.getPayout(this.oddsB, stakeB));
			const sunk = Number(this.stakeA) + Number(stakeB);
			const profitB = payoutB - sunk;
			const profitA = payoutA - sunk;
			
			// Push our card data
			this.arbBalanced = {
				stakeA: Number(this.stakeA),
				oddsA: this.oddsA,
				oddsB: this.oddsB,
				payoutA,
				profitA,
				stakeB,
				payoutB,
				profitB,
				ev: (profitA + profitB) / 2,
			}
			
			// Done loading
			this.loading = false;
			this.hasSearched = true;
			
			// Are we viewing a bookmark?
			if ( _.find(this.bookmarks, { 'id': `${this.oddsA}${this.oddsB}` }) ) {
				this.viewingBookmark = true;
			} else {
				this.viewingBookmark = false;
			}
		},
		calcFromUrl() {
			const a = this.getQueryString('oddsa');
			const ax = this.getQueryString('stakea');
			const b = this.getQueryString('oddsb');			
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
			
			// Remove?
			if ( this.viewingBookmark ) {
				_.remove(this.bookmarks, (obj) => {
					return obj.id == `${this.oddsA}${this.oddsB}`;
				});
				
				this.viewingBookmark = false;
				return;
			}
			
			// Create
			const bookmark = _.clone(this.arbBalanced)
			bookmark.id = `${this.oddsA}${this.oddsB}`
			bookmark.labelA = this.labelA;
			bookmark.labelB = this.labelB;
			
			this.bookmarks.push(bookmark);
			this.viewingBookmark = true;
		},
		loadBookmark(bookmark) {
			this.oddsA = bookmark.oddsA;
			this.stakeA = bookmark.stakeA;
			this.oddsB = bookmark.oddsB;
			this.labelA = bookmark.labelA;
			this.labelB = bookmark.labelB;
			this.freshInput = true;
			this.calculate();
		},
	},
	watch: {
		round() {
			this.freshInput = true;
			this.calculate();
		}
	},
}
</script>