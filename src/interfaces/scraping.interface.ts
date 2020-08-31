export interface Scraping {
    url: String,
    scraper: Function,
    interval: Number
}

export interface ScrapingConfig {
    queueLog: Boolean,
    defaultScrapeInterval,
    scrapings: Array<Scraping>
}