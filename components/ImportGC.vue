<template>
  <div>
    <a href="/google/auth" v-show="!googleClassroomState">
      Sign in with Google to import
    </a>
    <custom-button @click="$vfm.show('importModal' + subject.name)"
      >Import assignments</custom-button
    >
    <Modal
      :name="'importModal' + subject.name"
      v-model="importModalOpen"
    >
      <template slot="title">Import from Google Classroom</template>
      <select class="text-gray-800" v-model="subject.importing">
        <option
          v-for="assignment of googleClassroomAssignments"
          :key="assignment.id"
          :value="assignment.id"
        >
          {{ assignment.title }}
        </option>
      </select>
      <custom-button @click="importAssignment(subject)">Add assignment</custom-button>
    </Modal>
  </div>
</template>
<script>
export default {
  props: ["subject", "googleClassroomState", "googleClassroomAssignments", "importAssignment"],
  data(){
      return {
          importModalOpen: false
      }
  }
};
</script>
