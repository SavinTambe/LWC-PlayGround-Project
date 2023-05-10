import { LightningElement,track } from 'lwc';
import fetchAllObjectList from '@salesforce/apex/sObjectController.fetchAllObjectList';

export default class ParentComponent extends LightningElement {
    @track objectList = [];
    objectName = '';    
    showButton = false;

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
        this.objectName = event.detail.value;
        this.showButton = true;     
    }
}
