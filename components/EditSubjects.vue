<template>
  <div>
    <Modal v-model="modalOpen" :name="'createSubject'" :showButtons="true" @confirm="add" @cancel="$vfm.hide('createSubject')">
      <template slot="title">Add subject</template>
      Name: <input v-model="newName" /> Color:
      <select v-model="newColor">
        <option value="red">Red</option>
        <option value="indigo">Indigo</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="purple">Purple</option>
      </select>
    </Modal>
    <draggable v-model="subjects" ghost-class="ghost">
      <transition-group>
        <div v-for="(element, i) of subjects" :key="element[0]">
          {{ element[0] }}
          <button @click="removeAt(i)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </transition-group>
    </draggable>
    <CustomButton @click="$vfm.show('createSubject')"
      >Add new subject</CustomButton
    >
  </div>
</template>
<script>
import draggable from "vuedraggable";

export default {
  components: { draggable },
  middleware: "authenticated",
  data() {
    let subjects = [...this.$auth.user.subjects]; // without this hack vue yells at me for mutating vuex
    return { subjects, modalOpen: false, newColor: "", newName: "" };
  },
  watch: {
    async subjects() {
      await this.$auth.fetch("/subjects/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjects: this.subjects }),
      });
    },
  },
  methods: {
    add() {
      if (this.newName.trim() == "" || this.newColor == "") return;
      this.subjects.push([this.newName.trim(), this.newColor]);
      this.newName = "";
      this.newColor = "";
      this.$vfm.hide("createSubject");
    },
    removeAt(i) {
      this.subjects.splice(i, 1);
    },
  },
};
</script>
<style>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
