<script>
import SelectionDropdown from "$lib/filter/SelectionDropdown.svelte";
import FilterCareers from "$lib/filter/FilterCareers.svelte";

let language = "en";
</script>

<svelte:head>
	<title>Filter - Career Pathways</title>
	<meta name="description" content="Filter your career choices based on your interests!" />
</svelte:head>

<section class="container">
	<div class="col my-5">
		<h4>500 Roads to Success</h4>
		<h1>Navigating life after school</h1>
		<p>Choosing a career can be quite confusing. It is a good idea to start with the things that you like to do - your interests!</p>
	</div>

	<SelectionDropdown {language} />

	<FilterCareers {language} />
</section>

<style>

</style>
