<template>
  <div class="job-add">
    <b-form class="col-4 offset-4">
      <b-form-group>
        <label for="job-name">İş Adı</label>
        <b-form-input 
          id="job-name"
          v-model="job.name"
          :state="job.name.length <= 255 && job.name.length > 0"
        ></b-form-input>
      </b-form-group>
      <b-form-group class="mt-3">
        <label for="job-priority">İş Önceliği</label>
        <b-form-select
          id="job-priority"
          v-model="job.priority"
          :options="priorityOptions"
          class="form-control"
        ></b-form-select>
        <div 
          v-if="formResults.length"
          class="form-result"
        >
          <p
            v-for="(result, index) in formResults"
            :key="index"
          >
            {{ result }}
          </p>
        </div>
      </b-form-group>
      <b-form-group class="mt-3">
        <b-button
          @click="addJob()"
        >
          Ekle
        </b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script lang="ts">
  import { IOption, Job } from '@/store';
  import { Component, Vue } from 'vue-property-decorator';

  @Component({})
  export default class JobAdd extends Vue {
    job: Job = new Job();
    formResults: string[] = [];

    addJob(): void {
      this.checkForm();

      if(this.formResults.length) return;

      this.$store.dispatch('create', this.job);
      this.formResults.push('Ekleme Başarılı');
    }

    checkForm(): void {
      this.formResults = [];
      this.job.name = this.job.name.trim();
      const name = this.job.name;
      
      const regexAlphanumeric = /^[a-zA-Z0-9\sğüşöçİĞÜŞÖÇ]*$/;
      const regexMaxCharacter = /^[\wğüşöçİĞÜŞÖÇ]{0,255}$/;

      if(name.match(regexMaxCharacter) === null) {
        this.formResults.push('İsim 255 karakterden fazla olamaz.');
      }

      if(name.match(regexAlphanumeric) === null) {
        this.formResults.push('İsim yalnızca alphanumeric karakterlerden oluşabilir.');
      }

      if(name === '') {
        this.formResults.push('İsim boş olamaz.');
      }
    }

    get priorityOptions(): IOption[] {
      return this.$store.state.priorityOptions;
    }
  }
</script>

<style>
  .form-result {
    margin-top: .5rem;
  }

  p {
    margin-bottom: 0;
  }
</style>