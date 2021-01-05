// module.exports = {
//     css: {
//       loaderOptions: {
//         less: {
//           lessOptions: {
//             javascriptEnabled: true,
//           },
//         },
//       },
//     },
//   };
const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: 'mapbox-gl',
      }),
    ],
  },

  
}