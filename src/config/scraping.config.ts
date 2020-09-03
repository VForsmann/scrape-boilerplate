import { ScrapingConfig } from "../interfaces/scraping.interface";
import { ScrapingController } from "../controllers/scraping.controller";

// declare your scraper Functions: they have to return the object you want to save!
const standardScraper = (html, cheerio) => {
    return {};
}


// create your config
const scrapingConfig : ScrapingConfig = {
    queueLog: false,
    defaultScrapeInterval: 60000,
    scrapings: [
        {
            url: "https://www.immobilienscout24.de/Suche/radius/haus-kaufen?centerofsearchaddress=Olfen;59399;;;;&geocoordinates=51.70655;7.374;5.0&enteredFrom=one_step_search/",
            scraper: standardScraper,
            interval: 30000
        }
    ]
}

// let the scraper run! :)
export default class Scraping  {
    public static start() {
        new ScrapingController(scrapingConfig);
    }
}
