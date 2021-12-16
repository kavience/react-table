module.exports = {
  presets: [
    '@babel/preset-typescript',
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions']
        },
        modules: process.env.IS_TEST ? 'commonjs' : false
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-proposal-class-properties',
      { loose: !process.env.IS_TEST }
    ],
    ['@babel/plugin-proposal-private-methods', { loose: !process.env.IS_TEST }],
    '@babel/plugin-transform-runtime',
    [
      '@babel/plugin-proposal-private-property-in-object',
      { loose: !process.env.IS_TEST }
    ]
  ]
};
