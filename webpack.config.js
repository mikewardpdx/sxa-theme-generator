const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')

const path = require('path');
const glob = require('glob');

const themeRoot = '../dist/-/media/Themes/Tenant/Site/Theme';

const buildEntry = (entryArray) => {
  return entryArray.reduce((acc, item) => {
    const path = item.replace(/index.ts|index.scss/gi, '');
    const name = path.replace(/scripts|components|styles|spas|\//gi, '').toLocaleLowerCase();

    acc[name] = `./${item}`;
    return acc;
  }, {});
}

const sxaScriptBuild = {
  entry: buildEntry([
    ...glob.sync('scripts/**/index.ts')
  ]),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true
            },
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.css', '.scss']
  },
  output: {
    filename: 'scripts/component-[name].js',
    path: path.resolve(__dirname, themeRoot)
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}

const sxaStyleBuild = {
  entry: buildEntry([
    ...glob.sync('styles/components/**/index.scss')
  ]),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.css', '.scss']
  },
  output: {
    path: path.resolve(__dirname, themeRoot)
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/component-[name].css'
    })
  ]
}

const spaBuild = {
  entry: buildEntry([
    ...glob.sync('SPAs/**/index.ts')
  ]),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true
            },
          }
        ]
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue', '.json',],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    filename: 'spas/[name].js',
    path: path.resolve(__dirname, themeRoot)
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [],
      cleanAfterEveryBuildPatterns: [
        './*.js'
      ]
    }),
    new VueLoaderPlugin()
  ]
}

module.exports = [
  sxaScriptBuild,
  sxaStyleBuild,
  spaBuild
];
