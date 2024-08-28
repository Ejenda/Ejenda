module.exports = {
  apps: [
    {
      name: "ejenda",
      exec_mode: "cluster",
      instances: "max",
      env: {
        NODE_ENV: "production",
        NITRO_PORT: 4070
      },
      script: "./.output/server/index.mjs",
    },
  ],
};
