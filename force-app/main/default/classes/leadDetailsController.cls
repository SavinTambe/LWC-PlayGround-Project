public with sharing class leadDetailsController {

    @AuraEnabled(cacheable=true)
    public static List<Interest__c> getInterestList(){
        List<Interest__c> interestList = [Select Id, Name , Description__c from Interest__c];

        return interestList;
    }

    @AuraEnabled
    public static void assignInterestToLead(Id leadId, Id interestId) {
        try {
            // Replace with your logic to assign interest to the lead
            Lead leadRecord = [SELECT Id FROM Lead WHERE Id = :leadId];
            if (leadRecord != null) {
                if(leadRecord.Interest__c==null){
                    leadRecord.Interest__c = interestId;
                    update leadRecord;
                }
                else{
                    throw new AuraHandledException('Lead already has interest assigned !');
                }
            }
            
        } catch (Exception ex) {
            throw new AuraHandledException('Error assigning interest to Lead: ' + ex.getMessage());
        }
    }
}