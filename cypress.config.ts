import { defineConfig } from "cypress";
import registerCodeCoverageTasks from "@cypress/code-coverage/task";

export default defineConfig({
  projectId: "ogjcxw",
  env: {
    VITE_REACT_APP_API_URL:'http://localhost:8080'
  },
  e2e: {
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);
      return config;
    },
  },

  component: {
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);
      return config;
    },
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
