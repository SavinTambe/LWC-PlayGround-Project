import { LightningElement, api } from 'lwc';

export default class DemoLWC extends LightningElement {
    name= 'Savin';
    company='Enzigma Solutions LLP';
    designation='Jr. Software Developer';
    salary='$400000';

    @api recordId;
}