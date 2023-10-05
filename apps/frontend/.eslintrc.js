module.exports = {
  root: true,
  extends: ['custom', 'plugin:@next/next/recommended', 'next/core-web-vitals'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
}
