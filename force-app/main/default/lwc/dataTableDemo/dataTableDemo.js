import { LightningElement, track } from 'lwc';
import getAccountList from '@salesforce/apex/dataTableDemoController.getAccountList';
import getRelatedContacts from '@salesforce/apex/dataTableDemoController.getRelatedContacts';
import { showToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    {label:'Contact Name', fieldName : 'Name'},
    {label:'Contact Email', fieldName: 'Email'},
]
export default class DataTableDemo extends LightningElement {

    @track idValue='';
    @track optionArray=[];
    @track cardVisible=false;
    @track data=[];
    @track columns=columns;

    get options(){
        return this.optionArray;
    }

    connectedCallback(){
        getAccountList()
        .then(response=>{
            let arr =[];
            for(var i=0; i<response.length;i++){
                arr.push({label:response[i].Name,value:response[i].Id})
            }
            this.optionArray=arr;
        })
    }

    handleValueChange(event){
        this.cardVisible=true;
        this.idValue=event.detail.value;

        getRelatedContacts({selectedAccId : this.idValue})
            .then(result=>{
                this.data=result;
            })
            .catch(error=>{
                window.alert("Error : "+error)
            })
    }
   
    handleSubmit(){
        this.showToast();
    }

    showToast(){
        const event = new showToastEvent({
            title :'Toast Demo',
            message : 'Contact Created Succesfully',
            variant : 'success',
        })
        this.dispatchEvent(event);
    }
}