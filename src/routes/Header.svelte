<script>
	import { locale } from 'svelte-i18n';

	function setLocale(lang) {
		locale.set(lang);
	}
</script>

<header class="container d-flex justify-content-between mb-4">
	<div class="corner pt-2">
		<a href="https://wbcareerportal.in/">
			<img src="/sed-logo.png" alt="School Education Department Logo" />
			<!-- <img src="/wb-govt-logo.png" alt="Government of West Bengal Logo" /> -->
		</a>
	</div>

	<nav>
		<ul>
			<li aria-current={$locale === 'en' ? 'page' : undefined}>
				<span on:click={() => setLocale('en')}>English</span>
			</li>
			<li aria-current={$locale === 'hi' ? 'page' : undefined}>
				<span on:click={() => setLocale('hi')}>हिन्दी</span>
			</li>
			<li aria-current={$locale === 'bn' ? 'page' : undefined}>
				<span on:click={() => setLocale('bn')}>বাংলা</span>
			</li>
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
		/* margin-left: 6em; */
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

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav li {
		cursor: pointer;
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
	}

	li:hover {
		color: var(--color-theme-1);
	}
</style>
