<template>
  <div class="m-2 flex min-h-screen flex-col p-4">
    <h1 class="text-4xl font-bold mb-4">Admin Dash</h1>
    <span class="font-mono font-bold text-lg">Users</span>
    <p>
      {{ adminData.totalUsers }}
    </p>
    <span class="font-mono font-bold text-lg">Users with 1+ Assignment</span>
    <p>
      {{ adminData.usersWithOneAssignment }}
    </p>

  </div>
</template>
<script>
export default {
  data() {
    return { adminData: {} };
  },
  middleware: ["authenticated", "admin"],
  async fetch() {
    let res = await this.$auth.fetch(`${process.env.backendURL}/api/admin`);
    let data = await res.json();
    this.adminData = data;
  },
};
</script>
