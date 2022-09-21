module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  globals: {
    window: {
      location: {
        href: false,
      },
    },
  },
};
