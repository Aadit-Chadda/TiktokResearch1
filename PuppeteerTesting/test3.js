const puppeteer = require('puppeteer');

async function run() {
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https:aaditchadda.com");

    // Extract Images
    const images = await page.$$eval("img", (elements) =>
        elements.map((element) => ({
            src: element.src,
            alt: element.alt
        })));
    
    // Extract Links
    const links = await page.$$eval("a", (elements) =>
        elements.map((element) => ({
            href: element.href,
            text: element.textContent
        })));
    
    const imagesCount = images.length;
    const linksCount = links.length;

    const output = JSON.stringify({ images, links, imagesCount, linksCount });
    
    console.log(output);

    await browser.close();
};
    
run();
