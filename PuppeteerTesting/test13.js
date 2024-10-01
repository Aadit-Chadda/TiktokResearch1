const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("http://yahoo.com");
    await page.goto("https://finance.yahoo.com");
    
    await page.goBack();

    await page.goForward();

    await browser.close();

})();
