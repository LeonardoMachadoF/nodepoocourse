module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript"
    ],
    plugins: [
        ["module-resolver", {
            alias: {
                "@module": [
                    "./src/modules"
                ],
                "@shared": [
                    "./src/shared"
                ],
                "@config": [
                    "./src/config"
                ],
                "@errors": [
                    "./src/errors"
                ],
                "@util": [
                    "./src/util"
                ],
            }
        }],
        "babel-plugin-transform-typescript-metadata",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
    ]
}