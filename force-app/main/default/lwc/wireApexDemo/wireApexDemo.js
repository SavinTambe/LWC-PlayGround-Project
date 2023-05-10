import { LightningElement, api, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { getRecord } from 'lightning/uiRecordApi';
import Account_Name from '@salesforce/schema/Account.Name';

export default class WireApexDemo extends LightningElement {

    @api recordId;

    @wire(getRecord, {recordId:'$recordId', fields:Account_Name })
    record;
    
    @wire(getContacts, {accId:'$recordId'})
    contacts;

    get name(){
        return this.record.data.fields.Name.value;
    }
}