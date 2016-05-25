'use strict';

const ENVIRONMENT = {
  QA : 'QA',
  STAGE : 'STAGE',
  PROD : 'PROD'
};

const WEBPACK = require('webpack'),
      PATH = require('path'),
      MERGE = require('webpack-merge'),
	    HTML_WEBPACK_PLUGIN= require('html-webpack-plugin'),
      CLEAN = require('clean-webpack-plugin');

const PATHS = {
  development : PATH.resolve(__dirname, './development'),
  production : PATH.resolve(__dirname, './production')
};

const TEMPLATE = {
  template: 'app/index_template.html', //custom template path
  inject: true // inject scripts
};

var currentEnv = process.env.NODE_ENV;

var appCommonConfig = {},
    appLoader = {module : {}},
    appPlugins = { plugins : [] };
;
/**
* Setting app configuration
*/
appCommonConfig.context = PATHS.development;
appCommonConfig.entry = {
  bundle : ['./app/index.js']
};
appCommonConfig.output = {
  path : PATH.join(PATHS.development),
  filename : '[name].js'
};
appCommonConfig.resolve = {
		root : [PATHS.development],
    extensions: ['', '.js', '.jsx']
};

/**
* Adding app loaders
*/
appLoader.module.loaders = [
  {
		/**
		*	To add style, css, sass loader -> npm i -D style-loader css-loader sass-loader
    * npm i node-sass --save-dev
		*	To Add auto prefixer -> npm i autoprefixer-loader --save-dev
		*	npm install node-sass --save-D
		*/
		test: /\.scss$/,
		loader: 'style!css!sass!autoprefixer-loader'
	},
  {
    /**
    * We need a transpiler for interpreting our ES6 code.
    * This is where Babel comes in. Let’s install the babel-loader and babel-core packages that
    * we’ll use to work with Webpack, as well as the ES2015 and React presets for loading the
    * code that we’ll write
    * npm install --save-dev babel-loader
    * npm install --save-dev babel-core
    * npm install --save-dev babel-preset-es2015
    * npm install --save-dev babel-preset-react
    */
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      presets: ['es2015', 'react']
    }
  }
];

switch (currentEnv) {
  case ENVIRONMENT.QA :
  case ENVIRONMENT.STAGE :
  case ENVIRONMENT.PROD : {
    appCommonConfig.output = {
      path : PATH.join(PATHS.production),
      filename : '[name].[chunkhash].js'
    };

    //Cleaning production folder
    appPlugins.plugins.push(new CLEAN([PATHS.production], {verbose: false }));
    //Uglifying files
	  appPlugins.plugins.push(new WEBPACK.optimize.UglifyJsPlugin({compress: {warnings: false}}));
    break;
  }
  default : {//development
  }
}//End of switch case

//Setting Up CommonsChunkPlugin
appPlugins.plugins.push(new WEBPACK.optimize.CommonsChunkPlugin({names: ['vendor', 'manifest']}));
//Creating index.html
appPlugins.plugins.push(new HTML_WEBPACK_PLUGIN(TEMPLATE));

module.exports = MERGE(appPlugins, appCommonConfig, appLoader);
