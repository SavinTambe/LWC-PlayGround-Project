import { LightningElement, track } from 'lwc';
import getAccountList from '@salesforce/apex/imperativeDemoController.getAccountList';

const columnsHeading = [
    {label : 'Account Record Id' , fieldName : 'Id'},
    {label : 'Account Name' , fieldName : 'Name'},
    {label : 'Phone' , fieldName : 'Phone'},
]
export default class ImperativeDemo extends LightningElement {

    @track columns = columnsHeading;
    @track data =[];

    connectedCallback(){

        getAccountList()
        .then(result =>{
            this.data=result;
        })

        .catch(error =>{
            console.error("Error Occured");
        })
    }
}