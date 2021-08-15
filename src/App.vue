<template>
    <div id="app">
        <div v-if="bookmarks" class="bookmarks">
            <div v-for="(play, i) in bookmarks" class="bookmark flex-stretch" :key="i" @click="loadBookmark(play)">
                <div class="ev flex-center">${{ play.ev }}</div>
                <div class="games">
                    {{ play.labelA }} <strong>{{ play.oddsA }}</strong><br>
                    {{ play.labelB }} <strong>{{ play.oddsB }}</strong>
                </div>
            </div>
        </div>

        <button class="open-parser btn-util" @click.prevent="showParser = true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zm-132.9 88.7L299.3 420.7c-6.2 6.2-16.4 6.2-22.6 0L171.3 315.3c-10.1-10.1-2.9-27.3 11.3-27.3H248V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v112h65.4c14.2 0 21.4 17.2 11.3 27.3z"/></svg></button>
        <button v-if="plays.length && !loading && !loadingTimer" :class="{ 'viewing-bookmark': viewingBookmark }" class="save-play btn-util" @click.prevent="bookmarkPlay"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"/></svg></button>

        <form @submit.prevent="calculate">
            <div class="book">
                <input v-show="isEditingLabelA" type="text" v-model="labelA" class="label-input" ref="labelInputA" @blur="isEditingLabelA = false">
                <h2 v-show="!isEditingLabelA" @click="editLabel('A')">{{ labelA }}</h2>
                <div class="field-wrap flex-center">
                    <div class="field">
                        <label for="">Odds</label>
                        <input type="text" v-model="oddsA" value="100" required @keyup="onKeyUp">
                    </div>
                    <div class="field">
                        <label for="">Max bet</label>
                        <input type="text" v-model="maxA" value="25" @keyup="onKeyUp" required>
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
                    <div class="field">
                        <label for="">Max bet</label>
                        <input type="text" v-model="maxB" value="" @keyup="onKeyUp">
                    </div>
                </div>
            </div>
            <div class="flex-center button-wrap">
                <button class="btn" type="submit" name="button">Find arbitrage</button>
            </div>
        </form>


        <section v-if="loading || loadingTimer" class="loading flex-center">
            <div class="spinner"></div>
        </section>

        <section class="card-section alt">

            <transition name="fade">
                <div v-if="plays.length && !loading && !loadingTimer" class="card-wrap">
                    <CardUnderdog :play="underdog" />
                    <CardBalanced :play="balanced" />
                    <CardFavorite :play="favorite" />
                </div>
            </transition>
        </section>

        <section v-if="hasSearched && !plays.length && !loadingTimer && !loading" class="no-results flex-center">
            <div>
                <h1>No arbitrage opportunites</h1>
                <p>Sum of odds must be positive</p>
            </div>
        </section>

        <div v-show="showParser" class="modal-backdrop">
            <div class="modal">
                <Parser @parse="handleParse($event)" @close="closeParser"/>
            </div>
        </div>
    </div>
</template>

<script>
import CardUnderdog from '@/components/CardUnderdog';
import CardFavorite from '@/components/CardFavorite';
import CardBalanced from '@/components/CardBalanced';
import _ from 'lodash';
import Parser from '@/components/Parser';
import helpers from '@/components/mixins/helpers';

export default {
    name: 'App',
    mixins: [helpers],
    components: {
        CardUnderdog,
        CardBalanced,
        CardFavorite,
        Parser,
    },
    data() {
        return {
            showParser: false,
            isFocusingInput: false,
            viewingBookmark: false,
            oddsA: '',
            maxA: '',
            oddsB: '',
            maxB: '',
            plays: [],
            loading: false,
            loadingTimer: false,
            freshInput: true,
            hasSearched: false,
            labelA: 'Book A',
            labelB: 'Book B',
            isEditingLabelA: false,
            isEditingLabelB: false,
            bookmarks: [],
        };
    },
    created() {
        this.bindShortcuts();
    },
    computed: {
        testing() {
            return _.find(this.scrapeFD, { 'team': 'Angels' });
        },
        lowProximity() {
            if ( !this.plays.length ) return false;

            return this.plays.slice(0).sort((a, b) => {
                return a.proximity - b.proximity;
            });
        },
        maxedStakeA() {
            return this.plays.filter(obj => {
                return obj.stakeA === 25;
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
        closeParser() {
            this.showParser = false;
            this.bindShortcuts();
        },
        bindShortcuts() {
            document.addEventListener( 'keydown', (event) => {
                if ( this.isEditingLabelA || this.isEditingLabelB ) {
                    return;
                }

                event = event || window.event;
                if ( event.keyCode === 80 ) {
                    this.showParser = true;
                }

                if ( event.keyCode === 83 && this.plays.length ) {
                    this.bookmarkPlay();
                }
            });
        },
        handleParse($event) {
            console.log('handleParse $event', $event);
            this.showParser = false;
            this.labelA = $event.dkName;
            this.labelB = $event.fdName;

            this.oddsA = $event.dkOdds;
            this.oddsB = $event.fdOdds;

            this.maxA = 50;
            this.freshInput = true;
            this.calculate();
        },
        calculate() {
            // Don't search again if we haven't changed any inputs
            if ( !this.freshInput ) return;

            // Reset stuff
            this.plays = [];
            this.loading = true;
            this.loadingTimer = true;
            this.freshInput = false;
            this.oddsAx = this.oddsA;
            this.oddsBx = this.oddsB;

            setTimeout(() => {
                this.loadingTimer = false;
            }, 300);

            if ( this.maxA ) {

                // Start at max stake and decrement
                for (var xa = Number(this.maxA); xa > 0; xa -= 0.5 ) {
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

            if ( _.find(this.bookmarks, { 'id': `${this.oddsA}${this.oddsB}` }) ) {
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
        onKeyUp() {
            this.freshInput = true;
        },
        bookmarkPlay() {
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
                ev: this.balanced.ev.toFixed(2),
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

<style lang="scss">
@import 'src/assets/scss/style.scss';
</style>