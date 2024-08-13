<script setup lang="ts">
import { shallowRef } from 'vue';
import type { YMap } from '@yandex/ymaps3-types';
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';
import navigation from '@/components/navigation.vue';

// Можно использовать для различных преобразований
const map = shallowRef<null | YMap>(null);

const navList = ['login', 'register'];
</script>

<template>
	<NuxtLayout name="main">
		<template #nav>
			<navigation :list="navList" />
		</template>

		<template #main>
			<div class="w-96">
				<yandex-map
					v-model="map"
					:settings="{
						location: {
							center: [37.617644, 55.755819],
							zoom: 9,
						},
					}"
					width="100vw"
					height="100vh"
				>
					<yandex-map-default-scheme-layer />
				</yandex-map>
			</div>
		</template>
	</NuxtLayout>
</template>
