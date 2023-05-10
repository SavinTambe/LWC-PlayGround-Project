import { LightningElement, wire } from 'lwc';
import { getObjectInfos } from 'lightning/uiObjectInfoApi';

export default class MyComponent extends LightningElement {
    @wire(getObjectInfos)
    objectInfos;

    get objectNames() {
        if (this.objectInfos.data) {
            // Extract the sObject names from the response data
            return Object.keys(this.objectInfos.data).sort();
        }
        return [];
    }
}
