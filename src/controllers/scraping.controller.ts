/**
 * Nutzen der Config
 * Wird erweitert um Queue und Scrape-Klasse
 * Ein Scrape nutzt den Scraping Service zum persistieren
 */

/**
 * Scraping Controller
 *
 * - Start: Für jeden Eintrag der Konfig wird Intervall gestartet und in die Queue geschoben mit CB: Scrape.start(url, function);
 */

/**
 *  Scraping
 * 
 * - constructor: Request an die URL machen und nach gegebener config function (das wird auch da deklariert) ein Objekt erzeugen und das mittels Service in die DB schreiben
 */

 /**
  * Queue
  * 
  * Hat so viele parallele Slots wie in der Config angegeben: Stellt eine Wartschlange von Callbacks dar. Maximale Anzahl ist da gegeben: Siehe stocks iwie
  */

import { Queue } from "../helpers/queue";

export class ScrapingController {
    queue: Queue;

    constructor(scrapingConfig) {
        this.queue = new Queue(scrapingConfig.queueLog);
        this.handleScrapings(scrapingConfig);
    }

    handleScrapings(scrapingConfig) {
        scrapingConfig.scrapings.forEach(scrapeData => {
            setInterval(() => {
                this.queue.dispatchJob(async () => {
                    await Scrape.start(scrapeData);
                })
            }, scrapeData.interval ? scrapeData.interval : scrapingConfig.defaultScrapeInterval);
        });
    }

}

class Scrape {

    public static async start(scrapeData) {
        await Scrape.timeout(1000);
    }

    static timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}