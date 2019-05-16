import { $, element, by, ElementFinder } from 'protractor';
import { BasePage } from '../base.page';
import { CustomerRowItem } from '../../dto/customer.row-item';
import * as _ from "lodash";

export class CustomerManagerPage extends BasePage {

    public readonly customerTable = $('table');
    public readonly searchCustomerTextBox = element(by.model('searchCustomer'));


    public async deleteCustomer(customerRowItem :CustomerRowItem): Promise<void> {
        const rowNumber = await this.getCustomerRowNumber(customerRowItem);
        await this.customerTable.clickDeleteCustomerOnRow(rowNumber);
    }

    public async getCustomerRowNumber(customerRowItem :CustomerRowItem): Promise<number> {
        const totalRow = await this.customerTable.getTotalRowOfTable();
        if (totalRow <= 0) {
            return -1;
        }
        for(let i = 1; i<= totalRow; i++) {
            let actualRow = await this.mapCustomerRowItem(i);
            if (_.isMatch(customerRowItem, actualRow)) {
                return i;
            }
        }
        return -1;
    }

    public async mapCustomerRowItem(rowNumber: number): Promise<CustomerRowItem> {
        const rowValue = await this.customerTable.getAllCellOfRow(rowNumber);
        return {
            firstName: rowValue[0],
            lastName: rowValue[1],
            postCode: rowValue[2],
            accountNumber: rowValue[3],
        }
    }

    protected getPagePresenceMarker(): ElementFinder {
        return this.customerTable;
    }
}
