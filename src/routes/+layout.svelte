<script>
	import Header from './Header.svelte';
	import './styles.css';
	import github from '$lib/images/github.svg';
</script>

<div class="app">
	<Header />

	<main class="container">
		<slot />
	</main>

	<footer>
		<p>Career Path 2023</p>
		<p>Powered by <img src={github} alt="GitHub Logo" /></p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	img {
		width: 1.5em;
		height: 1.5em;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
