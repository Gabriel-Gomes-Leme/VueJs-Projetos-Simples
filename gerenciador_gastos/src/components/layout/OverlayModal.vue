<template>
<div class="overlay-modal"></div>
</template>

<script>
export default {
    name:'Overlay-Modal'
}
</script>

<style>

.overlay-modal{
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--dark-transparent-high);
    z-index: 2;
    transition: all 0.5s ease;
}
</style>