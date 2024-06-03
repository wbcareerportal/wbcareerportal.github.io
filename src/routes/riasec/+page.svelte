<script>
  import { _ } from 'svelte-i18n';
  import { studentName, studentGender, studentClass } from "../../stores.js";
</script>

<svelte:head>
  <title>RIASEC - Career Guidance Portal</title>
  <meta name="description" content="Filter your career choices based on your interests!" />
</svelte:head>

<section class="">
  <div class="col mt-5">
    <h1>{$_('riasec_page_title')}</h1>
  </div>

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
            <option value={$_("select_gender_boy")} data-goatcounter-referrer="gender-select" data-goatcounter-title="Boy">{ $_("select_gender_boy") }</option>
            <option value={$_("select_gender_girl")} data-goatcounter-referrer="gender-select" data-goatcounter-title="Girl">{ $_("select_gender_girl") }</option>
            <option value={$_("select_gender_trans")} data-goatcounter-referrer="gender-select" data-goatcounter-title="Transgender">{ $_("select_gender_trans") }</option>
            <option value={$_("select_gender_prefer_not")} data-goatcounter-referrer="gender-select" data-goatcounter-title="Prefer Not">{ $_("select_gender_prefer_not") }</option>
            <option value={$_("select_gender_other")} data-goatcounter-referrer="gender-select" data-goatcounter-title="Other">{ $_("select_gender_other") }</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="school-class" class="form-label"><strong>{$_("class")}</strong></label>
          <select id="school-class" class="form-select" aria-label="Select class" bind:value={$studentClass} required>
            <option value="VI" data-goatcounter-referrer="class-select" data-goatcounter-title="VI">VI</option>
            <option value="VII" data-goatcounter-referrer="class-select" data-goatcounter-title="VII">VII</option>
            <option value="VIII" data-goatcounter-referrer="class-select" data-goatcounter-title="VIII">VIII</option>
            <option value="IX" data-goatcounter-referrer="class-select" data-goatcounter-title="IX">IX</option>
            <option value="X" data-goatcounter-referrer="class-select" data-goatcounter-title="X">X</option>
            <option value="XI" data-goatcounter-referrer="class-select" data-goatcounter-title="XI">XI</option>
            <option value="XII" data-goatcounter-referrer="class-select" data-goatcounter-title="XII">XII</option>
          </select>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 mx-auto text-center my-4">
      <a
        role="button"
        href={"/riasec/test#"+$studentGender + "-" + $studentClass}
        data-goatcounter-referrer="start-test"
        data-goatcounter-title={$studentGender + "-" + $studentClass}
        class="btn btn-success no-underline"
        disabled={$studentName === "" || $studentGender === "" || $studentClass === ""}
      >
        {$_("riasec_continue_button_text")}
      </a>
    </div>
  </section>
</section>

<style>

</style>