module.exports = {
  pluginOptions: {
    vconsole: {
      enable: true,
    },
    apollo: {
      enableMocks: true,
      enableEngine: true,
      lintGQL: false,
      typescript: true,
    },
  },
  transpileDependencies: ["vuetify"],
};
