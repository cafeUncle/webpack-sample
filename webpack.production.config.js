const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: "production", // 会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
  entry:  __dirname + "/index.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/dist",//打包后的文件存放的地方
    filename: "[name]-[hash].js"//打包后输出文件的文件名
  },
  devtool: 'null', // 注意修改了这里，不生成任何source-map，这能大大压缩我们的打包代码
  devServer: {
  	contentBase: "./dist",
  	historyApiFallback: true,
  	inline: true,
    hot: true
  },
  module: {
  	rules: [
  		{
  			test: /(\.jsx|\.js)$/,
  			use: {
  				loader: "babel-loader"
  			},
  			exclude: {
  				or: ["/node_module/"]
  			}
  		},
  		{
        test: /\.css$/,
        use: [
            {
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
        	        modules: {
        	        	localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
        	        }
                }
            }, {
                loader: "postcss-loader"
            }
        ]
      }
  	]
  },
  plugins: [
    new webpack.BannerPlugin('fep:版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数. 模板编译后也会输出到output文件夹
    }), 
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new webpack.optimize.OccurrenceOrderPlugin(), // webpack4 production自带，无需配置. 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    // new webpack.optimize.UglifyJsPlugin(), //webpack.optimize.UglifyJsPlugin has been removed, webpack4已不支持，移到config.optimization
    // new ExtractTextPlugin("style.css"), // webpack4 production自带，无需配置. 分离CSS和JS文件
    // new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }), // 有了 mode:production 或 cli 有 NODE_ENV=production，则不用再配置这个插件了
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist/*'],
      verbose: true,
      dry: false
    })
  ],
  optimization:{  // 另，又说webpack4 -mode production 已经可以自动压缩了，不需要再加插件
      minimizer:[
          new UglifyJsPlugin({
              uglifyOptions: {
                  output: {
                      comments: false
                  },
                  compress: {
                      drop_debugger: true,
                      drop_console: true
                  }
              }
          })
      ]
  }
}