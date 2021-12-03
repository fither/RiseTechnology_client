<template>
  <div class="home">
    <div class="row job-add mt-4">
      <h4>
        Create New Job
      </h4>
      <div class="col col-12 col-md-8">
        <div class="form-group">
          <label for="form-name">
            Job Name
          </label>
          <input 
            type="text" 
            class="form-control"
            id="form-name"
            v-model="newJob.name"
          >
        </div>
      </div>
      <div class="col col-12 col-md-2">
        <div class="form-group">
          <label for="form-priority">
            Job Priority
          </label>
          <select
            class="form-control"
            v-model="newJob.priority"
          >
            <option
              v-for="(priority, index) in priorityOptions"
              :key="index"
              :value="priority.value"
            >
              {{ priority.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="col col-12 col-md-2">
        <a
          class="btn btn-primary create-button mt-2"
          @click="createNewJob()"
        >
          <i class="fas fa-plus"></i>
          Create
        </a>
      </div>
    </div>
    <div class="row job-list mt-4">
      <h4>
        Job List
      </h4>
      <div class="col">
        <div class="job-table">
          <div class="row table-search">
            <div class="col col-12 col-md-8">
              <input 
                type="text"
                class="form-control"
                placeholder="Job Name"
                v-model="query"
                @keyup="search()"
              >
            </div>
            <div class="col col-12 col-md-4">
              <select
                class="form-control"
                v-model="sorting"
              >
                <option
                  v-for="(sort, index) in sortingOptions"
                  :key="index"
                  :value="sort.value"
                >
                  {{ sort.text }}
                </option>
              </select>
            </div>
          </div>
          <div class="row d-none d-md-flex table-head">
            <div class="row">
              <div class="col col-8">
                Name
              </div>
              <div class="col col-2">
                Priority
              </div>
              <div class="col col-2 text-center">
                Action
              </div>
            </div>
          </div>
          <div class="table-body">
            <div 
              class="row"
              v-for="(job, index) in jobs"
              :key="index"
            >
              <div class="col col-12 col-md-8">
                <div class="mobile-title d-flex d-md-none">
                  Job Name
                </div>
                <div class="d-grid">
                  <span class="text-truncate">
                    {{ job.name }}
                  </span>
                </div>
              </div>
              <div class="col col-12 col-md-2">
                <div class="mobile-title d-flex d-md-none">
                  Job Priority
                </div>
                <span :class="`job-priority job-p-${job.priority}`">
                  {{ getNameByPriorityId(job.priority) }}
                </span>
              </div>
              <div 
                class="col col-12 col-md-2"
                style="white-space: nowrap;"
              >
                <a
                  class="btn bg-gray"
                  @click="edit(job)"
                >
                  <i class="far fa-edit"></i>
                </a>
                <a
                  @click="remove(job)"
                  class="btn bg-gray ml-1"
                >
                  <i class="fas fa-trash"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <QuestionModal 
      :isModalOpen="isQuestionModalOpen"
      :job="removeJob"
      @close="closeModals()"
    />
    <EditModal
      :isModalOpen="isEditModalOpen"
      :job="editJob"
      :options="priorityOptions"
      @close="closeModals()"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Job, IOption } from '@/store';
import QuestionModal from '@/components/DeleteModal.vue';
import EditModal from '@/components/EditModal.vue';

@Component({
  components: {
    QuestionModal,
    EditModal
  },
})
export default class JobList extends Vue {
  jobs: Job[] = [];
  editJob: Job = new Job();
  removeJob: Job = new Job();
  newJob: Job = new Job();
  formResults: string[] = [];
  isQuestionModalOpen = false;
  isEditModalOpen = false;
  sorting = 0;

  query = "";


  getNameByPriorityId(id: number): string {
    return this.$store.state.priorityOptions.find((p: IOption) => p.value === id).text;
  }

  async closeModals(): Promise<void> {
    this.isQuestionModalOpen = false;
    this.isEditModalOpen = false;
    await this.getJobs();
  }

  edit(job: Job): void {
    this.editJob = job;
    this.isEditModalOpen = true;
  }

  remove(job: Job): void {
    this.removeJob = job;
    this.isQuestionModalOpen = true;
  }

  async getJobs(): Promise<void> {
    await this.$store.dispatch('getJobs');
    this.jobs = this.allJobs;

    this.sortJobs();
  }

  search(): void {
    if(this.query.trim() !== '') {
      let filteredJobs: Job[] = [];
      this.allJobs.map((j: Job) => {
        if(j.name.search(this.query) !== -1) {
          filteredJobs.push(j);
        }
      });
      this.jobs = filteredJobs;
    } else {
      this.jobs = this.allJobs;
    }
  }

  get allJobs(): Job[] {
    return this.$store.state.jobs;
  }

  async created(): Promise<void> {
    await this.getJobs();
  }

  createNewJob(): void {
    this.checkForm();

    if(this.formResults.length) return;

    this.$store.dispatch('create', this.newJob);
    this.formResults.push('Ekleme Başarılı');
    this.sortJobs();
  }

  checkForm(): void {
    this.formResults = [];
    this.newJob.name = this.newJob.name.trim();
    const name = this.newJob.name;
    
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

  get sortingOptions(): IOption[] {
    return [
      {
        text: 'Desc',
        value: 0
      }, {
        text: 'Asc',
        value: 1
      }
    ]
  }

  sortJobs(): void {
    this.jobs.sort((a: Job,b: Job) => {
      return this.sorting === 1 ? a.priority - b.priority : b.priority - a.priority;
    });
  }

  @Watch('sorting')
  onSortingChange(): void {
    this.sortJobs();
  }
}
</script>

<style>
  .form-group,
  h4 {
    text-align: left;
  }

  body {
    display: flex;
    margin: 0;
    padding: 0;
  }

  .row {
    padding: .5rem 0;
  }

  .row.job-add {
    align-items: flex-end;
  }

  .btn.create-button {
    display: inline-flex;
    align-items: center;
  }

  .btn.create-button i {
    margin-right: 0.5rem;
    font-size: 1.5rem;
    line-height: 1rem;
  }

  .table-search {
    background-color: #f1f4ff;
  }

  .table-head {
    background-color: #e4eafd;
  }

  .table-head .row {
    padding: .5rem;
    font-weight: 600;
  }

  .table-body .row {
    padding: 0.25rem;
  }

  .table-body .row:nth-child(2n) {
    background-color: #f9f9f9;
  }

  .table-body .btn {
    border-radius: 5px;
    color: #969593 !important;
  }

  .table-body .btn:nth-child(2) {
    margin-left: 1rem;
  } 

  .table-head .col {
    text-align: left;
  }

  .table-body .col {
    justify-content: space-between;
    display: flex;
    margin: 0.5rem 0;
  }

  .mobile-title {
    font-weight: 700;
  }

  .home {
    padding-top: 1rem;
  }

  .job-priority {
    padding: 0.2rem 1rem;
    border-radius: 5px;
  }

  .job-priority.job-p-0 {
    background-color: #f1a824 !important;
    color: #FFF !important;
  }

  .job-priority.job-p-1 {
    background-color: #2277e0 !important;
    color: #FFF !important;
  }
  
  .job-priority.job-p-2 {
    background-color: #e83d6d !important;
    color: #FFF !important;
  }

  .row {
    justify-content: center;
    align-items: center;
  }

</style>