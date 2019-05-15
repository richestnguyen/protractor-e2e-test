import { $, element, by, ElementFinder } from 'protractor';
import { BasePage } from './base.page';
import { UserNameEnum } from '../enums/user-name-enum';

export class LoginPage extends BasePage {

    public readonly yourNameSelect = $('.form-group #userSelect');
    public readonly loginButton = element(by.cssContainingText('form button', 'Login'));

    public async loginAs(name: UserNameEnum) {
        await this.yourNameSelect.element(by.cssContainingText('option', name)).click();
        await this.loginButton.click();
    }

    protected getPagePresenceMarker(): ElementFinder {
        return this.yourNameSelect;
    }
}
