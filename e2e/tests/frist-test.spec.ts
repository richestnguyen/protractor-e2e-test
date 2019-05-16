import {BasePage} from "../pages/base.page";
import {HomePage} from "../pages/home.page";
import {LoginPage} from "../pages/login.page";
import {UserNameEnum} from '../enums/user-name-enum';
import {AccountDetailPage} from '../pages/customer/account-detail.page';
import {browser} from "protractor";
import {BankManagerHomePage} from '../pages/bank-manager/bank-manager-home.page';
import {CustomerManagerPage} from '../pages/bank-manager/customer-manager.page';

describe('First test', () => {
    beforeEach(async () => {
        await BasePage.navigateToHome();
    });

    it('should ?', async () => {
        const homePage = await BasePage.preparePage(HomePage);
        await homePage.customerLoginButton.click();
        const loginPage = await BasePage.preparePage(LoginPage);
        await loginPage.loginAs(UserNameEnum.HARRY_POTTER);
        const accountDetailPage = await BasePage.preparePage(AccountDetailPage);
        await accountDetailPage.selectAcount('1005');
        await browser.pause();
    });

    it('delete Customer', async () => {
        const homePage = await BasePage.preparePage(HomePage);
        await homePage.bankManagerLoginButton.click();
        const bankManagerHomePage = await BasePage.preparePage(BankManagerHomePage);
        await bankManagerHomePage.customerButton.clickWhenClickable();
        const customerManagerPage = await BasePage.preparePage(CustomerManagerPage);
        await customerManagerPage.deleteCustomer({
            firstName: 'Ron',
            lastName: 'Weasly',
            postCode: 'E55555',
            accountNumber: '1007 1008 1009'
        });
        await expect(await await customerManagerPage.customerTable.getTotalRowOfTable()).toEqual(4);
    });
});
