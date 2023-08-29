<script>
  export let language = "en";
  import { occupationGroupDescriptions, selectedGroups, selectionChanged } from "../../stores.js";
  let groups = Object.keys($occupationGroupDescriptions)
  console.log($selectedGroups);
  if ($selectedGroups === "empty") {
    if (language === "hi") {
      $selectedGroups = ["मेरा #1 विकल्प", "मेरा #2 विकल्प", "मेरा #3 विकल्प"];
    } else {
      $selectedGroups = ["My #1 selection", "My #2 selection", "My #3 selection"];
    }
  } else if (typeof($selectedGroups) !== "object") {
    $selectedGroups = $selectedGroups.split(",");
  }
  
  function setSelection(group, selectionNumber) {
    let tempSelection = [];
    if ($selectedGroups[selectionNumber - 1] === group) {
      $selectedGroups[selectionNumber - 1] = null;
      tempSelection = $selectedGroups.filter(function (el) {
        return el != null;
      });
    } else {
      $selectedGroups[selectionNumber - 1] = group;
      tempSelection = $selectedGroups;
    }
    $selectedGroups = tempSelection;
    console.log($selectedGroups);
    // collapse accordion
    let accordion = document.getElementById("accordionFlushExample");
    let accordionItems = accordion.getElementsByClassName("accordion-item");
    for (let i = 0; i < accordionItems.length; i++) {
      accordionItems[i].getElementsByClassName("accordion-button")[0].classList.add("collapsed");
      accordionItems[i].getElementsByClassName("accordion-collapse")[0].classList.remove("show");
    }
    // scroll accordion into view
    accordion.scrollIntoView();
    $selectionChanged = true;
  }
</script>

<div class="pt-5">
  {#if language === "hi"}
    <h3>अपने 3 सब से पसंदीदा विकल्प चुनें!</h3>
  {:else}
    <h3>Select 3 options that you find most interesting!</h3>
  {/if}

  <div class="accordion accordion-flush border" id="accordionFlushExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
          1. 
          {#if $occupationGroupDescriptions[$selectedGroups[0]] === undefined}
            {$selectedGroups[0]}
          {:else}
            {#if language === "hi"}
              {$occupationGroupDescriptions[$selectedGroups[0]]["Hindi Description"]}
            {:else}
              {$occupationGroupDescriptions[$selectedGroups[0]]["Description"]}
            {/if}
          {/if}
        </button>
      </h2>
      <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div class="row row-cols-1">
            {#each groups as group}
              {#if $selectedGroups.indexOf(group) === -1}
                <div class="d-grid gap-2 my-1">
                  <button class="btn btn-outline-primary btn-sm" on:click={() => setSelection(group, 1)}>
                    {#if language === "hi"}
                      {$occupationGroupDescriptions[group]["Hindi Description"]}
                    {:else}
                      {$occupationGroupDescriptions[group]["Description"]}
                    {/if}
                  </button>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
          2. 
          {#if $occupationGroupDescriptions[$selectedGroups[1]] === undefined}
            {$selectedGroups[1]}
          {:else}
          {#if language === "hi"}
            {$occupationGroupDescriptions[$selectedGroups[1]]["Hindi Description"]}
          {:else}
            {$occupationGroupDescriptions[$selectedGroups[1]]["Description"]}
          {/if}
          {/if}
        </button>
      </h2>
      <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div class="row row-cols-1">
            {#each groups as group}
              {#if $selectedGroups.indexOf(group) === -1}
                <div class="d-grid gap-2 my-1">
                  <button class="btn btn-outline-primary btn-sm" on:click={() => setSelection(group, 2)}>
                    {#if language === "hi"}
                      {$occupationGroupDescriptions[group]["Hindi Description"]}
                    {:else}
                      {$occupationGroupDescriptions[group]["Description"]}
                    {/if}
                  </button>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
          3. 
          {#if $occupationGroupDescriptions[$selectedGroups[2]] === undefined}
            {$selectedGroups[2]}
          {:else}
            {#if language === "hi"}
              {$occupationGroupDescriptions[$selectedGroups[2]]["Hindi Description"]}
            {:else}
              {$occupationGroupDescriptions[$selectedGroups[2]]["Description"]}
            {/if}
          {/if}
        </button>
      </h2>
      <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">
          <div class="row row-cols-1">
            {#each groups as group}
              {#if $selectedGroups.indexOf(group) === -1}
                <div class="d-grid gap-2 my-1">
                  <button class="btn btn-outline-primary btn-sm" on:click={() => setSelection(group, 3)}>
                    {#if language === "hi"}
                      {$occupationGroupDescriptions[group]["Hindi Description"]}
                    {:else}
                      {$occupationGroupDescriptions[group]["Description"]}
                    {/if}
                  </button>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>