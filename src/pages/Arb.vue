<template>
	<div>
		<input id="shareLink" class="copy-input" type="text" :value="shareLink">
		<input id="csv" class="copy-input" type="text" :value="csv">
	
		<form @submit.prevent="calculate">
			<div v-if="bookmarks.length" class="bookmarks">
				<div v-for="(play, i) in bookmarks" class="bookmark flex-stretch" :key="i" @click="loadBookmark(play)">
					<div :class="{'color-green': play.ev > 0, 'color-red': play.ev < 0}" class="ev flex-center">{{ play.ev|currency }}</div>
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
						<input type="text" v-model="stakeA" value="25" required @keyup="onKeyUp('xa')">
					</div>
					<div class="field">
						<label for="">Odds</label>
						<input type="text" v-model="oddsA" value="100" required @keyup="onKeyUp('oa')">
					</div>
				</div>
			</div>
			<div class="book">
				<input v-show="isEditingLabelB" type="text" v-model="labelB" class="label-input" ref="labelInputB" @blur="isEditingLabelB = false">
				<h2 v-show="!isEditingLabelB" @click="editLabel('B')">{{ labelB }}</h2>
				<div class="field-wrap flex-center">
					<div class="field">
						<label for="">Odds</label>
						<input type="text" v-model="oddsB" value="375" required @keyup="onKeyUp('ob')">
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
					<CardBalanced :play="arbBalanced" />
				</div>
			</transition>
		</section>
	</div>
</template>

<script>
import CardBalanced from '@/components/CardBalanced';
import _ from 'lodash';
import helpers from '@/components/mixins/helpers';

export default {
	name: 'Arb',
	mixins: [helpers],
	components: {
		CardBalanced,
	},
	data() {
		return {
			isFocusingInput: false,
			viewingBookmark: false,
			arbBalanced: false,
			loading: false,
			freshInput: true,
			hasSearched: false,
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
		csv() {
			const today = new Date();
			const dateArray = today.toLocaleDateString('en-US').split('/');
			dateArray.pop();
			const date = dateArray.join('/');

			return `'',${date},${this.labelA},${this.oddsA},${this.arbBalanced.stakeA},${this.arbBalanced.payoutA},${this.labelB},${this.oddsB},${this.arbBalanced.stakeB},${this.arbBalanced.payoutB},${this.arbBalanced.profitA},${this.arbBalanced.profitB}`;
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
			console.log('calculate');
			// Don't search again if we haven't changed any inputs
			if ( !this.freshInput ) return;
			if ( !this.oddsA || !this.stakeA || !this.oddsB ) return;
			
			// Reset stuff
			this.loading = true;
			this.freshInput = false;
			console.log('calculate 2');
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
			console.log('calculate 3');
			
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
			
			console.log('calculate 4');
			// Done loading
			this.loading = false;
			this.hasSearched = true;
			
			// Are we viewing a bookmark?
			if ( _.find(this.bookmarks, { 'id': `${this.oddsA}${this.oddsB}` }) ) {
				this.viewingBookmark = true;
			} else {
				this.viewingBookmark = false;
			}
			
			console.log('calculate 5');
		},
		calcFromUrl() {
			const a = this.getQueryString('oddsa');
			const ax = this.getQueryString('stakea');
			const b = this.getQueryString('oddsb');			
			const labelA = this.getQueryString('booka');
			const labelB = this.getQueryString('bookb');
			this.oddsA = a;
			this.stakeA = ax;
			this.oddsB = b;
			
			if ( labelA ) {
				this.labelA = decodeURIComponent(labelA);
			}
			
			if ( labelB ) {
				this.labelA = decodeURIComponent(labelB);
			}

			this.calculate();
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