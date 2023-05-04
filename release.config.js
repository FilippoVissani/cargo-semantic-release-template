const config = require('semantic-release-preconfigured-conventional-commits')
const publishCommands = `
semantic-release-cargo prepare \${nextRelease.version} || exit 1
git tag -a -f \${nextRelease.version} \${nextRelease.version} -F CHANGELOG.md || exit 2
git push --force origin \${nextRelease.version} || exit 3
`
const releaseBranches = ["main"]
config.branches = releaseBranches
config.plugins.push(
    ["@semantic-release/exec", {
        "publishCmd": publishCommands,
    }],
    ["@semantic-release/github"],
    ["@semantic-release/git", {
        "assets": ["CHANGELOG.md", "package.json"],
        "message": "chore(release)!: [skip ci] ${nextRelease.version} released"
    }],
    ["@semantic-release-cargo/semantic-release-cargo"],
)
module.exports = config