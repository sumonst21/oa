const helpers = {
    data() {
      return {
        stakeA: '',
        oddsA: '',
        oddsB: '',
        conversionRate: '75',
        labelA: 'Book A',
        labelB: 'Book B',
        isEditingLabelA: false,
        isEditingLabelB: false,
        copyConfirmation: '',
      };
    },
    computed: {
        round: {
            get () {
                return this.$store.state.round;
            },
            set (value) {
                this.$store.state.round = value;
            },
        },
        shareLink() {
            const arr = [
                `stakea=${this.stakeA}`,
                `oddsa=${this.oddsA}`,
                `oddsb=${this.oddsB}`,
            ];
              
            if ( this.labelA !== 'Book A') {
                arr.push(`booka=${encodeURIComponent(this.labelA)}`);
            }
              
            if ( this.labelB !== 'Book B') {
                arr.push(`booka=${encodeURIComponent(this.labelB)}`);
            }
            
            const params = arr.join('&');
            return `${window.location.href}?${params}`;
        },
    },
    filters: {
      currency(amount) {
        const num = Number(amount).toFixed(2);
        
        if ( num < 0 ) {
            return `-$${Number(num * -1).toLocaleString('en-US')}`;
        }
        
        return `$${Number(num).toLocaleString('en-US')}`;
      }
    },
    methods: {
        editLabel(l) {
            const prop = `isEditingLabel${l}`;
            const ref = `labelInput${l}`;
            this[prop] = true;

            this.$nextTick(() => {
                this.$refs[ref].focus();
            })
        },
        copyToClipboard(id) {
          const copyText = document.getElementById(id);
          copyText.select();
          copyText.setSelectionRange(0, 99999);
          document.execCommand('copy');
          console.log('copy', id);
          
          if ( id === 'shareLink' ) {
            console.log('share');
            this.copyConfirmation = 'Copied share URL';
            console.log(this.copyConfirmation);
          }
          
          if ( id === 'csv' ) {
            console.log('csv');
            this.copyConfirmation = 'Copied excel CSV';
          }

          setTimeout(() => {
              this.copyConfirmation = false;
          }, 600);
        },
        onKeyUp(field) {
            this.freshInput = true;
            console.log('on keyup', field);
            
            if ( field == 'oa' && this.oddsA ) {
                console.log(this.oddsA);
                this.oddsA = this.oddsA.replace(/[^+-\d]/, '');                
            }
            
            if ( field == 'ob' && this.oddsB ) {
                console.log(this.oddsB);
                this.oddsB = this.oddsB.replace(/[^+-\d]/, '');
            }
            
            if ( field == 'xa' && this.stakeA ) {
                this.stakeA = this.stakeA.replace(/[^\d]/, '');
            }
            
            if ( field == 'cr' && this.conversionRate ) {
                this.conversionRate = this.conversionRate.replace(/[^\d]/, '');
            }
        },
        getConversionColor(percent) {
            if ( percent < 60 ) {
                return 'color-red';
            } else if ( percent < 70 ) {
                return 'color-orange';
            } else if ( percent < 80 ) {
                return 'color-blue';
            } else {
                return 'color-green';
            }
        },
        percentOf(orig, final) {
          const percent = (final / orig) * 100;
          return Number(percent.toFixed(2));
        },
        getPayout(odds, stake) {
            var payout = 0;
            odds = Number(odds);
            stake = Number(stake);

            payout = odds > 0
            ? (stake * (odds / 100) ) + stake
            : (stake / ((odds * -1) / 100 ) ) + stake;
            
            return Number(Number(payout).toFixed(2));
        },
        getStake(oddsB, payoutA) {
            const odds = Number(oddsB);
            const payout = Number(payoutA);
            
            if ( odds < 0 ) {
                const o = ( odds * -1 ) / 100;
                return Number(((payout) / (1 + (1/o) )).toFixed(2));
            }
            
            const o = odds / 100;
            return payoutA / (1 + o);
        },
        getQueryString(field) {
            const href = window.location.href;
            const reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
            const string = reg.exec(href);
        
            return string ? string[1] : null;
        },
    },
};

export default helpers;


