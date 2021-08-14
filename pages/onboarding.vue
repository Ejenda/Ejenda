<template>
  <div class="bg-white flex">
    <div class="p-4 h-[75vh] bg-red-800 text-white">
      <h1 class="text-3xl font-bold">Welcome to Ejenda</h1>
      Let's get you set up
    </div>
    <div class="p-4">
      <h1 class="text-2xl font-bold">Find your school</h1>
      Enter your school domain
      <input v-model="domain" />
      <div v-if="school.name">
        <span class="italic text-sm text-gray-300"
          >You are at {{ school.name }}</span
        >
      </div>
      <div v-else>
        <button @click="$vfm.show('createSchool')">Add a new school</button>
        <Modal :name="'createSchool'" v-model="openModal">
          <template v-slot:title>Add a new school</template>
          <template>Enter your domain: <input v-model="domain"/></template
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
</template>
<script>
export default {
  middleware: "authenticated",
  data() {
    return { domain: "", school: {}, openModal: false };
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
          this.$router.push("/app");
        }
      }
    },
  },
  watch: {
    async domain() {
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
};
</script>
