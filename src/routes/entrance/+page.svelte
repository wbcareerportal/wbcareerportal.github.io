<script>
  import { _, locale } from 'svelte-i18n';
  import { domains } from '../../stores';
  import { onMount } from 'svelte';
</script>

<svelte:head>
  <title>Entrance Exams</title>
  <meta name="description" content="View upcoming Entrance Exams" />
</svelte:head>

<section class="">
  <div class="col my-5">
    <h3>Upcoming Entrance Exams</h3>
    <p>Click on a domain below to see links to upcoming Entrance Exams related to that domain.</p>
    <div class="accordion accordion-flush border" id="domainAccordion">
      {#each Object.keys($domains) as domain, i}
        {#if Object.keys($domains[domain]).indexOf("entrance_exams") > -1}
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fs-3" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${domain}`} aria-expanded="false" aria-controls={`#flush-collapse-${domain}`}>
                <img src={"/" + $domains[domain].image} class="card-img-top p-3" alt={$domains[domain]} />
                  {domain}
              </button>
            </h2>
            <div id={`flush-collapse-${domain}`} class="accordion-collapse collapse">
              <div class="accordion-body">
                <ul>
                  {#each $domains[domain].entrance_exams as exam, i}
                    <li><a href={exam.link}>{exam.title}</a></li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</section>

<style>
  .card-img-top {
    width: 100px;
    object-fit: cover;
  }
</style>