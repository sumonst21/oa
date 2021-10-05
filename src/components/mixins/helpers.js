const helpers = {
    computed: {
        sheetString() {
            const today = new Date();
            const dateArray = today.toLocaleDateString('en-US').split('/');
            dateArray.pop();
            const date = dateArray.join('/');

            return `'',${date},${this.$parent.labelA},${this.$parent.oddsAx},${this.play.stakeA},,${this.$parent.labelB},${this.$parent.oddsBx},${this.play.stakeB}`;
        },
        round: {
            get () {
                return this.$store.state.round;
            },
            set (value) {
                this.$store.state.round = value;
            },
        },
    },
    filters: {
      currency(amount) {
        const num = Number(amount).toFixed(2);
        
        if ( num < 0 ) {
            return `-$${num * -1}`.toLocaleString('en-US');
        }
        
        return `$${Number(num).toLocaleString('en-US')}`;
      }
    },
    methods: {
        onKeyUp() {
            this.freshInput = true;
            this.stakeA = this.stakeA.replace(/[^\d]/, '');
            this.oddsA = this.oddsA.replace(/[^+-\d]/, '');
            this.oddsB = this.oddsB.replace(/[^+-\d]/, '');
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
        getDelta(one, two) {
            one = Number(one);
            two = Number(two);

            if ( one > 0 && two > 0) {
                return Math.abs(one - two);
            }

            return one + two;
        },
        copyToClipboard(inputID) {
            const copyText = document.getElementById(inputID);
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand('copy');
            document.querySelector('body').classList.add('show-copy-confirmation');

            setTimeout(() => {
                document.querySelector('body').classList.remove('show-copy-confirmation');
            }, 700)
        },
    }
};

export default helpers;


