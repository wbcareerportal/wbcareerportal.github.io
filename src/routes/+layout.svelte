<script>
	import Header from './Header.svelte';
	import './styles.css';
	import { _, addMessages, init } from 'svelte-i18n';
	import en from '$lib/i18n/en.json';
	import hi from '$lib/i18n/hi.json';
	import bn from '$lib/i18n/bn.json';

	addMessages('en', en);
	addMessages('hi', hi);
	addMessages('bn', bn);

	init({
		initialLocale: "en",
	});
</script>

<div class="app">
	<Header />

	<main class="container col-lg-8 mx-auto">
		<slot />

		<footer class="text-center d-flex flex-column justify-content-center align-items-center p-3">
			<div class="col-10 mx-auto">
				<div class="row row-cols-1 gap-2 mb-5 w-100">
					<div class="col">
						<a href="/">{$_("footer_home")}</a>
					</div>
					<div class="col">
						<a href="/riasec">{$_("footer_riasec")}</a>
					</div>
				</div>
			</div>
			<span>{$_('footer')}</span>
			<span>Supported by <img src="/unicef-logo.png" alt="UNICEF Logo" /></span>
		</footer>
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	img {
		width: 5em;
	}

	footer {
		margin-top: 10em;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
