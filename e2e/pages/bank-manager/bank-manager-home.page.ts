import { $, ElementFinder } from 'protractor';
import { BasePage } from '../base.page';

export class BankManagerHomePage extends BasePage {

    public readonly addCustomerButton = $('[ng-click="addCust()"]');
    public readonly openAccountButton = $('[ng-click="openAccount()"]');
    public readonly customerButton = $('[ng-click="showCust()"]');

    protected getPagePresenceMarker(): ElementFinder {
        return this.addCustomerButton;
    }
}
