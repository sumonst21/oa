<template>
    <div id="app" :class="$route.name">
        <header class="masthead text-center">
            <div class="logo flex-center">hedge calculators</div>
            <Navigation/>
        </header>
        <router-view />
    </div>
</template>

<style lang="scss">
    @import '@/assets/scss/style.scss';
</style>
<script>
import Navigation from '@/components/Navigation';

export default {
    components: {
        Navigation
    },
}
</script>