<script>
	import Header from './Header.svelte';
	import './styles.css';
	import cc from '$lib/images/creative-commons.svg';
</script>

<div class="app">
	<Header />

	<main class="container">
		<slot />
	</main>

	<footer class="d-flex flex-column justify-content-center align-items-center pt-4 pb-2">
		<hr class="w-50" />
		<p><img src={cc} alt="Creative Commons Logo" /> Developed for UNICEF</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	img {
		width: 1em;
		height: 1em;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
