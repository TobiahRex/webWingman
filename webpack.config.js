const path = require('path');
const webpack = require('webpack');

const BUILD = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const devConfig = {
  noInfo: true,
  devtool: 'inline-source-map',
  target: 'web',
  debug: true,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './public/css/animate.min.css',
    './public/css/toastr.min.css',
    './public/css/style.css',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    pathInfo: true,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './src',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new webpack.DefinePlugin({
      'process.env': {
        DEV: JSON.stringify(process.env.DEV),
        FIREBASE_KEY: JSON.stringify(process.env.FIREBASE_KEY),
        FIREBASE_DOMAIN: JSON.stringify(process.env.FIREBASE_DOMAIN),
        FIREBASE_DB_URL: JSON.stringify(process.env.FIREBASE_DB_URL),
        FIREBASE_BUCKET: JSON.stringify(process.env.FIREBASE_BUCKET),
        JWT_SECRET: JSON.stringify(process.env.JWT_SECRET),
        SENDGRID_API_KEY: JSON.stringify(process.env.SENDGRID_API_KEY),
        SENDGRID_USERNAME: JSON.stringify(process.env.SENDGRID_USERNAME),
        SENDGRID_PASSWORD: JSON.stringify(process.env.SENDGRID_PASSWORD),
        AWS_BUCKET: JSON.stringify(process.env.AWS_BUCKET),
        AWS_URL_BASE: JSON.stringify(process.env.AWS_URL_BASE),
        AWS_SECRET: JSON.stringify(process.env.AWS_SECRET),
        AWS_ACCESS_KEY_ID: JSON.stringify(process.env.AWS_ACCESS_KEY_ID),
        TWILIO_AUTH_TOKEN: JSON.stringify(process.env.TWILIO_AUTH_TOKEN),
        TWILIO_ACCOUNT_SID: JSON.stringify(process.env.TWILIO_ACCOUNT_SID),
        TWILIO_TEST_ACCOUNT_SID: JSON.stringify(process.env.TWILIO_TEST_ACCOUNT_SID),
        TWILIO_TEST_AUTH_TOKEN: JSON.stringify(process.env.TWILIO_TEST_AUTH_TOKEN),
        TWILIO_PHONE: JSON.stringify(process.env.TWILIO_PHONE),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src'),
      },
      {
        test: /(\.css)$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(png|gif|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000?',
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file?emitFile=false',
      },
      {
        test: /\.(jpe?g|png|giff|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

const prodConfig = {
  devtool: 'eval',
  noInfo: true,
  debug: true,
  target: 'web',
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'bin', 'public'),
    publicPath: `http://localhost:${PORT}/`,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000',
      },
      {
        test: /\.tff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(png|gif|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000?',
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file?emitFile=false',
      },
      {
        test: /\.(jpe?g|png|giff|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
module.exports = (BUILD === 'production') ? prodConfig : devConfig;
