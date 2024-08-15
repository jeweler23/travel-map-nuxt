<script setup lang="ts">
const route = useRoute();
</script>

<template>
	<NuxtLayout name="auth">
		<p class="p-8 shadow-md">
			{{ route.fullPath }}
		</p>
		<nuxt-link to="/">
			Home
		</nuxt-link>
		<nuxt-link to="login">
			Login
		</nuxt-link>
	</NuxtLayout>
</template>
