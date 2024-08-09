<script setup lang="ts">
import { useCountryStore } from '~/store/countryStore';

const countryStore = useCountryStore();

const { country } = storeToRefs(countryStore);

function incrementCount() {
  country.value += 1; // Теперь это работает корректно, так как 'country' — это 'ref'.
}
</script>

<template>
	<h1 class="text-3xl font-bold underline">
		Hello world!
	</h1>
	<button
		@click="incrementCount"
	>
		click
	</button>
	<p>{{ country }}</p>
</template>
