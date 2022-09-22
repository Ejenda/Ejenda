<template>
  <div
    class="dark:bg-gray-700"
    :class="{ 'overflow-hidden': $fetchState.pending }"
  >
    <tabs />
    <div class="flex justify-end"></div>
    <div v-if="$fetchState.pending">
      <div
        v-for="item of skeleton"
        :key="item"
        class="h-64 w-full p-4 dark:bg-gray-400"
      >
        <skeleton-loader-vue
          type="rect"
          :width="300"
          :height="45"
          wave-color="#bbb"
          class="mb-2"
        />
        <skeleton-loader-vue
          type="rect"
          :width="'100%'"
          :height="'50px'"
          wave-color="#bbb"
        />
      </div>
    </div>
    <div
      class="flex min-h-screen items-center justify-center"
      v-else-if="$fetchState.error"
    >
      <span class="flex flex-col items-center justify-center text-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline-block h-10 w-10"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        Sorry, an error occurred
        <p>Try again later</p>
      </span>
    </div>
    <div class="flex flex-col md:flex-row" v-else>
      <div
        class="flex flex-col w-full snap-x overflow-scroll bg-gray-100 p-1 dark:bg-transparent"
        :class="{'!flex-row': horizontal}"
      >
        <Subject
          v-for="subject of subjects"
          :key="subject.name"
          :subject="subject"
          :googleClassroomState="googleClassroomState"
          :googleClassroomAssignments="googleClassroomAssignments"
        ></Subject>
        <Modal
          v-model="subjectModalOpen"
          :name="'subjectModal'"
          :show-buttons="true"
          @confirm="$nuxt.refresh() && $vfm.hide('subjectModal')"
          @cancel="$nuxt.refresh() && $vfm.hide('subjectModal')"
          ><edit-subjects /><template slot="title"
            >Edit subjects</template
          ></Modal
        >
      </div>
      <aside class="w-64" aria-label="Sidebar">
        <div
          class="overflow-y-auto rounded bg-gray-50 py-4 px-3 dark:bg-gray-800 h-full"
        >
          <ul class="space-y-2 w-60	z">
            <li>
              <a
                class="flex cursor-pointer items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                @click="$vfm.show('subjectModal')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <span class="ml-3 flex-1 whitespace-nowrap h-full">Edit Subjects</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  middleware: "authenticated",
  head() {
    return {
      title: "App - Ejenda",
      meta: [{ hid: "robots", name: "robots", content: "noindex" }],
    };
  },
  props:["horizontal"],
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch();
    }
  },
  fetchOnServer: true,
  async fetch() {
    // Only show skeleton if the data is 100+ minutes old
    await this.loadData();
  },
  async created() {
    await this.fetchGCI(); // This is a hack to speeeeeeeeeeeeeeeeddddd up loading
  },

  data() {
    let skeleton = [...Array(10).keys()];
    return {
      currentEntry: "",
      subjectModalOpen: false,
      googleClassroomState: false,
      googleClassroomAssignments: [],
      skeleton,
    };
  },
  computed: {
    ...mapState({ subjects: (state) => state.assignments.subjects }),
  },
  methods: {
    ...mapActions({
      loadData: "assignments/loadData",
    }),
    ...mapMutations({}),
    async fetchGCI() {
      let res = await this.$auth.fetch(
        new URL("/google/assignments", process.env.backendURL)
      );
      let data = await res.json();
      if (data.ok == "logged out") {
        this.googleClassroomState = "out";
        return;
      }
      this.googleClassroomState = true;
      this.googleClassroomAssignments = data;
    },
  },
};
</script>
<style>
.assignments-enter,
.assignments-leave-to {
  @apply translate-x-8 transform opacity-0;
}
</style>
