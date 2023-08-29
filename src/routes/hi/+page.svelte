<script>
	import SelectionDropdown from "$lib/filter/SelectionDropdown.svelte";
	import FilterCareers from "$lib/filter/FilterCareers.svelte";
	
	let language = "hi";
	</script>
	
	<svelte:head>
		<title>Filter - Career Pathways</title>
		<meta name="description" content="Filter your career choices based on your interests!" />
	</svelte:head>
	
	<section class="container">
		<div class="col my-5">
			<h4> सफलता के लिए 500 सड़कें</h4>
			<h1>स्कूल के बाद जीवन की दिशा चुनना</h1>
			<p>अपने लिए करियर चुनना कनफ़्यूज़ कर सकता है। बेहतर है अगर आप उन चीज़ों से शुरू करें जिन्हें आप करना पसंद करते हैं - जैसे कि आपकी रुचियाँ!</p>
		</div>
	
		<SelectionDropdown {language} />
	
		<FilterCareers {language} />
	</section>
	
	<style>
	
	</style>
	