<script setup lang="ts">
const value = defineModel();

</script>

<template>
	<input v-model="value" autocomplete="off" type="text" class="w-52  border border-gray-400 rounded-lg p-1 outline-none focus:border-blue-500">
</template>
