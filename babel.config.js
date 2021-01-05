module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"]
},
// .babelrc or babel-loader option
{
  "plugins": [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` for less
  ]
}
