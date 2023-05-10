// import { LightningElement, api, wire, track } from 'lwc';
// import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// import getInterestList from '@salesforce/apex/leadDetailsController.getInterestList';
// import EMAIL_FIELD from '@salesforce/schema/Lead.Email';
// import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
// import LEAD_SOURCE_FIELD from '@salesforce/schema/Lead.LeadSource';
// import DESCRIPTION_FIELD from '@salesforce/schema/Lead.Description';

// const columns = [
//     {label:'Interest Name',fieldName:'Name'},
//     {label:'Description',fieldName:'Description__c'}
// ]

// export default class LeadDetails extends LightningElement {
//     @api recordId;
//     @track columns=columns;
    

//     @wire(getRecord, { recordId: '$recordId', fields: [EMAIL_FIELD, COMPANY_FIELD, LEAD_SOURCE_FIELD, DESCRIPTION_FIELD] })
//     lead;

//     get email() {
//         return getFieldValue(this.lead.data, EMAIL_FIELD);
//     }

//     get company() {
//         return getFieldValue(this.lead.data, COMPANY_FIELD);
//     }

//     get leadSource() {
//         return getFieldValue(this.lead.data, LEAD_SOURCE_FIELD);
//     }

//     get description() {
//         return getFieldValue(this.lead.data, DESCRIPTION_FIELD);
//     }

//     @wire(getInterestList)interestData;

//     handleButtonClick() {
//         const event = new ShowToastEvent({
//             title: 'Success',
//             message: 'Interest assigned to Lead',
//             variant: 'success',
//         });
//         this.dispatchEvent(event);
//     }
// }


import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getInterestList from '@salesforce/apex/leadDetailsController.getInterestList';
import assignInterestToLead from '@salesforce/apex/leadDetailsController.assignInterestToLead';
import EMAIL_FIELD from '@salesforce/schema/Lead.Email';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import LEAD_SOURCE_FIELD from '@salesforce/schema/Lead.LeadSource';
import DESCRIPTION_FIELD from '@salesforce/schema/Lead.Description';

const columns = [
    { label: 'Interest Name', fieldName: 'Name' },
    { label: 'Description', fieldName: 'Description__c' }
];

export default class LeadDetails extends LightningElement {
    @api recordId;
    @track columns = columns;
    @track interests;
    @track filteredInterests;
    @track selectedInterestId = null;

    @wire(getRecord, { recordId: '$recordId', fields: [EMAIL_FIELD, COMPANY_FIELD, LEAD_SOURCE_FIELD, DESCRIPTION_FIELD] })
    lead;

    @wire(getInterestList)
    wiredInterests({ error, data }) {
        if (data) {
            this.interests = data;
            this.filteredInterests = data;
        } else if (error) {
            console.error('Error fetching interest records:', error);
        }
    }

    get email() {
        return getFieldValue(this.lead.data, EMAIL_FIELD);
    }

    get company() {
        return getFieldValue(this.lead.data, COMPANY_FIELD);
    }

    get leadSource() {
        return getFieldValue(this.lead.data, LEAD_SOURCE_FIELD);
    }

    get description() {
        return getFieldValue(this.lead.data, DESCRIPTION_FIELD);
    }

    handleSearchChange(event) {
        const searchKey = event.target.value.toLowerCase();
        this.filteredInterests = this.interests.filter(
            (interest) =>
                interest.Name.toLowerCase().includes(searchKey) ||
                interest.Description__c.toLowerCase().includes(searchKey)
        );
    }

    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        if (selectedRows.length > 0) {
            this.selectedInterestId = selectedRows[0].Id;
        } else {
            this.selectedInterestId = null;
        }
    }

    handleButtonClick() {
        if (this.selectedInterestId) {
        assignInterestToLead({ leadId: this.recordId, interestId: this.selectedInterestId })
            .then(() => {
                const event = new ShowToastEvent({
                    title: 'Success',
                    message: 'Interest assigned to Lead',
                    variant: 'success',
                });
                this.dispatchEvent(event);
            })
            .catch((error) => {
                console.error('Error assigning interest to Lead:', error);
                const errEvent = new ShowToastEvent({
                    title: 'Error',
                    message: 'Lead already has interest assigned !',
                    variant: 'Error',
                });
                this.dispatchEvent(errEvent);
            });
        }

    }
}
