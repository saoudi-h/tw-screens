/**
 * @type {import('semantic-release').GlobalConfig}
 */

export default {
    repositoryUrl: 'https://github.com/saoudi-h/tw-screens.git',
    branches: ['main'],
    preset: 'conventionalcommits',
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
                releaseRules: [
                    { type: 'build', release: 'patch' },
                    { type: 'refactor', release: 'patch' },
                ],
            },
        ],
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        [
            '@semantic-release/npm',
            {
                npmPublish: true,
            },
        ],
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md', 'package.json', 'pnpm-lock.yaml'],
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
            },
        ],
        '@semantic-release/github',
    ],
}
