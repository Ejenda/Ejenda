<template>
  <div>
    <a href="/google/auth" v-show="googleClassroomState === 'bad'">
      Sign in with Google to import
    </a>
    <custom-button
      v-show="googleClassroomState"
      @click="$vfm.show('importModal' + subject.name)"
      >Import assignments</custom-button
    >
    <Modal :name="'importModal' + subject.name" v-model="importModalOpen">
      <template slot="title">Import from Google Classroom</template>
      <TRichSelect
        class="text-gray-800"
        :options="googleClassroomAssignments"
        valueAttribute="id"
        textAttribute="title"
        multiple
        v-model="subject.importing"
        :close-on-select="false"
      ></TRichSelect>
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
  ],
  data() {
    return {
      importModalOpen: false,
    };
  },
};
</script>
