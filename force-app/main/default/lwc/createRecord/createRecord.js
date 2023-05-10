import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import ACCOUNT_NUM from '@salesforce/schema/Account.AccountNumber';
import { showToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateRecord extends LightningElement {
    accountId;
    name='';
    phone='';
    accountNumber='';

    handleNameChange(event){
        this.name=event.target.value;
    }

    handlePhoneChange(event){
        this.phone=event.target.value;
    }

    handleAccountNumberChange(event){
        this.accountNumber=event.target.value;
    }

    handleCreateAccount(){

        this.showToast();
        const fields = {};
        fields[ACCOUNT_NAME.fieldApiName] = this.name;
        fields[ACCOUNT_PHONE.fieldApiName] = this.phone;
        fields[ACCOUNT_NUM.fieldApiName] = this.accountNumber;
     
        const recordInput = {apiName : ACCOUNT_OBJ.objectApiName , fields}

        createRecord(recordInput)
        .then(account =>{

            this.accountId=account.id
        })

       
    }

    // handleSubmit(){
    //     this.showToast();
    // }

    showToast(){
        const event = new showToastEvent({
            title :'Toast Demo',
            message : 'Contact Created Succesfully',
            variant : 'success',
        })
        this.dispatchEvent(event);
    }
}