<template>
  <div class="bg-white flex dark:bg-gray-400">
    <div class="p-4 h-[75vh] bg-red-800 text-white">
      <h1 class="text-3xl font-bold">Welcome to Ejenda</h1>
      Let's get you set up
    </div>
    <div class="p-4">
      <div class="px-4 py-5 space-y-6 sm:p-6">
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
                class="
                  inline-flex
                  items-center
                  px-3
                  rounded-l-md
                  border border-r-0 border-gray-300
                  bg-gray-50
                  text-gray-500 text-sm
                "
              >
                https://
              </span>
              <input
                type="text"
                name="school-website"
                id="school-website"
                class="
                  focus:ring-red-500 focus:border-red-500
                  flex-1
                  block
                  w-full
                  rounded-none rounded-r-md
                  sm:text-sm
                  border-gray-300
                "
                placeholder="www.example.com"
                v-model="domain"
              />
            </div>
          </div>
        </div>
        <div v-if="school.name">
          <span class="italic text-sm text-gray-300"
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
                  class="
                    inline-flex
                    items-center
                    px-3
                    rounded-l-md
                    border border-r-0 border-gray-300
                    bg-gray-50
                    text-gray-500 text-sm
                  "
                >
                  https://
                </span>
                <input
                  type="text"
                  name="school-website"
                  id="school-website"
                  class="
                    focus:ring-red-500 focus:border-red-500
                    flex-1
                    block
                    w-full
                    rounded-none rounded-r-md
                    sm:text-sm
                    border-gray-300
                  "
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
                  class="
                    focus:ring-red-500 focus:border-red-500
                    flex-1
                    block
                    w-full
                    rounded-md
                    sm:text-sm
                    border-gray-300
                  "
                  placeholder="Your School"
                  v-model="name"
                /></div><custom-button class="" v-show="domain.length > 0 && name.length > 0" @click="createSchool">Add</custom-button></template
          ></Modal>
        </div>
        <button
          type="submit"
          @click="onboard()"
          :disabled="!school.id"
          class="
            disabled:bg-gray-100 disabled:cursor-default
            bg-red-500
            text-white text-center
            font-bold
            p-2
            h-10
            rounded-lg
            cursor-pointer
          "
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
    return { domain: "", school: {}, openModal: false, name: '' };
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
      await this.$auth.fetch('/schools/new', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ name: this.name, url: this.domain }),
      });
      await this.syncData()

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
      await this.syncData()
    },
  },
};
</script>
