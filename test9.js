const puppeteer = require('puppeteer');

async function disableJavaScript(url) {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.setJavaScriptEnabled(false);
        await page.goto(url);

        await browser.close();
    } catch (e) {
        console.error(e);
    }
}

const url = 'https://aaditchadda.com';

disableJavaScript(url);
