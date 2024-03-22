module.exports = {
  root: true,
  extends: ['custom', 'plugin:@next/next/recommended'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}
