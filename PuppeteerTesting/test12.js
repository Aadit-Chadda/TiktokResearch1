const puppeteer = require('puppeteer');
const axios = require('axios');
const { parseStringPromise } = require('xml2js');
const fs = require('fs');

async function extractDataFromSitemap(sitemapURL) {
    try {
        const response = await axios.get(sitemapURL);
        const sitemap = response.data;

        const parsedXML = await parseStringPromise(sitemap);
        const urls = parsedXML.urlset.url.map(url => url.loc[0]);

        const browser = await puppeteer.launch();

        const scrapingDataPromises = urls.map(async (url) => {
            const page = await browser.newPage();
            await page.goto(url);

            const data = await page.evaluate(() => {
                const title = document.title;

                return { title };
            });

            await page.close();

            return data;
        });

        const outputData = "sitemapData.json";
        const scrapedDataArray = await Promise.all(scrapingDataPromises);
        fs.writeFileSync(outputData, JSON.stringify(scrapedDataArray));

        await browser.close();

    } catch (e) {
        console.error(e);
    }
}

const sitemapURL = "https://www.wpbeginner.com/page-sitemap.xml";
extractDataFromSitemap(sitemapURL);
