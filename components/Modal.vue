<template>
  <vue-final-modal
    v-slot="{ params, close }"
    :lock-scroll="false"
    :drag="true"
    dragSelector="#modal-header"
    :resize="true"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 rounded w-full h-full md:w-1/2 md:h-1/2"
    v-on="$listeners"
  >
    <span
      class="mr-8 w-full cursor-move rounded-t-lg bg-red-500 p-2 font-semibold text-white"
      id="modal-header"
    >
      <slot name="title"></slot>
    </span>
    <div
      class="flex flex-grow flex-col overflow-y-auto rounded-b-lg bg-white p-2"
    >
      <div class="mb-auto flex-1">
        <slot v-bind:params="params"></slot>
      </div>
      <div class="mt-auto" v-if="showButtons">
        <button
          class="mt-2 h-10 cursor-pointer rounded-lg bg-red-500 p-2 text-center font-bold text-white"
          @click="$emit('confirm', close)"
        >
          Submit
        </button>
        <button @click="$emit('cancel', close)">Cancel</button>
      </div>
    </div>
    <button class="absolute top-0 right-0 mt-2 mr-2 text-white" @click="close">
      <Icon name="x" />
    </button>
  </vue-final-modal>
</template>

<script>
export default {
  props: ["showButtons"],
};
// h-5 w-5
// Force jit to add those classes
</script>
