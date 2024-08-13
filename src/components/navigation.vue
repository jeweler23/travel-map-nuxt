<script setup lang="ts">
interface IList {
  list: string[];
}

const props = defineProps<IList>();
</script>

<template>
	<ul>
		<li v-for="item in list" :key="item">
			<NuxtLink :to="item">
				{{ item }}
			</NuxtLink>
		</li>
	</ul>
</template>
