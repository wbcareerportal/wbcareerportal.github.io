<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import Riasec from '$lib/filter/RIASEC.svelte';
  import {studentGender, studentClass } from "../../../stores";

  onMount(() => {
    console.log($studentGender, $studentClass);
    window.goatcounter.count({
        path:  '/riasec/test-' + {$studentGender} + '-' + {$studentClass},
        title: {$studentGender} + '-' + {$studentClass},
        event: true,
    })

    fetch('http://wbcareerportal.goatcounter.com/api/v0/count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 7yj4tgzqh3z3dtvpjfq9rifs2ndcjmxugu64b994b2wy002l'
      },
      body: JSON.stringify({
        'no_sessions': true,
        'hits': [
          {
            'path': '/riasec/test-' + {$studentGender} + '-' + {$studentClass},
          },
        ]
      })
    });
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