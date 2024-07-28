// @ts-check
const { defineConfig, devices } = require('@playwright/test');
module.exports = {
    testDir: './tests',
    // other configurations
    use: {
      baseURL: 'https://www.securian.com/insights-tools/retirement-calculator.html', // Define your URL here
    },
    reporter: [['html']],
    projects:[
      {
        name: 'Google Chrome',
        use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      },
    ],
  };
  