const puppeteer = require('puppeteer');

const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));


async function TikTokRun(url) {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        
        await page.goto(url);

        await delay(15000);
        
        await page.screenshot({ path: "TikTok-1.png" });
        
        browser.close();

    } catch (e) {
        console.log("The program has been terminated due to an error at runtime");
        console.error(e);
    }
}

const url = "https://www.tiktok.com/@qpwatcher/video/7409522776685415685";

TikTokRun(url);
