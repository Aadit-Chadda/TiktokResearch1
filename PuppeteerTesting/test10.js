const puppeteer = require('puppeteer');

async function checkElementsPresent(url, elements) {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto(url);

        const presentResults = [];

        for (const element of elements) {
            const foundElements = await page.$$(element);
            presentResults[element] = foundElements.length > 0;
        }

        console.log("Elements present");
        console.log(presentResults);

        await browser.close();

    } catch (e) {
        console.error(e);
    }
}

const url = 'http://yahoo.com';
const elements = [".header", "#main-content", "footer", "div"];

checkElementsPresent(url, elements);
