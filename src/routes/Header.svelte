<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/unicef-logo.png';
	import { language } from '../stores.js';

	function setLanguage(lang) {
		$language = lang;
	}
</script>

<header class="d-flex justify-content-between mb-4">
	<div class="corner">
		<a href="/">
			<img src={logo} alt="UNICEF Logo" />
		</a>
	</div>

	<nav>
		<ul>
			<li on:click={() => setLanguage('en')}>English</li>
			<li on:click={() => setLanguage('hi')}>Hindi</li>
		</ul>
	</nav>

</header>

<style>
	.corner {
		width: 6em;
		height: 6em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 9em;
		height: 6em;
		margin-left: 6em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	nav li {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
		cursor: pointer;
	}

	li:hover {
		color: var(--color-theme-1);
	}
</style>
