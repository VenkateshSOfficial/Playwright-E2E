import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  reporter: 'html',
  workers:3,
  use: {
    headless:false,
    browserName:'chromium',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  /*projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],*/
});
