import { LightningElement, track } from 'lwc';

export default class TrackDemoLWC extends LightningElement {

    @track fullName= {firstname:"" , lastname:""};

    handleChange(event){
        const field = event.target.name;
       // window.alert(field);

        if(field==='firstName'){
            this.fullName.firstname=event.target.value;
        }

        if(field==='lastName'){
            this.fullName.lastname=event.target.value;
        }
    }
}