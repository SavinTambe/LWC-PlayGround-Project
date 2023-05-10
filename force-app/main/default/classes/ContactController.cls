public with sharing class ContactController {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accId){
        try
        {
            return 
            [
                Select AccountId, Id, FirstName, LastName
                From Contact 
                Where AccountId=:accId
            ];
        } 
        catch (Exception e) 
        {
            throw new AuraHandledException(e.getMessage());
        }
    }
}