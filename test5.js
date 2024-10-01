const puppeteer = require('puppeteer');
const fs = require('fs');
const { get } = require('https');

async function getSourceCode(url, outputData) {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        await page.goto(url);

        const sourceCode = await page.content();

        fs.writeFileSync(outputData, sourceCode, "utf-8");

        await browser.close();

        console.log("Successfully executed the source code of the url");

    } catch (error) {
        console.error("Error getting source code of the url");
    }
}

const url = "https://aaditchadda.com";
const outputData = "sourceCode.html";

getSourceCode(url, outputData);
