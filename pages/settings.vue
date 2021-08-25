<template>
  <div class="bg-white flex dark:bg-gray-400 rounded-r-xl flex-row sm:flex-col lg:flex-row xl:flex-row">
    <div class="p-4 h-[75vh] bg-red-300 text-white flex-1 lg:flex-none rounded-r-xl">
      <h1 class="text-3xl font-bold">Settings</h1>
      <a href="#subjects">Subjects</a>
    </div>
    <div class="p-4 rounded-r-lg flex-1">
      <section id="subjects">
        <h1 class="text-2xl font-bold">Subjects</h1>
        <CustomButton @click="$vfm.show('createSubject')">Add</CustomButton>
        <Modal v-model="modalOpen" :name="'createSubject'">
          <template slot="title">Add subject</template>
          Name: <input v-model="newName" /> Color:
          <select v-model="newColor">
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
          </select>
          <CustomButton   @click="add">Add</CustomButton>
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
      </section>
    </div>
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
