import { ScrapingConfig } from "../interfaces/scraping.interface";
import { ScrapingController } from "../controllers/scraping.controller";

// declare your scraper Functions: they have to return the object you want to save!
const standardScraper = (dom) => console.log("test");


// create your config
const scrapingConfig : ScrapingConfig = {
    queueLog: true,
    defaultScrapeInterval: 60,
    scrapings: [
        {
            url: "www.google.de",
            scraper: standardScraper,
            interval: 60
        }
    ]
}

// let the scraper run! :)

new ScrapingController(scrapingConfig);