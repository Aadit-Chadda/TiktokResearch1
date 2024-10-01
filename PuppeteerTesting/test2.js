const puppeteer = require("puppeteer");

async function run() {
    //Launch a new browser instance
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://aaditchadda.com");
    
    const title = await page.title();
    console.log(title);

    console.log();

    const heading = await page.$eval("p", (element) => element.textContent);
    console.log(heading);
    
    await browser.close();
    
}

run();
