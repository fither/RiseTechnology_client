<template>
  <div
    :class="[
      'question-modal ',  
      isModalOpen && 'show'
    ]"
  >
    <div 
      class="modal-background"
      @click="closeModal()"
    ></div>
    <div class="card">
      <div class="card-body">
        <div class="card-title">
          <h4>Job Edit</h4>
        </div>
        <div class="card-content">
          <div class="form-group mb-2">
            <label for="form-name">Job Name</label>
            <input 
              type="text"
              class="form-control"
              id="form-name"
              v-model="job.name"
              disabled
            >
          </div>
          <div class="form-group mb-2">
            <label for="form-priority">Job Priority</label>
            <select
              class="form-control"
              id="form-priority"
              v-model="job.priority"
            >
              <option
                v-for="(option, index) in options"
                :key="index"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>
        <div class="card-action">
          <a
            class="btn bg-gray"
            @click="closeModal()"
          >
            Cancel
          </a>
          <a
            class="btn bg-pink"
            @click="submit()"
          >
            Save
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { IOption, Job } from '@/store';
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component({})
  export default class EditModal extends Vue {
    @Prop({ required: true }) isModalOpen!: boolean;
    @Prop({ required: true }) job!: Job;
    @Prop({ required: true }) options!: IOption;

    async submit(): Promise<void> {
      await this.$store.dispatch('update', this.job);
      this.closeModal();
    }

    closeModal(): void {
      this.$emit('close');
    }
  }
</script>