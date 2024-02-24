<script>
import FilterCareers from "$lib/filter/FilterCareers.svelte";
import { _ } from 'svelte-i18n';
</script>

<svelte:head>
	<title>Career Interest Filter - Career Guidance Portal</title>
	<meta name="description" content="Filter your career choices based on your interests!" />
</svelte:head>

<section class="">
	<div class="col mt-5">
		<h1>{$_('homepage_title')}</h1>
	</div>

	<section id="filter">
		<FilterCareers />
	</section>
</section>

<style>

</style>
