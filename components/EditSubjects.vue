<template>
  <div>
    <Modal
      v-model="modalOpen"
      :name="'createSubject'"
      :showButtons="true"
      @confirm="add"
      @cancel="$vfm.hide('createSubject')"
    >
      <template slot="title">Add subject</template>
      <p class="pb-1">
        <span>Name:</span>
        <input
          v-model="newName"
          class="h-10 rounded-md border border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </p>
      <p>
        <span>Color:</span>
        <select
          class="h-10 rounded-md border border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          v-model="newColor"
        >
          <option value="red">Red</option>
          <option value="indigo">Indigo</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
        </select>
      </p>
    </Modal>
    <draggable v-model="subjects" ghost-class="ghost">
      <transition-group>
        <div
          v-for="(element, i) of subjects"
          :key="element[0]"
          class="mb-1 flex justify-between rounded-md bg-gray-100 p-2"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6 inline-block cursor-move"
              
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            {{ element[0] }}
          </div>
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
  async fetch() {
    var opts = {
      method: "GET",
      headers: {
        pragma: "no-cache",
        "cache-control": "no-cache",
      },
    };

    this.subjects = await (
      await this.$auth.fetch(`${process.env.backendURL}/subjects`, opts)
    ).json();
  },
  data() {
    return { subjects: [], modalOpen: false, newColor: "", newName: "" };
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
