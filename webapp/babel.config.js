module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    [
      "component", 
      {
        "libraryName": "mint-ui",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
