import { Queue } from "../helpers/queue";

export class ScrapingController {
    queue: Queue;

    constructor(scrapingConfig) {
        this.queue = new Queue(scrapingConfig.queueLog);
        this.handleScrapings(scrapingConfig);
    }

    handleScrapings(scrapingConfig) {
        scrapingConfig.scrapings.forEach(scrapeData => {
            // scraping in intervals
            setInterval(() => {
                // queue cares: just 1 scraping at a time
                this.queue.dispatchJob(async () => {
                    await Scrape.start(scrapeData);
                })
            }, scrapeData.interval ? scrapeData.interval : scrapingConfig.defaultScrapeInterval);
        });
    }

}

const requestPromise = require('request-promise');
const cheerio = require('cheerio');
class Scrape {

    public static async start(scrapeData) {
        try {
            const html = await requestPromise(scrapeData.url);
            const result = scrapeData.scraper(html, cheerio);
            console.log(result);
        } catch(error) {
            console.warn("ERROR WHILE SCRAPING!", error)
        }

    }
}