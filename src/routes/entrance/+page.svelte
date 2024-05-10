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
    <h3>{$_("entrance_exams_heading")}</h3>
    <p>{$_("entrance_exams_subheading")}</p>
    <div class="accordion accordion-flush border" id="domainAccordion">
      {#each Object.keys($domains) as domain, i}
        {#if Object.keys($domains[domain]).indexOf("entrance_exams") > -1}
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed fs-3" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${domain.split(" ").join("-")}`} aria-expanded="false" aria-controls={`#flush-collapse-${domain.split(" ").join("-")}`}>
                <img src={"/" + $domains[domain].image} class="card-img-top p-3" alt={$domains[domain]} />
                  {domain}
              </button>
            </h2>
            <div id={`flush-collapse-${domain.split(" ").join("-")}`} class="accordion-collapse collapse">
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