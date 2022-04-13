const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/, },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: []
};
