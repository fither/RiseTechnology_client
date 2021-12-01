<template>
  <b-modal 
    id="modal"
    title="Onay"
    @ok="handleOk"
    @hidden="closeModal"
  >
    <div class="d-block text-center">
      Silme işlemini onaylıyor musunuz?
    </div>
  </b-modal>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  @Component({})
  export default class QuestionModal extends Vue {
    @Prop({required: true}) isModalOpen!: boolean;

    handleOk(bvModalEvt: Event): void {
      bvModalEvt.preventDefault();
      this.$emit('ok', bvModalEvt);
      this.closeModal();
    }

    closeModal(): void {
      this.$emit('close');
    }

    @Watch('isModalOpen')
    onModalOpenChange(value: boolean): void {
      if(value) {
        this.$bvModal.show('modal');
      } else {
        this.$bvModal.hide('modal');
      }
    }
  }
</script>