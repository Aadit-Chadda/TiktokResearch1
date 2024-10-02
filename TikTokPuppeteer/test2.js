const puppeteer = require('puppeteer');

const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));


async function TikTokRun(url) {
    try {
        const browser = await puppeteer.launch({ headless: false });
        console.log("Launched Browser");

        const page = await browser.newPage();
        console.log("Launched new page");
        
        await page.emulate(puppeteer.KnownDevices["iPhone 13 Pro Max"]);
        console.log("Started emulating an iPhone");

        const latitude = 37.7749;
        const longitude = 122.4194;

        await page.browserContext().overridePermissions(url, ['geolocation']);
        await page.setGeolocation({ latitude, longitude });
        console.log("Set new coordinates to the browser page");
        
        await page.goto(url);
        console.log("Traversing to website URL");

        console.log("Program paused for 15 seconds");
        await delay(15000);
        console.log("Program resumed!");

        await page.screenshot({ path: "TikTok-2.png" });
        console.log("Screenshot captured!");

        await browser.close();
        console.log("Program successful! Code ended");
        
    } catch (e) {
        console.log("The program has been terminated due to an error at runtime");
        console.error(e);
    }
}

const url = "https://www.tiktok.com/@qpwatcher/video/7409522776685415685";

TikTokRun(url);
