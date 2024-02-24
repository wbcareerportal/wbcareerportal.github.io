<script>
  import { _, locale } from "svelte-i18n";
  import { domains, statements, explanation } from "../../stores.js";

  let totalStatements = 0;
  let riasecScores = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };
  let riasecResult = [];
  let suggestedDomains = [];

  let showResults = false;
  let showSelection = true;
  let showSpinner = false;
  let showAlert = false;

  const riasecStatements = Object.keys($statements);
  // Shuffle riasecStatements
  for (let i = riasecStatements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [riasecStatements[i], riasecStatements[j]] = [riasecStatements[j], riasecStatements[i]];
  }

  function takeToResults() {
    calculateRIASEC();
    showSpinner = true;
    setTimeout(() => {
      if (totalStatements < 10) {
        showAlert = true;
        showSpinner = false;
        return;
      } else {
        calculateDomains();
        showAlert = false;
        showResults = true;
        showSelection = false;
        showSpinner = false;
      }
    }, 750);

    setTimeout(() => {
      document.getElementById("riasec").scrollIntoView({ behavior: "smooth" });
    }, 250);
  }

  function takeToSelection() {
    clearChecks();
    showResults = false;
    showSelection = true;
  }

  // add the selected radio button to the $selectedStatements store
  function calculateRIASEC() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        totalStatements += 1;
        const code = checkbox.value;
        riasecScores[code] += 1;
      }
    });
    console.log(totalStatements);
    console.log(riasecScores);
    riasecResult = Object.keys(riasecScores).sort((a, b) => riasecScores[b] - riasecScores[a]);
    riasecResult = riasecResult.slice(0, 3);
    console.log(riasecResult);
  }

  function calculateDomains() {
    Object.keys($domains).forEach((domain) => {
      let codesContained = 0;
      $domains[domain].riasec.forEach((code) => {
        if (riasecResult.includes(code)) {
          codesContained += 1;
        }
      });
      if (codesContained >= 2) {
        if (!suggestedDomains.includes(domain)) {
          suggestedDomains.push(domain);
        }
      }
    });
    console.log(suggestedDomains);
  }

  function clearChecks() {
    totalStatements = 0;
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
</script>

{#if showSelection}
<section id="selection">
  <h4 class="fw-normal">{$_('riasec_page_description')}</h4>
  <h5 class="pt-3">{$_("riasec_selection_prompt")}</h5>

  {#each riasecStatements as statement, index}
    {#if index > 0 && index%10 === 0}
      <hr class="w-50 mx-auto">
    {/if}
    <div class="form-check">
      <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]}>
      <label class="form-check-label" for={index}>
        {#if $locale === "en"}
          {index+1}. {statement}
        {:else}
          {index+1}. {$statements[statement][$locale]}
        {/if}
      </label>
    </div>
  {/each}
  
  <div class="text-end">
    <button class="btn btn-link btn-sm" on:click={() => clearChecks()}>
      {$_("clear_selection_button_text")}
    </button>
  </div>
</section>

<div class="col-12 col-md-6 mx-auto text-center my-4">
  <button class="btn btn-success" on:click={() => takeToResults()}>
    {#if showSpinner}
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>    
    {:else}
      {$_("riasec_button_text")}
    {/if}
  </button>
  {#if showAlert}
    <p class="text-danger mt-3">{$_("selection_alert")}</p>
  {/if}
</div>

{/if}

{#if showResults}
<section class={showResults ? "" : "d-none"} id="results">
  <div class="pt-4">
    <h4>{$_("compliment")}</h4>

    <p>{$_("riasec_completion_statement")} –</p>
    <!-- <p>{$_("click_domains")}</p> -->
  </div>
  <div class="row row-cols-1 row-cols-md-3">
    {#each riasecResult as code}
      <div class="col">
        <div class="card my-2 bg-body-tertiary">
          <div class="d-flex justify-content-center">
            <img src={"/" + $explanation[code]["image"]} class="card-img-top p-3" alt={"Holland Code: " + $explanation[code]["full"]} />
          </div>
          <div class="card-body">
            <small class="card-title">
              <h5>{$explanation[code]["full_" + $locale]} {#if $locale !== "en"}({$explanation[code]["full_en"]}){/if}</h5>
              {#if $explanation[code]["explanation_" + $locale].length > 150}
                {$explanation[code]["explanation_" + $locale].slice(0, 150) + "..."}
                <br/>
                <a href={"/riasec-explanation#" + code} target="_blank">{$_("read_more")}</a>
              {:else}
                {$explanation[code]["explanation_" + $locale]}
              {/if}
            </small>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="text-end my-4">
    <button class="btn btn-primary" on:click={() => takeToSelection()}>
      {$_("clear_selection_button_text")}
    </button>
  </div>

  <div class="mt-4">
    <h4>{$_("suitable_domains")}</h4>
    <p>{$_("click_domains")}</p>
  </div>

  <div class="row row-cols-1 row-cols-md-3">
    {#each suggestedDomains as domain}
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

  <div class="mt-5">
    <h5>{$_("note")}</h5>
    <p class="small">{$_("note_text")}</p>
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