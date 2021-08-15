const helpers = {
    computed: {
        sheetString() {
            const today = new Date();
            const dateArray = today.toLocaleDateString('en-US').split('/');
            dateArray.pop();
            const date = dateArray.join('/');

            return `'',${date},${this.$parent.labelA},${this.$parent.oddsAx},${this.play.stakeA},,${this.$parent.labelB},${this.$parent.oddsBx},${this.play.stakeB}`;
        },
    },
    methods: {
        getPayout(odds, stake) {
            var payout = 0;

            payout = odds > 0
            ? (stake * (odds / 100) ) + stake
            : (stake / ((odds * -1) / 100 ) ) + stake;

            return Number(payout).toFixed(2);
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


