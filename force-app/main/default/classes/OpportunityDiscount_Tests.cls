@isTest
private class OpportunityDiscount_Tests {
  @isTest
  static void test_positive_low_priority() {
    AccountWrapper mockAccountWrapper = (AccountWrapper) Test.createStub(AccountWrapper.class, new AccountWrapperMock());
    OpportunityDiscount od = new OpportunityDiscount(mockAccountWrapper);
    Decimal result;
    Test.startTest();
      result = od.getTotalDiscount();
    Test.stopTest();
    System.assertEquals(.1, result, 'expected to get .1');
  }
  @isTest
  static void test_positive_high_priority() {
    AccountWrapperMock.isHighPriorityReturn = true;
    AccountWrapper mockAccountWrapper = (AccountWrapper) Test.createStub(AccountWrapper.class, new AccountWrapperMock());
    OpportunityDiscount od = new OpportunityDiscount(mockAccountWrapper);
    Decimal result;
    Test.startTest();
      result = od.getTotalDiscount();
    Test.stopTest();
    System.assertEquals(.25, result, 'expected to get .25');
  }
}