<script setup lang="ts">
import {
  type CredentialResponse,
  GoogleSignInButton,
} from 'vue3-google-signin';

import { useCountryStore } from '~/store/countryStore';

const countryStore = useCountryStore();

// google-auth
async function handleLoginSuccess(response: CredentialResponse) {
  const { credential } = response;
	if (credential) {
	const { data } = await useAsyncData('google', () => $fetch('api/google-login', {
		method: 'POST',
		body: {
			token: credential,
		},
	}));

	if (data.value) {
		countryStore.src = data.value.picture;
		navigateTo('/');
	}
	console.log(data.value);
	}
}

function handleLoginError() {
  console.error('Login failed');
}

const inputs = ref<Array<Element | ComponentPublicInstance | null>>([]);

const activeInputs = ref<string[]>([]);

function addActiveInput(name: string) {
  activeInputs.value.push(name);
}

function handleBlur(e: Event, name: string) {
	if ((e.target as HTMLInputElement).value.length === 0 && activeInputs.value.length > 0) {
			activeInputs.value = activeInputs.value.filter((item: string) => item !== name);
	}
}

const form = ref(null);

function submitRegisterData() {
    if (form.value) {
      const formData = new FormData(form.value);
      for (const [key, value] of formData) {
          console.log(key, value);
        }
    }
}
</script>

<template>
	<form ref="form" action="" class="flex flex-col gap-3" @submit.prevent="submitRegisterData">
		<div class="relative">
			<label
				for="login"
				class="absolute top-[50%] left-2 -translate-y-[50%] pointer-events-none transition-all"
				:class="{ 'text-xs bg-white top-[0px]': activeInputs.includes('login') }"
			>Login</label>
			<input
				:ref="(el) => (inputs[0] = el)"
				type="text"
				class="p-2 border-gray-400 outline-none border-2 rounded-lg w-full"
				name="login"
				@focus="addActiveInput('login')"
				@blur="handleBlur($event, 'login')"
			>
		</div>
		<div class="relative">
			<label
				for="login"
				class="absolute top-[50%] left-2 -translate-y-[50%] z-10 pointer-events-none transition-all"
				:class="{ 'text-xs bg-white top-[0px]': activeInputs.includes('password') }"
			>Password</label>

			<input
				:ref="(el) => (inputs[1] = el)"
				type="password"
				class="p-2 border-gray-400 outline-none border-2 rounded-lg w-full"

				@focus="addActiveInput('password')"
				@blur="handleBlur($event, 'password')"
			>
		</div>

		<google-sign-in-button
			@success="handleLoginSuccess"
			@error="handleLoginError"
		/>
		<input
			type="submit"
			class="text-white bg-blue-400 p-2 rounded-2xl cursor-pointer"
			value="Войти"
		>
	</form>
</template>
