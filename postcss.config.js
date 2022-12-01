module.exports = (ctx) => {
  const isProduction = ctx.env === 'production';
  const plugins = [
    require('postcss-import'),
    require('postcss-preset-env')({
      importFrom: 'styles/shared/_breakpoints.css',
    }),
  ];

  if (isProduction) {
    plugins.push(require('cssnano'));
  }

  return {
    plugins,
  };
};
