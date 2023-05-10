import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, track } from 'lwc';
import fetchAllObjectList from '@salesforce/apex/sObjectController.fetchAllObjectList';
import fetchAllFieldsForSelectedObject from '@salesforce/apex/sObjectController.fetchAllFieldsForSelectedObject';
import fetchAllRecordsOfSelectedObject from '@salesforce/apex/sObjectController.fetchAllRecordsOfSelectedObject';

export default class ChildComponent extends NavigationMixin(LightningElement) {
  @track columns = [];
  @track data = [];
  @track objectName;
  @track allRecordsOfSelectedObject = [];

  // handle checkbox click event
  handleCheckBoxClick(event) {
    const fieldsSelected = event.detail.value;
    this.columns = this.getColumnsMap(fieldsSelected);
  }

  // get columns map
  getColumnsMap(fieldsSelected) {
    return fieldsSelected.map(field => ({
      label: field,
      fieldName: field,
      type: 'url',
      typeAttributes: {
        label: { fieldName: 'Name' },
        target: '_blank',
      },
      cellAttributes: {
        class: { fieldName: 'cellClass' },
      },
    }));
  }

  // handle show data button click event
  handleShowData() {
    fetchAllRecordsOfSelectedObject({ strObjectName: this.objectName })
      .then(result => {
        this.allRecordsOfSelectedObject = result;
        this.data = this.prepareDataForTable(this.allRecordsOfSelectedObject);
      })
      .catch(error => {
        console.log('error while getting records ', error);
      });
  }

  // prepare data for the table
  prepareDataForTable(records) {
    return records.map(record => {
      const row = {};
      Object.keys(record).forEach(field => {
        row[field] = record[field];
      });
      row['Id'] = `/${row['Id']}/e`;
      row['cellClass'] = '';
      return row;
    });
  }

  // handle row action event
  handleRowAction(event) {
    const row = event.detail.row;
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId: row.Id,
        objectApiName: this.objectName,
        actionName: 'edit',
      },
    });
  }
  
}
