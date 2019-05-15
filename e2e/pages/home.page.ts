import { element, by, ElementFinder } from 'protractor';
import {BasePage} from "./base.page";

export class HomePage extends BasePage {

    public readonly customerLoginButton =
        element(by.cssContainingText('.borderM button', 'Customer Login')).asButton();
    public readonly bankManagerLoginButton =
        element(by.cssContainingText('.borderM button', 'Bank Manager Login'));

    protected getPagePresenceMarker(): ElementFinder {
        return this.customerLoginButton;
    }
}
