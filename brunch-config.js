// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': /^(?!app)/, // Files that are not in `app` dir.
      'app.js': /^app/
    }
  },
  stylesheets: {joinTo: 'app.css'}
};

const browsers = ['last 2 versions']

exports.plugins = {
  babel: {presets: [['env', {targets: {browsers}}]]},
  postcss: {
    processors: [
      require('autoprefixer')(browsers),
      require('cssnano')({safe: true}),
    ]
  }
};
