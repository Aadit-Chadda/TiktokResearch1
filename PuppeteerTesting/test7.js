const puppeteer = require('puppeteer');

async function interceptRequest(url) {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        await page.setRequestInterception(true);
        
        // Logic for Request Interception
        page.on('request', (interceptionRequest) => {
            if (interceptionRequest.url().endsWith(".png")) {
                interceptionRequest.abort();
                console.log("Request aborted");
            } else {
                interceptionRequest.headers({ "secretKey": "abc123" });
                interceptionRequest.continue();
                console.log("Request Continued with Headers");
            }
        });

        await page.goto(url);

        await browser.close();

        console.log("Request Interception Complete");

    } catch (error) {
        console.log(error);
    }
}

const url = "https://yahoo.com";

interceptRequest(url);
