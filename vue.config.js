module.exports = {
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      sass: {
        additionalData: `
        @import "~@/styles/main.sass"
        @import "~@/styles/_variables.sass"
        `,
      },
    },
  },
};
