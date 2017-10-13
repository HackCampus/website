const browsers = ['last 2 versions']

module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'app.js': /^app/,
        'vendor.js': /^(?!app)/, // Dependencies
      },
    },
    stylesheets: {joinTo: 'styles.css'},
  },

  plugins: {
    babel: {presets: [['env', {targets: {browsers}}]]},
    postcss: {
      processors: [
        require('autoprefixer')(browsers),
        require('cssnano')({safe: true}),
      ],
    },
    static: {
      processors: [
        require('html-brunch-static')({
          processors: [
            require('marked-brunch-static')()
          ],
          handlebars: {
            enableProcessor: true,
          },
        }),
      ],
    },
  },
}
