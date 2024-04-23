<script>
  import { _, locale } from "svelte-i18n";
  import { domains, statements, explanation, likes, selectedDomains, selectedStatements, riasecScores, totalStatements, studentName, studentGender, studentClass } from "../../stores.js";
  import RiasecChart from "./RIASECChart.svelte";

  $riasecScores = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };
  let riasecResult = [];
  let suggestedDomains = [];

  let showPersonalDetailsFields = true;
  let showResults = false;
  let showSelection = false;
  let showSpinner = false;
  let showAlert = false;
  let carouselPage = 1;

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
      if ($totalStatements < 20) {
        showAlert = true;
        showSpinner = false;
        return;
      } else {
        calculateDomains();
        showAlert = false;
        showResults = true;
        showSelection = false;
        showSpinner = false;
        console.log("selected:", $selectedStatements);
      }
    }, 750);

    setTimeout(() => {
      if ($totalStatements >= 20) {
        document.getElementById("riasec").scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  }

  function takeToPersonalDetails() {
    showPersonalDetailsFields = true;
    showResults = false;
    showSelection = false;
  }

  function takeToSelection() {
    clearChecks();
    showPersonalDetailsFields = false;
    showResults = false;
    showSelection = true;
  }

  function update$totalStatementsCount() {
    $totalStatements = 0;
    $selectedStatements = [];
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        $totalStatements += 1;
        let label = checkbox.nextElementSibling.innerHTML;
        $selectedStatements.push(label.split(". ")[1]);
      }
    });
  }

  // add the selected radio button to the $selectedStatements store
  function calculateRIASEC() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        // $totalStatements += 1;
        const code = checkbox.value;
        $riasecScores[code] += 1;
      }
    });
    console.log($totalStatements);
    console.log($riasecScores);
    riasecResult = Object.keys($riasecScores).sort((a, b) => $riasecScores[b] - $riasecScores[a]);
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
    $totalStatements = 0;
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  function checkWhichCarouselPageIsShown(add=true) {
    const carouselItems = document.querySelectorAll(".carousel-item");
    carouselItems.forEach((item) => {
      if (item.classList.contains("active")) {
        let carouselPageClass = item.classList[1];
        if (carouselPageClass.indexOf("carousel-page-") > -1) {
          if (add) carouselPage = parseInt(carouselPageClass.split("-")[2]) + 1;
          else carouselPage = parseInt(carouselPageClass.split("-")[2]) - 1;
        }
      }
    });
    console.log("carouselPage:", carouselPage);
  }

  const today = new Date();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const todaysDate = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
</script>

