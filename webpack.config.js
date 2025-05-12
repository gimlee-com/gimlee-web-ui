const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

console.log('npm_package_config_BRAND:', process.env.npm_package_config_BRAND);
console.log('npm_package_config_APP:', process.env.npm_package_config_APP);
console.log('--- Direct Env Variables (if you switch method) ---');
console.log('BRAND env:', process.env.BRAND);
console.log('APP env:', process.env.APP);
console.log('--------------------------');

const ENV = JSON.stringify(process.env.NODE_ENV) || 'development';
const TARGET_DEVICE = process.env.TARGET_DEVICE || 'desktop';
const BRAND = process.env.npm_package_config_BRAND;
const APP = process.env.npm_package_config_APP;
const __DEV__ = ENV === 'development'; // eslint-disable-line

if (!BRAND) {
  console.error("ERROR: BRAND is not defined. Check npm config (e.g., run 'npm run brand:default') or package.json 'config' section.");
  process.exit(1); // Optionally exit if BRAND is crucial
}
if (!APP) {
  console.error("ERROR: APP is not defined. Check npm config (e.g., run 'npm run app:hello') or package.json 'config' section.");
  process.exit(1);
}


function pathMatches(source, target) {
  return path.normalize(source).indexOf(path.normalize(path.join(__dirname, target))) >= 0;
}

const targetBundleName = '[chunkhash].[device].bundle.js'.replace('[device]', TARGET_DEVICE);

const webpackConfig = {
  entry: [
    'eventsource-polyfill',
    'babel-polyfill',
    './src/index.jsx',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: targetBundleName,
  },
  devtool: __DEV__ ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-3', 'react'],
              plugins: [
                ['react-css-modules', {
                  generateScopedName: '[name]__[local]--[hash:base64:5]',
                  filetypes: {
                    '.scss': {
                      syntax: 'postcss-scss',
                    },
                  },
                },
                ]],
            },
          },
          {
            loader: 'preprocess-loader',
            options: {
              BRAND,
              DEVICE: TARGET_DEVICE,
              ENV,
            },
          },
          {
            loader: 'eslint-loader',
          },
        ],
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.font\.(js)$/,
        use: [
          'style-loader',
          'css-loader',
          'webfonts-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              camelCase: 'dashes',
            },
          }, {
            loader: 'sass-loader',
            options: {
              data: `$BRAND: ${BRAND}; $DEVICE: ${TARGET_DEVICE};`,
              includePaths: [
                path.join(__dirname, 'src'),
              ],
            },
          },
        ],
        include: function include(pathCandidate) {
          return pathMatches(pathCandidate, 'src') && !pathMatches(pathCandidate, `src/styles/${BRAND}`);
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
        include: path.join(__dirname, `src/styles/${BRAND}`),
      },
      {
        test: /\.(jpg|png)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_DEFAULT_LOCALE: JSON.stringify(process.env.LOCALE) || '\'pl\'',
      APP_DEV: ENV === 'development',
      APP_TARGET_DEVICE: JSON.stringify(process.env.TARGET_DEVICE),
    }),
    new ExtractTextPlugin('[chunkhash].vendor.css'),
    // Prevent all moment locales from being loaded - include just the needed ones
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /pl|en-us/),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'gimlee-ui-app': path.resolve(__dirname, `src/apps/${APP}`),
      'gimlee-ui-components': path.resolve(__dirname, 'src/components'),
      'gimlee-ui-model': path.resolve(__dirname, 'src/model'),
      'gimlee-ui-service': path.resolve(__dirname, 'src/service'),
      'gimlee-ui-store': path.resolve(__dirname, 'src/store'),
      'gimlee-ui-util': path.resolve(__dirname, 'src/util'),
      'gimlee-ui-styles': path.resolve(__dirname, `src/styles/${BRAND}/`),
      lib: path.resolve(__dirname, 'src/lib'),
    },
  },
  devServer: {
    proxy: {
      // Uncomment and optionally modify whenever you'd like to work against real API on your local
      // or DEV environment. Comment out whatever you want to run via the mock server

      /* '/api/something': {
        target: 'http://some-other-host-if-something-happens-to-run-elsewhere',
        secure: false,
      }, */
      '/api': {
        target: 'http://localhost:12060',
        secure: false,
      },
    },
  },
};

if (TARGET_DEVICE === 'desktop') {
  webpackConfig.plugins.unshift(new HtmlPlugin({
    title: 'App',
    template: 'src/index.html',
    inject: 'body',
  }));
} else if (TARGET_DEVICE === 'mobile') {
  webpackConfig.plugins.unshift(new HtmlPlugin({
    title: 'App',
    template: 'src/mobile.html',
    filename: 'mobile.html',
    inject: 'body',
  }));
}

if (process.env.ANALYZE) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
