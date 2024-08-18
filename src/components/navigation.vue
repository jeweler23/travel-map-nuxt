<script setup lang="ts">
interface IList {
  list: string[];
}

defineProps<IList>();
</script>

<template>
	<ul>
		<slot />
		<li v-for="item in list" :key="item">
			<NuxtLink :to="item">
				{{ item }}
			</NuxtLink>
		</li>
	</ul>
</template>