{#if showPersonalDetailsFields}
<!-- Enter your name, select your gender and class -->
<section id="personal-details">
  <h4 class="fw-normal">{$_('riasec_page_description')}</h4>
  <hr/>
  <h5 class="pt-3">{$_("personal_details_prompt")}</h5>
  <div class="col box-min-height border p-3 d-flex justify-content-center align-items-center">
    <div class="col-12 col-md-6 mx-auto">
      <div class="mb-3">
        <label for="name" class="form-label"><strong>{$_("name")}</strong></label>
        <input type="text" class="form-control" id="name" placeholder={$_("name_placeholder")} required bind:value={$studentName}>
      </div>
      <div class="mb-3">
        <label for="gender" class="form-label"><strong>{$_("gender")}</strong></label>
        <select id="gender" class="form-select" aria-label="Select gender" bind:value={$studentGender} required>
          <option value="Boy">{ $_("select_gender_boy") }</option>
          <option value="Girl">{ $_("select_gender_girl") }</option>
          <option value="Transgender">{ $_("select_gender_trans") }</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="school-class" class="form-label"><strong>{$_("class")}</strong></label>
        <select id="school-class" class="form-select" aria-label="Select class" bind:value={$studentClass} required>
          <option value="VI">VI</option>
          <option value="VII">VII</option>
          <option value="VIII">VIII</option>
          <option value="IX">IX</option>
          <option value="X">X</option>
          <option value="XI">XI</option>
          <option value="XII">XII</option>
        </select>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-6 mx-auto text-center my-4">
    <button 
      class="btn btn-success"
      on:click={() => takeToSelection()}
      disabled={$studentName === "" || $studentGender === "" || $studentClass === ""}
    >
      {$_("riasec_continue_button_text")}
    </button>
  </div>
</section>
{/if}

{#if showSelection}
<section id="selection">
  <h4 class="fw-normal text-">{$_('riasec_page_description')}</h4>
  <hr/>
  <h5 class="pt-3">Hello, {$studentName.split(" ")[0]}!<br/><br/>{$_("riasec_selection_prompt")}</h5>

  <div id="carouselExample" class="carousel carousel-dark slide box-min-height border p-3 d-flex justify-content-center">
    <div class="carousel-inner">
      <div class="carousel-item carousel-page-1 active">
        {#each riasecStatements as statement, index}
          {#if index < 10}
            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]} on:click={() => update$totalStatementsCount()}>
              <label class="form-check-label" for={index}>
                {#if $locale === "en"}
                  {index+1}. {statement}
                {:else}
                  {index+1}. {$statements[statement][$locale]}
                {/if}
              </label>
            </div>
          {/if}
        {/each}
      </div>
      <div class="carousel-item carousel-page-2">
        {#each riasecStatements as statement, index}
          {#if index >= 10 && index < 20}
            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]}  on:click={() => update$totalStatementsCount()}>
              <label class="form-check-label" for={index}>
                {#if $locale === "en"}
                  {index+1}. {statement}
                {:else}
                  {index+1}. {$statements[statement][$locale]}
                {/if}
              </label>
            </div>
          {/if}
        {/each}
      </div>
      <div class="carousel-item carousel-page-3">
        {#each riasecStatements as statement, index}
          {#if index >= 20 && index < 30}
            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]}  on:click={() => update$totalStatementsCount()}>
              <label class="form-check-label" for={index}>
                {#if $locale === "en"}
                  {index+1}. {statement}
                {:else}
                  {index+1}. {$statements[statement][$locale]}
                {/if}
              </label>
            </div>
          {/if}
        {/each}
      </div>
      <div class="carousel-item carousel-page-4">
        {#each riasecStatements as statement, index}
          {#if index >= 30 && index < 40}
            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]}  on:click={() => update$totalStatementsCount()}>
              <label class="form-check-label" for={index}>
                {#if $locale === "en"}
                  {index+1}. {statement}
                {:else}
                  {index+1}. {$statements[statement][$locale]}
                {/if}
              </label>
            </div>
          {/if}
        {/each}
      </div>
      <div class="carousel-item carousel-page-5">
        {#each riasecStatements as statement, index}
          {#if index >= 40 && index < 50}
            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]}  on:click={() => update$totalStatementsCount()}>
              <label class="form-check-label" for={index}>
                {#if $locale === "en"}
                  {index+1}. {statement}
                {:else}
                  {index+1}. {$statements[statement][$locale]}
                {/if}
              </label>
            </div>
          {/if}
        {/each}
      </div>
      <div class="carousel-item carousel-page-6">
        {#each riasecStatements as statement, index}
          {#if index >= 50 && index < 60}
            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]}  on:click={() => update$totalStatementsCount()}>
              <label class="form-check-label" for={index}>
                {#if $locale === "en"}
                  {index+1}. {statement}
                {:else}
                  {index+1}. {$statements[statement][$locale]}
                {/if}
              </label>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>

  <div class="row row-cols-2 my-4 text-center">
    <div class="col-6">
      <button type="button" class={`btn btn-dark ${carouselPage === 1 ? 'd-none' : ''}`} on:click={() => checkWhichCarouselPageIsShown(false)} data-bs-target="#carouselExample" data-bs-slide="prev">{$_("previous_button_text")}</button>
    </div>
    <div class="col-6">
      <button type="button" class={`btn btn-dark ${carouselPage === 6 ? 'd-none' : ''}`} on:click={() => checkWhichCarouselPageIsShown(true)} data-bs-target="#carouselExample" data-bs-slide="next">{$_("next_button_text")}</button>
    </div>
  </div>

  <!-- {#each riasecStatements as statement, index}
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
  {/each} -->
  
  <!-- <div class="text-end">
    <button class="btn btn-link btn-sm" on:click={() => clearChecks()}>
      {$_("clear_selection_button_text")}
    </button>
  </div> -->
</section>

<div 
  class={`col-12 col-md-6 mx-auto text-center my-4 ${$totalStatements >= 20 && carouselPage === 6  ? "" : "d-none"}`}
>
  <button 
    class="btn btn-success" 
    on:click={() => takeToResults()}
    disabled={$totalStatements < 20}
  >
    {#if showSpinner}
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>    
    {:else}
      {$_("riasec_button_text")}
    {/if}
  </button>
  {#if showAlert || $totalStatements < 20}
    <p class="text-danger mt-3">{$_("selection_alert")}</p>
  {/if}
</div>

{/if}

{#if showResults}
<section class={showResults ? "" : "d-none"} id="results">
  <!-- About RIASEC Brief -->
  <h3 class="fs-5">{$_("about_riasec_title")}</h3>
  <p>{$_("about_riasec_text_1")}</p>
  <p>{$_("about_riasec_text_2")}</p>

  <!-- Student's Information -->
  <div class="pt-4 col-sm-6 mx-auto">
    <h1 class="fs-4 text-center">{$studentName.split(" ")[0]}'s Personality Profile</h1>
    <h6>Name: {$studentName}</h6>
    <h6>Class: {$studentClass}</h6>
    <h6>Gender: {$studentGender}</h6>
    <h6>Date of Assessment: {todaysDate}</h6>
    <!-- <h4>{$_("compliment")}</h4> -->
    <!-- <p>{$_("click_domains")}</p> -->
  </div>

  <p>{$_("riasec_completion_statement")}:</p>
  <div class="row row-cols-1 row-cols-md-3 mb-5">
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

  <!-- Chart.js Chart -->
  <RiasecChart />

  <!-- Likes Table -->
  <div class="row row-cols-sm-2 row-cols-1">
    <div class="col">
      <div class="col p-1 border border-1 text-center">
        <h6>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up text-success" viewBox="0 0 16 16">
            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
          </svg>
          {$_("you_like")}
        </h6>
      </div>
      <div class="col p-2 border border-1">
        <ul class="likes-list">
          {#each riasecResult as item}
            {#each $likes[item][$locale] as like}
              <li>{like}</li>
            {/each}
          {/each}
        </ul>
      </div>
    </div>
    <div class="col">
      <div class="col p-1 border border-1 text-center">
        <h6>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down text-warning" viewBox="0 0 16 16">
            <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1"/>
          </svg>
          {$_("you_dont_like")}
        </h6>
      </div>
      <div class="col p-2 border border-1">
        <ul class="dislikes-list">
          {#each ["R","I","A","S","E","C"] as item}
            {#if riasecResult.indexOf(item) === -1}
              {#each $likes[item][$locale] as like}
                <li>{like}</li>
              {/each}
            {/if}
          {/each}
        </ul>
      </div>
    </div>
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

  <!-- Select Again Button -->
  <div class="text-center my-4">
    <button class="btn btn-primary" on:click={() => takeToPersonalDetails()}>
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

  .box-min-height {
    
    @media screen and (min-width: 512px) {
      min-height: 350px;
      height: 350px;
    }

    min-height: 420px;
    height: 420px;
  }

  .form-check-label:hover {
    cursor: pointer;
    text-decoration: underline;
    color: var(--bs-primary);
  }

  ul.likes-list,
  ul.dislikes-list {
    position: relative;
    list-style: none;
    margin-left: 0;
    padding-left: 1.2em;
  }
  ul.likes-list li:before {
    content: "+";
    position: absolute;
    left: 0;
  }
  ul.dislikes-list li:before {
    content: "-";
    position: absolute;
    left: 0;
  }
</style>