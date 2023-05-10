import { LightningElement, api, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import fetchAllObjectList from '@salesforce/apex/sObjectController.fetchAllObjectList';
import fetchAllFieldsForSelectedObject from '@salesforce/apex/sObjectController.fetchAllFieldsForSelectedObject';
import fetchAllRecordsOfSelectedObject from '@salesforce/apex/sObjectController.fetchAllRecordsOfSelectedObject';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MasterComponent extends NavigationMixin(LightningElement) {
    @track lstFields = [];
    @track objectList = [];
    @api objectName = '';    
        
    arrayToSend = [];
    allRecordsOfSelectedObject = [];
    arrayToSend = [];
    columnsMap=[];
    tempName=[];

    actions = 
    [
        { label: 'Edit', name: 'edit' },
        { label: 'View', name: 'view' },
        { label: 'Delete', name: 'delete' },
    ];

    connectedCallback() { 
        fetchAllObjectList()
        .then((result) => {
            if (result) {
                this.objectList = [];
                for (let key in result ) {
                    this.objectList.push({ label: key, value: key });
                }
            } else {
                console.log('Objects are not found')
            }
        }).catch((error) => {
            console.log('Objects are not found')
        });
    }

    onObjectChange(event) { 
        this.lstFields = [];
        this.allRecordsOfSelectedObject = [];
        this.columnsMap=[];
        this.lab=[];
        this.val=[];
        this.arrayToSend=[];
        this.objectName = event.detail.value;
        this.showButton = true
        this.getFieldsOnObjectChange();      
    }

    getFieldsOnObjectChange(){
		fetchAllFieldsForSelectedObject({ strObjectName: this.objectName })
		.then(result => {
			this.lstFields = [];
            for (let key in result) {
                this.lstFields.push({ label: key, value: key,type:'action' });
            }
		})
		.catch(error => {
			console.log('All fields are not fetched');
		})
	}

    handleCheckBoxClick(event) {
        this.arrayToSend=[];
        for(let index in event.detail.value) {
            this.arrayToSend.push(event.detail.value[index])
        }
    } 
    
    handleShowData(event) { 
        this.createCols();
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (!row) {
            return;
        }
    
        switch (actionName) {

            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: this.objectName,
                        actionName: 'edit'
                    }
                });
            break;
    
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: this.objectName,
                        actionName: 'view'
                    }
                });
            break;

            case 'delete':
                const recordId = row.Id;
                deleteRecord(recordId)
                .then(() => {
                    const index = this.allRecordsOfSelectedObject.findIndex(record => record.Id === recordId);
                    this.allRecordsOfSelectedObject.splice(index, 1);

                    const toastEvent = new ShowToastEvent({
                        title: 'Success!',
                        message: 'Record has been deleted.',
                        variant: 'success'
                    });
                    this.dispatchEvent(toastEvent);
                })
                .catch(error => {
                    console.log(error);
                });
            break;

            default:
            break;
        }
    }

    handleCreateRecord(){
        this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
        objectApiName: this.objectName,
        actionName: 'new'
        }     
    }); 
}

    @wire(fetchAllRecordsOfSelectedObject, { strObjectName: "$objectName" })
    wiredObjectRecords({ data, error }) {
        if (data) {
            let tempRecs = [];
            data.forEach((record) => {
            let tempRec = Object.assign({}, record);
            tempRec.tempName = "/" + tempRec.Id;
            tempRecs.push(tempRec);
            console.log(tempRec);
        });
            this.allRecordsOfSelectedObject = tempRecs;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.allRecordsOfSelectedObject = undefined;
        }
    }

    createCols(){
        const selectedFields=this.arrayToSend;
        this.columnsMap = [
            ...selectedFields.map(fieldName => ({
              label: fieldName,
              fieldName: fieldName==='Name'?'tempName':fieldName,
              type: fieldName === 'Name'?'url':'text',
              typeAttributes: {
                label: {
                    fieldName: 'Name',
                    target: '_blank'
                },
                target: fieldName === "Name" ? "_blank" : null,
            },
            })),
            {
            type: 'action',
            typeAttributes: {
                target: '_blank',
                rowActions: this.actions }
            }];
    }
}