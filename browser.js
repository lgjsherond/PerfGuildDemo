import { browser } from 'k6/browser';
import { check, sleep } from "k6";

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const page = await browser.newPage();

  try {

    // Access Home page
    const domain="http://www.jacplus.com.au";
    await page.goto(domain,{waitUntil: "networkidle"});

    page.waitForSelector('button[id="loginButton"]',{state:'attached'});
    
    await page.screenshot({path:'HomePage.png'});
    await page.locator('input[name="username"]').type('perfguild@wiley.com');
    await page.locator('//*[@id="idpLogin"]').click();
    sleep(5);

    await page.locator('input[name="password"]').type('Perf@sept20241');

   
    await page.locator('input[id="submit"').click();
    await page.waitForNavigation({waitUntil: "networkidle"});

    await page.screenshot({path:'bookShelf.png'});
   
  } finally {
    await page.close();
  }
}