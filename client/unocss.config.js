const { presetUno } = require('@unocss/preset-uno');

module.exports = {
  presets: [
    presetUno(),
  ],
  theme: {
    extend: {
      // Your custom theme configurations
    },
  },
  variants: {
    extend: {
      // Your custom variant configurations
    },
  },
  plugins: [
    // Your custom plugin configurations
  ],
};
