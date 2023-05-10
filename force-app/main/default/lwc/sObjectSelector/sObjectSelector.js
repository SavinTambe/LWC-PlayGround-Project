import { LightningElement, wire, track } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getRecord } from 'lightning/uiRecordApi';
import { showToast } from 'lightning/platformShowToastEvent';

export default class SObjectSelector extends LightningElement {
    @track sObjects = [];
    @track fields = [];
    @track records = [];
    @track columns = [];
    selectedSObject = '';
    selectedField = '';
    recordId = '';
    objectApiName = '';
    recordTypeId = '';

    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    wiredObjectInfo({ error, data }) {
        if (data) {
            this.columns = data.fields.map((field) => {
                return { label: field.label, fieldName: field.apiName };
            });
        } else if (error) {
            showToast('Error', error.body.message, 'error', this);
        }
    }

    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: '$selectedField' })
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.records = [];
            this.records.push({ fields: { [this.selectedField]: 'Select a value...' } });
            data.values.forEach((value) => {
                this.records.push({ fields: { [this.selectedField]: value.label } });
            });
        } else if (error) {
            showToast('Error', error.body.message, 'error', this);
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: '$fields' })
    wiredRecord({ error, data }) {
        if (data) {
            this.records = [data];
        } else if (error) {
            showToast('Error', error.body.message, 'error', this);
        }
    }

    @wire(getObjectInfo)
    wiredObjectInfos({ error, data }) {
        if (data) {
            this.sObjects = data.map((objectInfo) => {
                return { label: objectInfo.labelPlural, value: objectInfo.apiName };
            });
        } else if (error) {
            showToast('Error', error.body.message, 'error', this);
        }
    }

    handleSObjectChange(event) {
        this.selectedSObject = event.detail.value;
        this.fields = [];
        this.records = [];
        this.columns = [];
        this.selectedField = '';
    
        // Get the object info for the selected sObject
        getObjectInfos ({ objectApiName: this.selectedSObject })
            .then((objectInfo) => {
                this.objectApiName = this.selectedSObject;
                this.recordTypeId = objectInfo.defaultRecordTypeId;
    
                // Get the fields for the selected sObject
                objectInfo.fields.forEach((field) => {
                    if (!field.deprecatedAndHidden && !field.custom) {
                        this.fields.push({ label: field.label, value: field.apiName });
                    }
                });
            })
            .catch((error) => {
                showToast('Error', error.body.message, 'error', this);
            });
    }
}    
