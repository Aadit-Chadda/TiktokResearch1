const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeURLs(urls) {
    try {
        const browser = await puppeteer.launch({ headless: false });

        const scrapingPromises = urls.map(async (url) => {
            const page = await browser.newPage();
            await page.goto(url);

            const data = await page.evaluate(() => {
                const title = document.querySelector('h1').textContent.trim();
                const description = document.querySelector('p').textContent.trim();

                return { title, description };
            });

            await page.close();

            return data;

        });

        const scrapDataArray = await Promise.all(scrapingPromises);

        const outputData = "outputData.json";
        fs.writeFileSync(outputData, JSON.stringify(scrapDataArray));

        console.log("Scraped data from URLs written to file" + outputData);

        browser.close();

    } catch (e) {
        console.error(e);
    }
}

const urls = [
    "https://yahoo.com",
    "https://github.com",
    "https://aaditchadda.com"
];

scrapeURLs(urls);
