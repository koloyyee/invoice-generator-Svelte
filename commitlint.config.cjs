const Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [1, "always", 72],
    "subject-full-stop": [1, "always", "."],
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "revert"],
    ],
  },
};

module.exports = Configuration;
