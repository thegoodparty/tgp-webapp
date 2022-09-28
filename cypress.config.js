const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  numTestsKeptInMemory: 0,
  projectId: "itsm87",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
