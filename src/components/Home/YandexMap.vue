<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import type { DomEventHandler, YMap } from '@yandex/ymaps3-types';
import type { YMapMarkerProps } from '@yandex/ymaps3-types/imperative/YMapMarker';
import { YandexMap, YandexMapDefaultFeaturesLayer, YandexMapDefaultMarker, YandexMapDefaultSchemeLayer, YandexMapEntity, YandexMapListener } from 'vue-yandex-maps';
import SuggestInput from '../Inputs/SuggestInput.vue';
import type { LatLon } from '~/Types/map';

const map = shallowRef<null | YMap>(null);

const coords = ref<LatLon>([37.617644, 55.755819]);
const markerCoords = ref(coords.value);

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      coords.value = [position.coords.longitude, position.coords.latitude];
      markerCoords.value = coords.value;
    });
  }
});

// Marker

const markers = computed(() => [
  {
    coordinates: markerCoords.value,
    color: 'red',
    // title: addressString.value,

  },
]);

const setCoordinates: DomEventHandler = async (document, event) => {
  markerCoords.value = [event.coordinates[0], event.coordinates[1]];
};

const searchCity = ref('');

const suggestResponse = ref();

watch(searchCity, async () => {
  const { data } = await useAsyncData('suggest', () => $fetch('/api/suggest/yandex-suggest', {
    method: 'GET',
    params: { text: searchCity.value },
  }));

  suggestResponse.value = data.value.results;
  console.log(suggestResponse.value);
});
</script>

<template>
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
		<yandex-map-default-features-layer />
		<yandex-map-listener :settings="{ onClick: setCoordinates }" />
		<yandex-map-default-marker
			v-for="(marker, index) in markers"
			:key="index"
			:settings="marker"
		/>
		<yandex-map-entity>
			<div class="absolute top-0 right-0">
				<div class="relavite">
					<suggest-input v-model="searchCity" placeholder="Введите название города" />
					<ul id="suggest" class="w-full text-black z-50 bg-white">
						<li
							v-for="item in suggestResponse ?? []"
							:key="item.address.formatted_address"
							class="w-52 cursor-pointer"
							@click="searchCity = item.address.formatted_address"
						>
							{{ item.address.formatted_address }}
						</li>
					</ul>
				</div>
			</div>
		</yandex-map-entity>
	</yandex-map>
</template>

<style scoped>
  .marker {
    position: relative;
    width: 20px;
    height: 20px;
    background: #ff0000;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    text-align: center;
    color: #fff;
    font-weight: bold;
    line-height: 20px;
  }
</style>
