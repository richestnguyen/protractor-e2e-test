
import { browser, by, element, ElementFinder, protractor } from 'protractor';
import {ElementFinderButton} from './element-finder-button';

declare module 'protractor/built/element' {

    export interface ElementFinder {

        asButton(): ElementFinderButton;

        shouldBeHidden(): Promise<void>;
        // clickWhenClickable(): Promise<void>;

        slowTypingValue(text: string, delay?: number, hasTab?: boolean): Promise<void>
        clickWhenClickable(): Promise<void>

        waitUntilClickable(): Promise<void>;
        waitUntilPresent(timeOutInMiliseconds?: number): Promise<void>;
        scrollIntoView(): Promise<void>;

        clickDeleteCustomerOnRow(rowNumber: number): Promise<void>;
        getTotalRowOfTable(): Promise<number>;
        getAllCellOfRow(rowNumber: number): Promise<string[]>

        //#region expectation extension for ElementFinder
        shouldBeFocused(): Promise<void>;
        //#endregion expectation extension for ElementFinder
    }
}

export class ElementFinderBaseExtension {
    protected static alreadyExtended = false;

    public static extend(): any {
        if (ElementFinderBaseExtension.alreadyExtended) {
            return;
        }
        ElementFinderBaseExtension.alreadyExtended = true;
        const selfElement = ElementFinder.prototype;

        selfElement.asButton = function(): ElementFinderButton {
            return <ElementFinderButton>(this);
        };

        selfElement.shouldBeHidden = async function(): Promise<void> {
            await expect(await this.getAttribute('class')).toContain('ng-hide');
        };

        selfElement.clickWhenClickable = async function(): Promise<void> {
            await this.waitUntilClickable();
            await this.click();
        };

        selfElement.slowTypingValue = async function(text: string, delay: number = 1, hasTab: boolean = true): Promise<void> {
            await this.clear();
            for (const t of text) {
                await this.sendKeys(t);
                await browser.sleep(delay);
            }
            if (hasTab) {
                await this.sendKeys(protractor.Key.TAB);
            }
        };

        // selfElement.clickWhenClickable = async function(): Promise<void> {
        //     await this.waitUntilClickable();
        //     await this.click();
        // };

        selfElement.waitUntilClickable = async function(): Promise<void> {
            await browser.wait(protractor.ExpectedConditions.elementToBeClickable(this), 5000);
        };

        selfElement.waitUntilPresent = async function(timeOutInMiliseconds: number = 5000): Promise<void> {
            await browser.wait(protractor.ExpectedConditions.presenceOf(this), timeOutInMiliseconds);
        };

        selfElement.clickDeleteCustomerOnRow = async function(rowNumber: number): Promise<void> {
            await this.element(by.xpath('//tbody/tr[' + rowNumber + ']/td[5]/button')).click();
        };

        selfElement.getTotalRowOfTable = async function(): Promise<number> {
            return (await this.$('tbody').$$('tr')).length;
        };

        selfElement.getAllCellOfRow = async function(rowNumber: number): Promise<string[]> {
            var row = element.all(by.xpath('//tbody/tr[' + rowNumber + ']')).first();
            var cells = row.all(by.tagName('td'));
            return cells.map(function (elm) {
                return elm.getText();
            });
        };

        //#region expectation extension for ElementFinder
        selfElement.shouldBeFocused = async function(): Promise<void> {
            await expect(await this.getWebElement().getId())
                .toEqual(await browser.driver.switchTo().activeElement().getId());
        };
        //#endregion expectation extension for ElementFinder
    }
}

export * from 'protractor';
