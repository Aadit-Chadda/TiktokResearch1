// Getting SEO Data

const puppeteer = require('puppeteer');
const fs = require('fs');

async function run () {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("Https://yahoo.com");

    // SEO Related data
    const title = await page.title();
    const metaDescription = await page.$eval("meta[name='description']", (element) => element.textContent);
    
    const metaKeywords = await page.$eval("meta[name='keywords']", (element) => element.textContent);
    //Extract Links
    const links = await page.$$eval("a", (element) => 
        element.map((element) => ({
            src: element.href,
            text: element.textContent
        })))
    
    const divisions = await page.$$eval("._yb_x412sj", (element) => 
        element.map((element) => ({
            text: element.textContent
        })))
    
    const images = await page.$$eval("img", (element) =>
        element.map((element) => ({
            src: element.src,
            alt: element.alt
        })))
    
    // Take count of the images and links
    const imagesCount = images.length;
    const linksCount = links.length;

    // Prepare output format
    const outputData = {
        title,
        metaDescription,
        metaKeywords,
        images,
        links,
        imagesCount,
        linksCount,
        divisions
    };

    // Convert JSON into a string
    const outputJSON = JSON.stringify(outputData);

    // Write output to a file
    fs.writeFileSync("test4Output.JSON", outputJSON);

    await browser.close();
}

run();
