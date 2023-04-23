const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let htmlPageNames = ['login','signup', 'feed', 'create','profile'];
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    template: `./${name}.html`, // relative path to the HTML files
    filename: `${name}.html`, // output HTML files
    chunks: [`${name}`] // respective JS files
  })
});

module.exports = [{
  devServer: {
    historyApiFallback: true,
    static: './',
  },

  mode: 'development',
  entry : {
    style :'./app.scss',
    login : './js/login.js',
    signup : './js/signup.js',
    feed : './js/feed.js',
    create : './js/create.js',
    profile : './js/profile.js'
  },
  //entry : ['./app.scss', './js/app.js' ,'./js/menu.js'],
  output: {
    filename: '[name].js',

    //publicPath: '/index.html',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer()
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),

              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules']
              },
            },
          },
        ]
      },{
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ]
  },
  plugins: [
  ].concat(multipleHtmlPlugins)
}];