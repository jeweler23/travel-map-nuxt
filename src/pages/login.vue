<script setup lang="ts">
import { type CredentialResponse, useOneTap } from 'vue3-google-signin';
import FormLayouts from '@/layouts/FormLayouts.vue';
import LoginForm from '@/components/LoginForm.vue';

// в хроме почему-то не работает
useOneTap({
  onSuccess: (response: CredentialResponse) => {
    console.log('Success:', response);
  },
  onError: () => console.error('Error with One Tap Login'),
  // options
});
</script>

<template>
	<NuxtLayout name="auth">
		<form-layouts>
			<template #form>
				<login-form />
			</template>
			<template #links>
				<div class="flex justify-between text-blue-400">
					<nuxt-link to="/">
						Home
					</nuxt-link>
					<nuxt-link to="register">
						Register
					</nuxt-link>
				</div>
			</template>
		</form-layouts>
	</NuxtLayout>
</template>
