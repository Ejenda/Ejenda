<template>
  <div class="flex bg-white dark:bg-gray-400">
    <div class="h-[75vh] bg-red-800 p-4 text-white">
      <h1 class="text-3xl font-bold">Welcome to Ejenda</h1>
      Let's get you set up
    </div>
    <div class="p-4">
      <div class="space-y-6 px-4 py-5 sm:p-6">
        <h1 class="text-2xl font-bold">Find your school</h1>
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-3 sm:col-span-2">
            <label
              for="school-website"
              class="block text-sm font-medium text-gray-700"
            >
              Enter your school domain
            </label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <span
                class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
              >
                https://
              </span>
              <input
                type="text"
                name="school-website"
                id="school-website"
                class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                placeholder="www.example.com"
                v-model="domain"
              />
            </div>
          </div>
        </div>
        <div v-if="school.name">
          <span class="text-sm italic text-gray-300"
            >You are at {{ school.name }}</span
          >
        </div>
        <div v-else>
          <button @click="$vfm.show('createSchool')">Add a new school</button>
          <Modal :name="'createSchool'" v-model="openModal">
            <template v-slot:title>Add a new school</template>
            <template
              >Enter your domain:
              <div class="mt-1 flex rounded-md shadow-sm">
                <span
                  class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
                >
                  https://
                </span>
                <input
                  type="text"
                  name="school-website"
                  id="school-website"
                  class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="www.example.k12.x.us"
                  v-model="domain"
                />
              </div>
              Enter the school name:
              <div class="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="school-website"
                  id="school-website"
                  class="block w-full flex-1 rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="Your School"
                  v-model="name"
                />
              </div>
              <custom-button
                class=""
                v-show="domain.length > 0 && name.length > 0"
                @click="createSchool"
                >Add</custom-button
              ></template
            ></Modal
          >
        </div>
        <button
          type="submit"
          @click="onboard()"
          :disabled="!school.id"
          class="h-10 cursor-pointer rounded-lg bg-red-500 p-2 text-center font-bold text-white disabled:cursor-default disabled:bg-gray-100"
        >
          Let's get started
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this);
  },
  middleware: ["authenticated", "not-onboarded"],
  head() {
    return { title: "Get started - Ejenda" };
  },
  data() {
    return { domain: "", school: {}, openModal: false, name: "" };
  },
  methods: {
    async onboard() {
      if (this.school.id) {
        let res = await fetch("/onboard", {
          method: "POST",
          body: JSON.stringify({ school: this.school.id }),
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$auth.token,
          },
        });
        let data = await res.json();
        if (data.ok) {
          this.$store.dispatch("auth/login", this.$auth.token);
          this.$router.replace("/app");
        }
      }
    },
    async createSchool() {
      await this.$auth.fetch("/schools/new", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: this.name, url: this.domain }),
      });
      await this.syncData();
    },
    async syncData() {
      let res = await fetch("/schools/lookup", {
        method: "POST",
        body: JSON.stringify({
          url: this.domain.replace("https://", "").replace("http://", ""),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await res.json();
      this.school = data;
    },
  },

  watch: {
    async domain() {
      await this.syncData();
    },
  },
};
</script>
