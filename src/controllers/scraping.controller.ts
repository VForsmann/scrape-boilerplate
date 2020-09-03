import { Queue } from "../helpers/queue";
import { Scraping } from "../interfaces/scraping.interface";

const puppeteer = require('puppeteer');
const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');

export class ScrapingController {
    queue: Queue;

    constructor(scrapingConfig) {
        this.queue = new Queue(scrapingConfig.queueLog);
        this.handleScrapings(scrapingConfig);
    }

    async handleScrapings(scrapingConfig) {
        puppeteerExtra.use(pluginStealth());
        const chrome = await puppeteerExtra.launch({
            headless: true,
            args: ['--no-sandbox']
        });
        scrapingConfig.scrapings.forEach((scrapeData: Scraping) => {
            // scraping in intervals
            setInterval(() => {
                // queue cares: just 1 scraping at a time
                this.queue.dispatchJob(async () => {
                    await Scrape.start(scrapeData, chrome);
                })
            }, scrapeData.interval ? scrapeData.interval : scrapingConfig.defaultScrapeInterval);
        });
    }

}


const cheerio = require('cheerio');
class Scrape {

    public static async start(scrapeData: Scraping, chrome: any) {
        try {
            const tab = await chrome.newPage();
            await tab.goto(scrapeData.url);
            const content = await tab.content();
            console.log(content);
            // const html = await requestPromise(scrapeData.url);
            // const result = scrapeData.scraper(html, cheerio);
            // console.log(result);
        } catch (error) {
            console.warn("ERROR WHILE SCRAPING!", error)
        }

    }
}