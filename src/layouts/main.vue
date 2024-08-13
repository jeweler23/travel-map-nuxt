<script setup lang="ts"></script>

<template>
	<main class="flex">
		<section class="z-20">
			<slot name="nav" />
		</section>
		<section class="w-full h-full">
			<slot name="main" />
		</section>
	</main>
</template>
