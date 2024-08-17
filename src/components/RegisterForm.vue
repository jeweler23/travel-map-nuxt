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
				:class="{ 'text-xs bg-white  -top-[1px]': isActive.includes('login') }"
			>Login</label>
			<input
				:ref="(el) => (inputs[0] = el)"
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
				class="absolute top-[50%] left-2 -translate-y-[50%] pointer-events-none transition-all"
				:class="{ 'text-xs bg-white  -top-[1px]': isActive.includes('email') }"
			>Email</label>
			<input
				:ref="(el) => (inputs[0] = el)"
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
				class="absolute top-[50%] left-2 -translate-y-[50%] z-10 pointer-events-none transition-all"
				:class="{ 'text-xs bg-white  -top-[1px]': isActive.includes('password') }"
			>
				Password
			</label>
			<input
				:ref="(el) => (inputs[1] = el)"
				type="password"
				class="p-2 border-gray-400 outline-none border-2 rounded-lg w-full"
				@focus="handleFocus('password')"
				@blur="handleBlur($event, 'password')"
			>
		</div>

		<input
			type="submit"
			class="text-white bg-blue-400 p-2 rounded-2xl cursor-pointer"
			value="Войти"
		>
	</form>
</template>
