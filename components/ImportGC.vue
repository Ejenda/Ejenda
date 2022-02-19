<template>
  <div>
    <a href="/google/auth" v-show="googleClassroomState === 'bad'">
      Sign in with Google to import
    </a>
    <custom-button
      v-show="googleClassroomState"
      @click="$vfm.show('importModal' + subject.name)"
      ><span class="hidden md:block">Import assignments</span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 md:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        /></svg
    ></custom-button>
    <Modal :name="'importModal' + subject.name" v-model="importModalOpen">
      <template slot="title">Import from Google Classroom</template>
      <client-only>
        <TRichSelect
          class="text-gray-800"
          :options="googleClassroomAssignments"
          valueAttribute="id"
          textAttribute="title"
          multiple
          v-model="importing"
          :close-on-select="false"
        ></TRichSelect>
      </client-only>
      <custom-button @click="importAssignment(subject)"
        >Add assignment</custom-button
      >
    </Modal>
  </div>
</template>
<script>
export default {
  props: [
    "subject",
    "googleClassroomState",
    "googleClassroomAssignments",
    "importAssignment",
    "importing"
  ],
  data() {
    return {
      importModalOpen: false,
    };
  },
};
</script>
