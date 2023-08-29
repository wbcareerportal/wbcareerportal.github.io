<script>
  export let language = "en";
  import { onMount } from "svelte";
  import { occupationGroupDescriptions, groupCodeMap, selectedGroups, codeDictEn, codeDictHi, selectionChanged } from "../../stores";
  if ($selectedGroups !== "empty" && $selectedGroups !== undefined && $selectedGroups.length === 5) {
    $selectedGroups = $selectedGroups.split(",");
  }

  let codeDict = $codeDictEn
  if (language === "hi") codeDict = $codeDictHi;

  let domainName = "https://careerguidance.unilearn.org.in"
  let showResults = false;
  let relevantCareerCodesOne = [];
  let relevantCareerCodesTwo = [];
  let relevantCareerCodesThree = [];
  
  function populateCareersTable() {
    showResults = true;
    for (let i = 0; i < $selectedGroups.length; i++) {
      let groupCode = $selectedGroups[i];
      let groupCareersKeys = Object.keys($groupCodeMap[groupCode]["Careers"]);
      for (let j = 0; j < groupCareersKeys.length; j++) {
        let code = groupCareersKeys[j];
        if (i === 0) {
          if (relevantCareerCodesOne.indexOf(code) === -1) {
            relevantCareerCodesOne.push(code);
          }
        } else if (i === 1) {
          if (relevantCareerCodesTwo.indexOf(code) === -1) {
            relevantCareerCodesTwo.push(code);
          }
        } else if (i === 2) {
          if (relevantCareerCodesThree.indexOf(code) === -1) {
            relevantCareerCodesThree.push(code);
          }
        }
      }
    }
  }

  $: if ($selectionChanged) {
    console.log("iran");
    showResults = false;
    populateCareersTable();
    $selectionChanged = false;
  }

  onMount(() => {
  });

</script>

<div class="col-12 col-md-6 mx-auto text-center my-4">
  <button class="btn btn-success" on:click={() => populateCareersTable()}>
    {#if language === "hi"}
      पसंदीदा करियर ढूंढें!
    {:else}
      Find interesting careers!
    {/if}
  </button>
</div>

{#if showResults && $selectionChanged === false}
<div class={showResults ? "" : "d-none"}>
  <div class="pt-4">
    {#if language === "hi"}
      <h3>बहुत खूब!</h3>
      
      <h4>आप की रुचि <mark>{$occupationGroupDescriptions[$selectedGroups[0]]["Hindi Group"]}</mark>, <mark>{$occupationGroupDescriptions[$selectedGroups[1]]["Hindi Group"]}</mark> और <mark>{$occupationGroupDescriptions[$selectedGroups[2]]["Hindi Group"]}</mark> से जुड़े करियर से है।</h4>

      <h6 class="my-4">नीचे आप की रुचि से जुड़े कुछ करियर दिये गये हैं:</h6>
    {:else}
      <h4>Great job!</h4>
      
      <h4>You are interested in careers in <mark>{$occupationGroupDescriptions[$selectedGroups[0]]["Occupational Group"]}</mark>, <mark>{$occupationGroupDescriptions[$selectedGroups[1]]["Occupational Group"]}</mark>, and <mark>{$occupationGroupDescriptions[$selectedGroups[2]]["Occupational Group"]}</mark>.</h4>

      <h6 class="my-4">Here are a few careers relevant to your interests:</h6>
    {/if}
  </div>

  <table id="careers-table" class="table table-sm table-bordered table-striped">
    <thead>
      <tr>
        {#if language === "hi"}
          <th role="columnheader">वर्ग</th>
          <th role="columnheader">करियर</th>
        {:else}
          <th role="columnheader">Category</th>
          <th role="columnheader">Career</th>
        {/if}
      </tr>
    </thead>
    <tbody>
        {#each relevantCareerCodesOne as code}
          <tr>
            <td>
              {#if language === "hi"}
                {$occupationGroupDescriptions[$selectedGroups[0]]["Hindi Group"]}
              {:else}
                {$groupCodeMap[$selectedGroups[0]]["Occupational Group"]}
              {/if}
            </td>
            <td>
              {#if Object.keys(codeDict).indexOf(code) > -1}
              <a href={domainName + codeDict[code].Slug} target="_blank" rel="noreferrer noopener">
              {codeDict[code].Occupation}</a>
              {:else}
              {code}
              {/if}
            </td>
          </tr>
        {/each}
        {#each relevantCareerCodesTwo as code}
          <tr>
            <td>
              {#if language === "hi"}
                {$occupationGroupDescriptions[$selectedGroups[1]]["Hindi Group"]}
              {:else}
                {$groupCodeMap[$selectedGroups[1]]["Occupational Group"]}
              {/if}
            </td>
            <td>
              <a href={domainName + codeDict[code].Slug} target="_blank" rel="noreferrer noopener">
              {codeDict[code].Occupation}</a>
            </td>
          </tr>
        {/each}
        {#each relevantCareerCodesThree as code}
          <tr>
            <td>
              {#if language === "hi"}
                {$occupationGroupDescriptions[$selectedGroups[2]]["Hindi Group"]}
              {:else}
                {$groupCodeMap[$selectedGroups[2]]["Occupational Group"]}
              {/if}
            </td>
            <td>
              <a href={domainName + codeDict[code].Slug} target="_blank" rel="noreferrer noopener">
              {codeDict[code].Occupation}</a>
            </td>
          </tr>
        {/each}
    </tbody>
  </table>
</div>
{/if}