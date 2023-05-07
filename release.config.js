const config = require('semantic-release-preconfigured-conventional-commits')
const publishCommands = `
sed -i 's/version = "\${lastRelease.version}"/version = "\${nextRelease.version}"/' Cargo.toml || exit 1
git add -A || exit 2
git tag -a -f \${nextRelease.version} \${nextRelease.version} -F CHANGELOG.md || exit 4
git push --force origin \${nextRelease.version} || exit 5
cargo package || exit 6
cargo publish || exit 7
`
const releaseBranches = ["main"]
config.branches = releaseBranches
config.plugins.push(
    ["@semantic-release/exec", {
        "publishCmd": publishCommands,
    }],
    ["@semantic-release/github", {
        "assets": [
            { "path": "target/package/*.crate" },
        ]
    }],
    ["@semantic-release/git", {
        "assets": ["CHANGELOG.md", "package.json"],
        "message": "chore(release)!: [skip ci] ${nextRelease.version} released"
    }],
)
module.exports = config