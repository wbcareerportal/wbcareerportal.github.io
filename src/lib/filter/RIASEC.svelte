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

  function updateTotalStatementsCount() {
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
          <option value={$_("select_gender_boy")}>{ $_("select_gender_boy") }</option>
          <option value={$_("select_gender_girl")}>{ $_("select_gender_girl") }</option>
          <option value={$_("select_gender_trans")}>{ $_("select_gender_trans") }</option>
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

  <div id="carouselExample" class="carousel carousel-dark slide box-min-height border p-3 d-flex flex-column justify-content-center" data-bs-touch="false">
    <div class="carousel-inner">
      <div class="carousel-item carousel-page-1 active">
        {#each riasecStatements as statement, index}
          {#if index < 10}
            <div class="form-check">
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]} on:click={() => updateTotalStatementsCount()}>
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
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]}  on:click={() => updateTotalStatementsCount()}>
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
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]}  on:click={() => updateTotalStatementsCount()}>
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
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]}  on:click={() => updateTotalStatementsCount()}>
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
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]}  on:click={() => updateTotalStatementsCount()}>
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
              <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={index} value={$statements[statement]["code"]}  on:click={() => updateTotalStatementsCount()}>
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
    <p class="text-secondary text-center mt-3">Page {carouselPage}/6</p>
    {#if showAlert || $totalStatements < 20}
      <p class="text-danger text-center">{$_("selection_alert")}</p>
    {/if}
  </div>

  <div class="row row-cols-2 my-4 text-center">
    <div class="col-6 d-flex justify-content-center">
      <button type="button" class={`btn btn-dark d-flex justify-content-center align-items-center ${carouselPage === 1 ? 'd-none' : ''}`} on:click={() => checkWhichCarouselPageIsShown(false)} data-bs-target="#carouselExample" data-bs-slide="prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
        </svg>
        {$_("previous_button_text")}
      </button>
    </div>
    <div class="col-6 d-flex justify-content-center">
      <button type="button" class={`btn btn-dark d-flex justify-content-center align-items-center ${carouselPage === 6 ? 'd-none' : ''}`} on:click={() => checkWhichCarouselPageIsShown(true)} data-bs-target="#carouselExample" data-bs-slide="next">
        {$_("next_button_text")}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
        </svg>
      </button>
    </div>
  </div>
</section>

<div class="col-12 col-md-6 mx-auto text-center my-4">
  <button 
    class={`btn btn-success ${$totalStatements >= 20 && carouselPage === 6  ? "" : "d-none"}`}
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
</div>

{/if}

{#if showResults}
<section class={showResults ? "" : "d-none"} id="results">
  <!-- About RIASEC Brief -->
  <h3 class="fs-5">{$_("about_riasec_title")}</h3>
  <p>{$_("about_riasec_text_1")}</p>
  <p>{$_("about_riasec_text_2")}</p>

  <hr/>

  <!-- Student's Information -->
  <div id="results-student-info" class="my-4 col-sm-6 mx-auto">
    <h1 class="fs-4 text-center">{$studentName.split(" ")[0]}{$_("apostrophe")} {$_("personality_profile")}</h1>
    <h6>{$_("name")}: {$studentName}</h6>
    <h6>{$_("class")}: {$studentClass}</h6>
    <h6>{$_("gender")}: {$studentGender}</h6>
    <h6>{$_("date_of_assessment")}: {todaysDate}</h6>
  </div>

  <div style="break-after:page"></div>

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
  <div id="results-likes-table" class="row row-cols-sm-2 row-cols-1">
    <div class="col">
      <div class="col p-2 border border-1 text-center">
        <h6 class="m-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up-fill text-success" viewBox="0 0 16 16">
            <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
          </svg>
          {$_("you_like")}
        </h6>
      </div>
      <div class="col p-2 border border-1">
        <ul class="likes-list mb-0">
          {#each riasecResult as item}
            {#each $likes[item][$locale] as like}
              <li>{like}</li>
            {/each}
          {/each}
        </ul>
      </div>
    </div>
    <div class="col">
      <div class="col p-2 border border-1 text-center">
        <h6 class="m-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down-fill text-warning" viewBox="0 0 16 16">
            <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"/>
          </svg>
          {$_("you_dont_like")}
        </h6>
      </div>
      <div class="col p-2 border border-1">
        <ul class="dislikes-list mb-0">
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

  <div style="break-after:page"></div>

  <!-- Download as PDF -->
  <div class="d-flex justify-content-center my-4 download-pdf">
    <button class="btn btn-primary d-flex align-items-center gap-1" onclick="window.print()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"/>
        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
      </svg>
      {$_("download_pdf")}
    </button>
  </div>

  <!-- Suitable Domains -->
  <div id="results-suitable-domains">
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
  </div>

  <div class="mt-5">
    <h5>{$_("note")}</h5>
    <p class="small">{$_("note_text")}</p>
  </div>

  <!-- Download as PDF -->
  <div class="d-flex justify-content-center my-4 download-pdf">
    <button class="btn btn-primary d-flex align-items-center gap-1" onclick="window.print()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"/>
        <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
      </svg>
      {$_("download_pdf")}
    </button>
  </div>

  <!-- Select Again Button -->
  <div id="select-again-button" class="text-center my-4">
    <button class="btn btn-warning" on:click={() => takeToPersonalDetails()}>
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
      min-height: 420px;
      height: 420px;
    }

    min-height: 475px;
    height: 475px;
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

  /* printing styles */
  @media print {
    @page {
      margin: 0.5in;
    }

    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid !important;
    }

    p, li, blockquote, figure, img {
      page-break-inside: avoid !important;
    }

    .download-pdf, #select-again-button {
      display: none !important;
    }
  }
</style>