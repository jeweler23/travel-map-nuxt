<script setup lang="ts">
import {
  type CredentialResponse,
  GoogleSignInButton,
 useOneTap,
} from 'vue3-google-signin';

function handleLoginSuccess(response: CredentialResponse) {
  const { credential } = response;
  console.log('Access Token', credential);
}

function handleLoginError() {
  console.error('Login failed');
}

const route = useRoute();

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
		<!-- <p class="p-8 shadow-md">

		</p> -->
		<google-sign-in-button
			@success="handleLoginSuccess"
			@error="handleLoginError"
		/>
		<nuxt-link to="/">
			Home
		</nuxt-link>
		<nuxt-link to="login">
			Login
		</nuxt-link>
	</NuxtLayout>
</template>
