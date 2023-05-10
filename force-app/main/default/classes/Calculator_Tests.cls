@isTest
public class Calculator_Tests {

    @testSetup
    public static void testSetupData(){
     
    }
    
    @isTest
    static void testAddition(){
        Integer a=10;
        Integer b=2;
        //Integer add=a+b;
        test.startTest();
        Calculator.addition(a, b);
        test.stopTest();
        System.assertEquals(12,Calculator.addition(a, b));
    }
    
    @isTest
    static void testSubstraction(){
        Integer a=10;
        Integer b=2;
        //Integer sub=a-b;
        test.startTest();
        Calculator.subtraction(a, b);
        test.stopTest();
        System.assertEquals(8,  Calculator.subtraction(a, b));
    }
    
    @isTest
    static void testMultiplication(){
        Integer a=0;
        Integer b=2;
        try{
            Calculator.multiply(a, b);
        	}
        catch(Calculator.CalculatorException e){
            System.assertEquals(true,e.getMessage().contains('It doesn\'t make sense to multiply by zero'));
        	}
        
        a=1;
        b=2;
         try{
            Calculator.multiply(a, b);
        	}
        catch(Calculator.CalculatorException e){
            System.assertEquals('It doesn\'t make sense to multiply by zero',e.getMessage(),'Caught right exception');
           // found=true;
        	}
    }
    
    @isTest
    static void testDivision(){
        Integer a=2;
        Integer b=0;
        boolean found=false;
        try{
            Calculator.divide(a, b);
        	}
        catch(Calculator.CalculatorException e){
            System.assertEquals('you still can\'t divide by zero',e.getMessage(),'Caught right exception');
            found=true;
        	}
        System.assert(found, 'Threw expected exception');
        
        a=2;
        b=-1;
       
        try{
            Calculator.divide(a, b);
        	}
        catch(Calculator.CalculatorException e){
            System.assertEquals('Division returned a negative value.'+Calculator.divide(a, b),e.getMessage(),'Caught right exception');
            found=true;
        	}
     
        
         a=2;
         b=1;
        test.startTest();
         Calculator.divide(a, b);
      
        test.stopTest();
          System.assertEquals(2,Calculator.divide(a, b));
       
    }
    
}