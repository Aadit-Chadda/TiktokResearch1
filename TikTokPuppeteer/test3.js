const puppeteer = require('puppeteer');
const fs = require('fs');


const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

async function TikTokRun(url) {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(url);

        await delay(10_000);

        const foundElements = await page.$$(".css-13wx63w-DivCommentObjectWrapper");
        console.log(foundElements.length);

        await browser.close();
        
    } catch (e) {
        console.log("The program has been terminated due to an error at runtime");
        console.error(e);
    }
}

const url = "https://www.tiktok.com/@qpwatcher/video/7409522776685415685";

TikTokRun(url);
