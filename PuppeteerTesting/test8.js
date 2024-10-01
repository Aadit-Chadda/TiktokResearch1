const puppeteer = require('puppeteer');

let device0 = puppeteer.KnownDevices["iPhone 11"];
let device1 = puppeteer.KnownDevices["iPad"];

let devices = [device0, device1];

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    for (var i = 0; i < devices.length; i++) {
        await page.emulate(devices[i]);
        await page.goto("https://yahoo.com");
        await page.screenshot({ path: `screenshotDevice${i}.png` });
    }
    await browser.close();

})();
