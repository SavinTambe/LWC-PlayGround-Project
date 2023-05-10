public with sharing class imperativeDemoController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        
        List<Account> accountList = [Select Id, Name, Phone from Account];

        return accountList;
    }
}