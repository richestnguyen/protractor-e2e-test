import { $, by, ElementFinder } from 'protractor';
import { BasePage } from '../base.page';

export class AccountDetailPage extends BasePage {

    public readonly accountNumberSelect = $('#accountSelect');
    public readonly transactionsButton = $('[ng-click=\"transactions()\"]');
    public readonly depositButton = $('[ng-click=\"deposit()\"]');
    public readonly withdrawlButton = $('[ng-click=\"withdrawl()\"]');

    public async selectAcount(account: string) {
        await this.accountNumberSelect.element(by.cssContainingText('option', account)).click();
    }

    protected getPagePresenceMarker(): ElementFinder {
        return this.accountNumberSelect;
    }
}
