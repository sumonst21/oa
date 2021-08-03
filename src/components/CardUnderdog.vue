<template>
    <div class="card">
        <h2>Underdog</h2>
        <div class="card-body">
            <div class="flex split">
                <div class="amount">
                    <label>{{ this.$parent.labelA }} ({{ this.$parent.oddsAx }})</label>
                    <div class="number">${{ play.stakeA }}</div>
                    <small>stake</small>
                </div>
                <div class="amount">
                    <label>{{ this.$parent.labelB }} ({{ this.$parent.oddsBx }})</label>
                    <div class="number">${{ play.stakeB }}</div>
                    <small>stake</small>
                </div>
            </div>
            <div class="flex-center mt-15 mb-25">
                <div class="amount">
                    <div class="number sunk color-orange">${{ play.stakeA + play.stakeB }}</div>
                    <small>sunk</small>
                </div>
            </div>
            <div class="flex split card-bottom">
                <div class="amount">
                    <div class="number color-green">${{ play.profitA }}</div>
                    <small>${{ play.payoutA }} payout</small>
                </div>
                <span class="or">or</span>
                <div class="amount">
                    <div class="number color-green">${{ play.profitB }}</div>
                    <small>${{ play.payoutB }} payout</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardUnderdog',
    props: {
        play: Object,
    },
}
</script>