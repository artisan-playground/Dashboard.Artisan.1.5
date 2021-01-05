<template>
    <div>
        <Googlemap/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Googlemap from '../components/Googlemap.vue'

export default {
    name: "Clockin",
    components: {
        Googlemap
    }
}
</script>