const helpers = {
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
    }
};

export default helpers;


