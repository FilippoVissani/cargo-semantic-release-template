const config = require('semantic-release-preconfigured-conventional-commits')
const publishCommands = `
cargo login \${CARGO_REGISTRY_TOKEN} || exit 1
sed -i 's/version = "\${lastRelease.version}"/version = "\${nextRelease.version}"/' Cargo.toml || exit 2
git tag -a -f \${nextRelease.version} \${nextRelease.version} -F CHANGELOG.md || exit 3
git push --force origin \${nextRelease.version} || exit 4
cargo package || exit 5
cargo publish || exit 6
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