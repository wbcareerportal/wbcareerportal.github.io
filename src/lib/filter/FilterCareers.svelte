<script>
  import { _, locale } from "svelte-i18n";
  import { domains, selectedDomains } from "../../stores.js";

  let showResults = false;
  let showSelection = true;
  let showSpinner = false;

  function takeToResults() {
    showSpinner = true;
    setTimeout(() => {
      showResults = true;
      showSelection = false;
      showSpinner = false;
    }, 750);

    setTimeout(() => {
      document.getElementById("filter").scrollIntoView({ behavior: "smooth" });
    }, 250);
  }

  function takeToSelection() {
    $selectedDomains = [];
    showResults = false;
    showSelection = true;
  }

  const domainList = Object.keys($domains);
  // Shuffle domainList
  for (let i = domainList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [domainList[i], domainList[j]] = [domainList[j], domainList[i]];
  }

  const dividers = [0, 7, 14, 21]

  // add the selected radio button to the $selectedDomains store
  function addSelectedDomain(event, index) {
    $selectedDomains[index] = event.target.id;
    console.log($selectedDomains);
  }
</script>

{#if showSelection}
<section id="selection">
  <h4 class="fw-normal">{$_('homepage_description')}</h4>
  <h5 class="pt-3">{$_("selection_prompt")}</h5>
  <div class="accordion accordion-flush border" id="domainAccordion">
    {#each dividers as divider, i}
      {#if i < 3}
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse" + i} aria-expanded="false" aria-controls="flush-collapseOne">
              {#if $selectedDomains[i] === undefined}
                {i+1}. {$_("description_preface")}...
              {:else}
                {i+1}. {$_("description_preface")} {$domains[$selectedDomains[i]][$locale + "_description"].toLowerCase()}
              {/if}
            </button>
          </h2>
          <div id={"flush-collapse" + i} class="accordion-collapse collapse" data-bs-parent="#domainAccordion">
            <div class="accordion-body">
              {#each domainList.slice(dividers[i], dividers[i+1]) as domain}
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" id={domain} on:change={(e) => addSelectedDomain(e,i)}>
                  <label class="form-check-label" for={domain}>
                    {$domains[domain][$locale + "_description"]}
                  </label>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
  <div class="text-end">
    <button class="btn btn-link btn-sm" on:click={() => $selectedDomains = []}>
      {$_("clear_selection_button_text")}
    </button>
  </div>
</section>

<div class="col-12 col-md-6 mx-auto text-center my-4">
  <button class="btn btn-success" on:click={() => takeToResults()} disabled={$selectedDomains.length !== 3 ? true : false}>
    {#if showSpinner}
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>    
    {:else}
      {$_("button_text")}
    {/if}
  </button>
</div>

{/if}

{#if showResults && $selectedDomains.length === 3}
<section class={showResults ? "" : "d-none"} id="results">
  <div class="pt-4">
    <h3>{$_("compliment")}</h3>

    <h5>
      {$_("selected_domains_preface")}:
      {#if $locale === "en"}
        <mark>{$selectedDomains[0]}</mark>, <mark>{$selectedDomains[1]}</mark>, {$_("and")} <mark>{$selectedDomains[2]}</mark>.
      {:else}
        <mark>{$domains[$selectedDomains[0]][$locale]}</mark>, <mark>{$domains[$selectedDomains[1]][$locale]}</mark>, {$_("and")} <mark>{$domains[$selectedDomains[2]][$locale]}</mark>।
      {/if}
    </h5>

    <p>{$_("click_domains")}</p>
  </div>

  <div class="row row-cols-1 row-cols-md-3">
    {#each $selectedDomains as domain}
      <div class="col">
        <a href={$domains[domain][$locale+"_link"]} target="_blank" rel="noopener noreferrer">
          <div class="card my-2 bg-body-tertiary">
            <div class="d-flex justify-content-center">
              <img src={"/" + $domains[domain].image} class="card-img-top p-3" alt={$domains[domain][$locale]} />
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">
                {#if $locale === "en"}
                  {domain}
                {:else}
                  {$domains[domain][$locale]}
                {/if}
              </h5>
            </div>
          </div>
        </a>
      </div>
    {/each}
  </div>

  <div class="text-center mt-5">
    <button class="btn btn-primary" on:click={() => takeToSelection()}>
      {$_("clear_selection_button_text")}
    </button>
  </div>
</section>
{/if}

<style>
  .card-img-top {
    width: 150px;
    object-fit: cover;
  }

  .card:hover {
    border: 1px solid var(--color-theme-1);
  }
</style>