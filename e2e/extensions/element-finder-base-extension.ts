
import { $, browser, by, element, ElementFinder, protractor } from 'protractor';
import {ElementFinderButton} from './element-finder-button';

declare module 'protractor/built/element' {

    export interface ElementFinder {
        asButton(): ElementFinderButton;
        // asTextBox(): ElementFinderButtonExtension;
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
            return <ElementFinderButton>this;
        };
    }
}

export * from 'protractor';
