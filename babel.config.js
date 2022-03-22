module.exports =
{
  "presets": [
    "@babel/preset-env",
    "react-app"
  ],
  plugins: [
    function () {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWithSourceString('process')
          },
        },
      }
    },
  ],
}