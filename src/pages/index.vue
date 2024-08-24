<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import YandexMap from '~/components/Home/YandexMap.vue';
import { useCountryStore } from '~/store/countryStore';

const countryStore = useCountryStore();
// хочу сделать, чтобы сначала логин стртаница была

const navList = ['login', 'register'];
</script>

<template>
	<NuxtLayout name="main">
		<template #nav>
			<navigation :list="navList">
				<img v-if="countryStore.src" :src="countryStore.src" alt="">
			</navigation>
		</template>

		<template #main>
			<div class="w-full h-[100vh]">
				<yandex-map />
			</div>
		</template>
	</NuxtLayout>
</template>
