import {BasePage} from "../pages/base.page";
import {HomePage} from "../pages/home.page";
import {LoginPage} from "../pages/login.page";
import {UserNameEnum} from '../enums/user-name-enum';
import {AccountDetailPage} from '../pages/account-detail.page';
import {browser} from "protractor";

describe('angularjs homepage', () => {
    it('should greet the named user', async () => {
        await BasePage.navigateToHome();
        const homePage = await BasePage.preparePage(HomePage);
        await homePage.customerLoginButton.click();
        const loginPage = await BasePage.preparePage(LoginPage);
        await loginPage.loginAs(UserNameEnum.HARRY_POTTER);
        const accountDetailPage = await BasePage.preparePage(AccountDetailPage);
        await accountDetailPage.selectAcount('1005');
        await browser.pause();
    });
});
