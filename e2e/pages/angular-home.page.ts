import {browser, element, by} from 'protractor';

export class AngularHomepage {
    public readonly nameInput = element(by.model('yourName'));
    public readonly greeting = element(by.binding('yourName'));

    get() {
        browser.get('http://www.angularjs.org');
    }

    setName(name: string) {
        this.nameInput.sendKeys(name);
    }

}
