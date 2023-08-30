<script>
import SelectionDropdown from "$lib/filter/SelectionDropdown.svelte";
import { language } from '../stores.js';
</script>

<svelte:head>
	<title>Filter - Career Pathways</title>
	<meta name="description" content="Filter your career choices based on your interests!" />
</svelte:head>

<section class="container">
	<div class="col my-5">
		{#if $language === "hi"}
			<h4> सफलता के लिए 500 सड़कें</h4>
			<h1>स्कूल के बाद जीवन की दिशा चुनना</h1>
			<p>अपने लिए करियर चुनना कनफ़्यूज़ कर सकता है। बेहतर है अगर आप उन चीज़ों से शुरू करें जिन्हें आप करना पसंद करते हैं - जैसे कि आपकी रुचियाँ!</p>
		{:else}
			<h4>500 Roads to Success</h4>
			<h1>Navigating life after school</h1>
			<p>Choosing a career can be quite confusing. It is a good idea to start with the things that you like to do - your interests!</p>
		{/if}
	</div>

	<SelectionDropdown />
</section>

<style>

</style>
