<script setup lang="ts">
const inputs = ref<Array<Element | ComponentPublicInstance | null>>([]);

const isActive = ref<string[]>([]);

function handleFocus(name: string) {
  isActive.value.push(name);
}

function handleBlur(e: Event, name: string) {
	if ((e.target as HTMLInputElement).value.length === 0 && isActive.value.length > 0) {
			isActive.value = isActive.value.filter((item: string) => item !== name);
	}
}

const form = ref(null);

const dataRegister = ref({
	username: '',
	email: '',
	password: '',
});

async function submitRegisterData() {
	try {
		const { data } = await useAsyncData('register', () => $fetch('/api/auth/register', {
    method: 'POST',
    body: dataRegister.value,
  }));
		console.log(data.value);
	}
	catch (e) {
		console.log(e);
	}
}
</script>

<template>
	<form ref="form" action="" class="flex flex-col gap-3" @submit.prevent="submitRegisterData">
		<div class="relative">
			<label
				for="login"
				class="absolute  left-2 -translate-y-[50%] pointer-events-none transition-all text-xs bg-white"
				:class="{ 'text-xs bg-white  top-[0px]': isActive.includes('login') }"
			>Login</label>
			<input
				:ref="(el) => (inputs[0] = el)"
				v-model="dataRegister.username"
				type="text"
				class="p-2 border-gray-400 outline-none border-2 rounded-lg w-full"
				name="login"
				@focus="handleFocus('login')"
				@blur="handleBlur($event, 'login')"
			>
		</div>
		<div class="relative">
			<label
				for="email"
				class="absolute  left-2 -translate-y-[50%] pointer-events-none transition-all text-xs bg-white"
				:class="{ 'text-xs bg-white  top-[0px]': isActive.includes('email') }"
			>Email</label>
			<input
				:ref="(el) => (inputs[0] = el)"
				v-model="dataRegister.email"
				type="email"
				class="p-2 border-gray-400 outline-none border-2 rounded-lg w-full"
				name="email"
				@focus="handleFocus('email')"
				@blur="handleBlur($event, 'email')"
			>
		</div>
		<div class="relative">
			<label
				for="password"
				class="absolute  left-2 -translate-y-[50%] z-10 pointer-events-none transition-all text-xs bg-white "
				:class="{ 'text-xs bg-white  -top-[50%]': isActive.includes('password') }"
			>
				Password
			</label>
			<input
				:ref="(el) => (inputs[1] = el)"
				v-model="dataRegister.password"
				type="password"
				class="p-2 border-gray-400 outline-none border-2 rounded-lg w-full"
			>
			<!-- 				@focus="handleFocus('password')"
				@blur="handleBlur($event, 'password')" -->
		</div>

		<input
			type="submit"
			class="text-white bg-blue-400 p-2 rounded-2xl cursor-pointer"
			value="Регистрация"
		>
	</form>
</template>
