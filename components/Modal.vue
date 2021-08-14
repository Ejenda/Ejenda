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
    <span class="mr-8 w-full bg-red-500 text-white p-2 rounded-t-xl font-semibold cursor-move" id="modal-header">
      <slot name="title"></slot>
    </span>
    <div class="flex-grow overflow-y-auto bg-white p-2 flex flex-col rounded-b">
      <div class="flex-1 mb-auto">
        <slot v-bind:params="params"></slot>
      </div>
      <div class="mt-auto" v-if="showButtons">
        <button class="bg-red-500 text-white text-center font-bold mt-2 p-2 h-10 rounded-lg cursor-poi" @click="$emit('confirm', close)">post</button>
        <button @click="$emit('cancel', close)">cancel</button>
      </div>
    </div>
    <button class="absolute top-0 right-0 mt-2 mr-2 text-white" @click="close"><Icon name="x" /></button>
  </vue-final-modal>
</template>

<script>
export default {
  props: ['showButtons']
}
</script>
