
import { $, browser, by, element, ElementFinder, protractor } from 'protractor';

declare module 'protractor/built/element' {

  export interface ElementFinder {
    slowTypingValue(text: string, waitingTimeInMillisecond?: number): Promise<void>;
    setTextBoxValue(textBoxValue: string, hasTab?: boolean): Promise<void>;
    scrollIntoView(): Promise<void>;
    waitUntilPresent(timeOutInMiliseconds?: number): Promise<void>;
    scrollIntoViewThenClick(): Promise<void>;
    clickWhenClickable(timeOutInMiliseconds?: number): Promise<void>;

    //#region expectation extension for ElementFinder
    shouldBeFocused(): Promise<void>;
    //#endregion expectation extension for ElementFinder
  }
}

export class ElementFinderExtension {
  protected static alreadyExtended = false;

  public static extend(): any {
    if (ElementFinderExtension.alreadyExtended) {
      return;
    }
    ElementFinderExtension.alreadyExtended = true;

    const selfElement = ElementFinder.prototype;

    selfElement.slowTypingValue = async function(text: string, waitingTimeInMillisecond: number = 5): Promise<void> {
      const realTextBox = await this.findRealTextBox();
      await realTextBox.clear();
      await realTextBox.click();
      for (const letter of text) {
        await realTextBox.sendKeys(letter);
        await browser.sleep(waitingTimeInMillisecond);
      }
    };

    selfElement.setTextBoxValue = async function(textBoxValue: string, hasTab: boolean = true): Promise<void> {
      const realTextBox = await this.findRealTextBox();
      await realTextBox.clear();
      await realTextBox.click();
      await realTextBox.sendKeys(textBoxValue);
      if (hasTab) {
        await realTextBox.sendKeys(protractor.Key.TAB);
      }
    };

    selfElement.scrollIntoView = async function(): Promise<void> {
      await browser.executeScript("arguments[0].scrollIntoView(true);", this);
    };


    selfElement.waitUntilPresent = async function(timeOutInMiliseconds: number = 5000): Promise<void> {
      await browser.waitForAngular();
      await browser.wait(protractor.ExpectedConditions.presenceOf(this), timeOutInMiliseconds);
    };

    selfElement.scrollIntoViewThenClick = async function(): Promise<void> {
      await this.scrollIntoView();
      await this.click();
    };

    selfElement.clickWhenClickable = async function(timeOutInMiliseconds: number = 5000): Promise<void> {
      await browser.wait(protractor.ExpectedConditions.elementToBeClickable(this), timeOutInMiliseconds);
      await this.click();
    };

    //#region expectation extension for ElementFinder
    selfElement.shouldBeFocused = async function(): Promise<void> {
      let expectedFocusedElement = this;
      if ((await this.getTagName()).endsWith('-input')) {
        expectedFocusedElement = await this.findRealTextBox();
      }
      await expect(await expectedFocusedElement.getWebElement().getId())
        .toEqual(await browser.driver.switchTo().activeElement().getId());
    };
    //#endregion expectation extension for ElementFinder
  }
}

export * from 'protractor';
