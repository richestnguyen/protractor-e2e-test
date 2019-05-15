import { $, browser, ElementFinder, protractor } from 'protractor';
import {ElementFinderBaseExtension} from '../extensions/element-finder-base-extension';

/**
 * The base class for all page objects in eGDD.
 */
export abstract class BasePage {

    public readonly mainHeading = $('.mainHeading');
    public readonly homeButton = $('.mainhdr .home');

    public static async preparePage<P extends BasePage>(pageClass: {new(): P; }): Promise<P> {
        const page = new pageClass();
        await page.forPageAvailable();
        return Promise.resolve(page);
    }

    public constructor() {
        ElementFinderBaseExtension.extend();
        // ElementFinderExtension.extend();
        // TableExtension.extend();
        // StringExtensions.extend();
    }

    public async forPageAvailable(): Promise<any> {
        const marker = await this.getPagePresenceMarker();
        if (marker) {
            var EC = protractor.ExpectedConditions;
            browser.wait(EC.presenceOf(marker), 5000);
            return;
        }
        return Promise.resolve(null);
    }

    protected abstract getPagePresenceMarker(): ElementFinder;

    public static async navigateToHome(): Promise<void> {
        await browser.get('http://www.way2automation.com/angularjs-protractor/banking/');
    }
}
