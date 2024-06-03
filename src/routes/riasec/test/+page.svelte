<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import Riasec from '$lib/filter/RIASEC.svelte';
  import {studentGender, studentClass } from "../../../stores";

  onMount(() => {
    console.log(studentGender, studentClass);
    window.goatcounter.count({
        path:  'riasec-test',
        title: {studentGender} + '-' + {studentClass},
        event: true,
    })
  });
</script>

<svelte:head>
  <title>RIASEC - Career Guidance Portal</title>
  <meta name="description" content="Filter your career choices based on your interests!" />
</svelte:head>

<section class="">
  <div class="col mt-5">
    <h1>{$_('riasec_page_title')}</h1>
  </div>

  <section id="riasec">
    <Riasec />
  </section>
</section>

<style>
</style>