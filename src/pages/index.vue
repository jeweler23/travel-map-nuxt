<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import type { YMap } from '@yandex/ymaps3-types';
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';
import navigation from '@/components/navigation.vue';
import { useCountryStore } from '~/store/countryStore';

const countryStore = useCountryStore();
// хочу сделать, чтобы сначала логин стртаница была

const map = shallowRef<null | YMap>(null);

const navList = ['login', 'register'];
const coords = ref<[number, number]>([37.617644, 55.755819]);

onMounted(() => {
  if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			coords.value[0] = position.coords.longitude;
			coords.value[1] = position.coords.latitude;
		});
  }
});
</script>

<template>
	<NuxtLayout name="main">
		<template #nav>
			<navigation :list="navList">
				<img v-if="countryStore.src" :src="countryStore.src" alt="">
			</navigation>
		</template>

		<template #main>
			<div class="w-96 h-[50vh]">
				<yandex-map
					v-model="map"
					:settings="{
						location: {
							center: coords,
							zoom: 9,
						},
					}"
					width="100%"
					height="100%"
				>
					<yandex-map-default-scheme-layer />
				</yandex-map>
			</div>
		</template>
	</NuxtLayout>
</template>
