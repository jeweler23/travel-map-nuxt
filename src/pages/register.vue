<script setup lang="ts">
import FormLayouts from '@/layouts/FormLayouts.vue';
import RegisterForm from '@/components/RegisterForm.vue';
</script>

<template>
	<NuxtLayout name="auth">
		<form-layouts>
			<template #form>
				<register-form />
			</template>
			<template #links>
				<div class="flex justify-between text-blue-400">
					<nuxt-link to="/">
						Home
					</nuxt-link>
					<nuxt-link to="login">
						Login
					</nuxt-link>
				</div>
			</template>
		</form-layouts>
	</NuxtLayout>
</template>
