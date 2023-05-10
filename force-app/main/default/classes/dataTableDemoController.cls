public with sharing class dataTableDemoController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        List<Account> accountList = [Select Id, Name from Account];

        return accountList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContacts(String selectedAccId){
        List<Contact> contactList = [Select Id, Name, Email, AccountId from Contact where AccountId=:selectedAccId];

        return contactList;
    }
}