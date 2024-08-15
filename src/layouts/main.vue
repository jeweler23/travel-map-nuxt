<script setup lang="ts"></script>

<template>
	<main class="flex">
		<section class="z-20">
			<slot name="nav" />
		</section>
		<!-- хыхыхы хз как еще скрыть -->
		<section class="w-full h-full overflow-hidden">
			<slot name="main" />
		</section>
	</main>
</template>
