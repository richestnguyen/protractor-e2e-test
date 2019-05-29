import {ElementFinder} from "protractor";

export class ElementFinderButton extends ElementFinder{


    async clickWhenClickable(): Promise<void> {
        await this.waitUntilClickable();
        await this.click();
    }
}
