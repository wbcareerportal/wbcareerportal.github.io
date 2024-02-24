<script>
  import { _, locale } from 'svelte-i18n';
  import { explanation } from "../../stores.js";
  import { onMount } from 'svelte';

  onMount(() => {
    // get the hash from the URL
    const hash = window.location.hash;
    // if the hash is not empty
    if (hash) {
      const id = "flush-collapse-" + hash.substring(1);
      // open the accordion
      console.log(id);
      const accordion = document.getElementById(id);
      accordion.classList.add("show");
      const accordionBtn = document.querySelector(`button[data-bs-target="#${id}"]`);
      accordionBtn.classList.remove("collapsed");
      accordionBtn.setAttribute("aria-expanded", "true");
      // scroll to the element
      if (accordionBtn) {
        accordionBtn.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
</script>

<svelte:head>
  <title>About RIASEC - Career Guidance Portal</title>
  <meta name="description" content="Filter your career choices based on your interests!" />
</svelte:head>

<section class="">
  <div class="col my-5">
    <h3>{$_("about_riasec_title")}</h3>
    <p>{$_("about_riasec_text_1")}</p>
    <p>{$_("about_riasec_text_2")}</p>
    <p>{$_("about_riasec_text_3")}</p>
    <div class="accordion accordion-flush border" id="domainAccordion">
      {#each Object.keys($explanation) as code, i}
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse-" + code} aria-expanded="false" aria-controls="flush-collapseOne">
              {code}: {$explanation[code]["full_" + $locale]} {#if $locale !== "en"}({$explanation[code]["full_en"]}){/if}
            </button>
          </h2>
          <div id={"flush-collapse-" + code} class="accordion-collapse collapse">
            <div class="accordion-body">
              {$explanation[code]["explanation_" + $locale]}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- <p>The table below thus gives an idea about the values, traits and skills for Holland's Six Personality types:</p> -->

  <!-- <div class="col overflow-x-scroll">
    <table class="table table-bordered table-sm">
      <thead>
        <tr>
          <th></th>
          <th>Values</th>
          <th>Traits</th>
          <th>Skills</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>Realistic</td>
        <td>Practicality, common sense, honesty, material rewards for tangible accomplishment</td>
        <td>Practical, honest, conservative, persistent</td>
        <td>Manual and mechanical skills</td>
        </tr>
        <tr>
        <td>Investigative</td>
        <td>Independence,
        curiosity, development or acquisition of knowledge, learning, achievement</td>
        <td>Analytical, intelligent, introverted, sceptical, academic bent of mind</td>
        <td>Scientific skills, better academic skills</td>
        </tr>
        <tr>
        <td>Artistic</td>
        <td>Originality, independence, expression of creative ideas, emotion, imagination, self-expression</td>
        <td>Open to experience, innovative, intellectual, disorderly, unconventional</td>
        <td>Creative skills</td>
        </tr>
        <tr>
        <td>Social</td>
        <td>Cooperation,generosity, service to or welfare of others, understanding, social service</td>
        <td>Empathetic, patient, helpful</td>
        <td>Social skills, interpersonal skills</td>
        </tr>
        <tr>
        <td>Enterprising</td>
        <td>Risk-taking, Status oriented, financial and social success, responsibility, material accomplishment</td>
        <td>Confident, Sociable, Energetic, extroverted, leadership qualities, persuasive</td>
        <td>Skills in sales and persuasion</td>
        </tr>
        <tr>
        <td>Conventional</td>
        <td>Stability, efficiency, accuracy, making money, power in business or social affairs</td>
        <td>Organized, Careful, rule-oriented</td>
        <td>Clerical skills, technical skills in business or product, skills in meeting targets</td>
        </tr>
      </tbody>
    </table>
  </div> -->

</section>

<style>
  h5 {
    font-weight: normal;
  }
</style>