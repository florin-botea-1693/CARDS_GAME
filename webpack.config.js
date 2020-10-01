const path = require('path');

module.exports = {
    mode: "development", // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: "./src/client/game.ts", // string | object | array
    // defaults to ./src
    // Here the application starts executing
    // and webpack starts bundling
    output: {
        path: path.resolve(__dirname, "dist"), // string
        filename: "game.js", // string
        pathinfo: false
    },
    module: {
        // configuration regarding modules
        rules: [
            // {
            //     test: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        },
                    },
                ],
            }
        ],
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
            "node_modules",
            path.resolve(__dirname, "src")
        ],
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    devtool: "eval", //"source-map", // enum
    plugins: [
        // ...
    ],
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    }
}