/**
 * @type {import('semantic-release').GlobalConfig}
 */

export default {
  repositoryUrl: "https://github.com/saoudi-h/tw-screens.git",
  tagFormat: "v${version}",
  releaseNotesFilename: "CHANGELOG.md",
  publish: true,
  ci: true,
  branches: ["main"],
  preset: "conventionalcommits",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/npm", { npmPublish: true }],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "README.md", "package.json", "pnpm-lock.yaml"],
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: "dist/*.js",
      },
    ],
  ],
};
