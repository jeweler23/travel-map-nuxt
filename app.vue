<script setup lang="ts">
const props = defineProps({
  type: String,
});
const emit = defineEmits(['']);
const b = ref('');
</script>

<template>
	<div>
		<NuxtRouteAnnouncer />
		<NuxtWelcome />
		<div
			is="header"
			v-for="item in 30"
			v-if="true"
			v-once
			id="uniqueID"
			ref="header"
			v-model="b"
			my-prop="prop"
			@click="console.log"
		/>
	</div>
</template>
