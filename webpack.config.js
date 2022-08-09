const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const copyWebpackPlugin = require('copy-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}

const isDev = mode === 'development';
const isProd = !isDev;

console.log(mode + ' mode');

const esLintProdCheck = () => isProd ? [new ESLintPlugin({ extensions: ['.ts', '.js'] })] : [];

module.exports = {
  mode: mode,

  context: path.resolve(__dirname, 'src'),

  entry: {
    main: './index.ts',
  },

  output: {  
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: (isDev) ? 'assets/[name][ext]' : 'assets/[hash][ext][query]',
  },

  devServer: {
    // hot: isDev,
    liveReload: true,
    watchFiles: '.',
  },

  // devtool: isDev ? 'source-map' : '',
  devtool: 'source-map',


  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
    }),
    ...esLintProdCheck(),

    // new copyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/assets/images'),
    //       to: path.resolve(__dirname, 'dist/assets/images'),
    //     },
    //     {
    //       from: path.resolve(__dirname, 'src/assets/svg'),
    //       to: path.resolve(__dirname, 'dist/assets/svg'),
    //     },
    //   ]
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
    alias: {
      // '@models': path.resolve(__dirname, 'src/models'),
      // '@': path.resolve(__dirname, 'src'),
    },
	}
};