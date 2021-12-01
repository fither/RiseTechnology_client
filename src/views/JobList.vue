<template>
  <div class="home">
    <b-row class="g-0">
      <b-col cols="6" class="offset-3">
        <table class="table">
          <thead>
            <tr>
              <th>Ad</th>
              <th>Öncelik</th>
              <th>Aksiyon</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(job, index) in jobs"
              :key="index"
            >
              <td 
                class="text-truncate"
                style="max-width: 0;"
              >
                {{ job.name }}
              </td>
              <td v-if="editJob === job">
                <b-form-select
                  id="job-priority"
                  v-model="job.priority"
                  :options="priorityOptions"
                  class="form-control"
                ></b-form-select>
              </td>
              <td v-else>
                {{ getNameByPriorityId(job.priority) }}
              </td>
              <td v-if="editJob === job">
                <b-button
                  pill 
                  variant="primary"
                  @click="submitEdit()"
                >
                  Kaydet
                </b-button>
                <b-button
                  pill 
                  variant="danger"
                  style="margin-left: .5rem"
                  @click="cancelEdit()"
                >
                  İptal
                </b-button>
              </td>
              <td v-else>
                <b-button 
                  pill 
                  variant="primary"
                  @click="edit(job)"
                >
                  Düzenle
                </b-button>
                <b-button 
                  pill 
                  variant="danger"
                  style="margin-left: .5rem"
                  @click="remove(job)"
                >
                  Sil
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <questionModal 
      :isModalOpen="isModalOpen"
      @ok="handleOk"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Job, IOption } from '@/store';
import questionModal from '@/components/questionModal.vue';

@Component({
  components: {
    questionModal
  },
})
export default class JobList extends Vue {
  jobs: Job[] = [];
  editJob: Job = new Job();
  removeJob: Job = new Job();
  isModalOpen = false;

  async handleOk(): Promise<void> {
    await this.$store.dispatch('delete', this.removeJob);
    await this.getJobs();
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  getNameByPriorityId(id: number): string {
    return this.$store.state.priorityOptions.find((p: IOption) => p.value === id).text;
  }

  edit(job: Job): void {
    this.editJob = job;
  }

  remove(job: Job): void {
    this.removeJob = job;
    this.isModalOpen = true;
  }

  async submitEdit(): Promise<void> {
    await this.$store.dispatch('update', this.editJob);
    this.editJob = new Job();
  }

  async cancelEdit(): Promise<void> {
    this.editJob = new Job();
    await this.getJobs();
  }

  async getJobs(): Promise<void> {
    await this.$store.dispatch('getJobs');
    this.jobs = this.$store.state.jobs;
  }

  async created(): Promise<void> {
    await this.getJobs();
  }

  get priorityOptions(): IOption[] {
    return this.$store.state.priorityOptions;
  }

}
</script>

<style>
  table tr td:nth-last-child(1) {
    width: 20vw;
  }
</style>