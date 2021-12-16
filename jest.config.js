module.exports = {
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.[tj]s?$': 'babel-jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$':
      'jest-transform-stub',
  },
  collectCoverage: !!process.env.TEST_COVERAGE,
};
