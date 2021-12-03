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
          <i class="fas fa-exclamation"></i>
        </div>
        <div class="card-content">
          <h5>
            Are you sure you want to delete it?
          </h5>
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
            Approve
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Job } from '@/store';
import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({})
  export default class QuestionModal extends Vue {
    @Prop({ required: true }) isModalOpen!: boolean;
    @Prop({ required: true }) job!: Job;

    async submit(): Promise<void> {
      await this.$store.dispatch('delete', this.job);
      this.closeModal();
    }

    closeModal(): void {
      this.$emit('close');
    }
  }
</script>

<style>
  .question-modal {
    position: fixed;
    top: 0;
    left: 0;
    display: none;
    opacity: 0;
    z-index: -1;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .question-modal.show {
    display: flex;
    opacity: 1;
    z-index: 1;
  }

  .question-modal .modal-background {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .question-modal .card {
    width: 50%;
    height: auto;
  }

  .card-title {
    display: flex;
    justify-content: center;
  }

  .card-title i {
    border: 1px solid black;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: #e83d6d;
    border-color: #e83d6d;
  }

  .card-action {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
  }

  .card-action a:nth-child(2) {
    margin-left: 2rem;
  }

</style>