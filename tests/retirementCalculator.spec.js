const { test, expect } = require('@playwright/test');
const readJsonData = require('../utils/readJsonData');

const RetirementCalculatorPage = require('../pages/RetirementCalculatorPage');

//User should be able to submit form with all required fields filled in
test('retirement Calculator Test @TestCase1', async ({ page ,baseURL}) => {
  const retirementCalculator = new RetirementCalculatorPage(page);
  
  // Load test data from JSON file
  const testData = readJsonData('../data/retirement_calculator_test_data.json');

  // Navigate to the page
  await retirementCalculator.navigate(baseURL);
  
  // Fill the form with test data
  if (testData) {
    await retirementCalculator.fillForm(testData);
  } else {
    console.error('Failed to load test data.');
  }

});

//validate error message for blank Age Input
test('validate error message for InputAge field@TestCase4',async({page,baseURL})=>{
const retirementCalculator = new RetirementCalculatorPage(page);
await retirementCalculator.navigate(baseURL);

let errorMessage= 'Input required';
expect(await retirementCalculator.verifyErrorCurrentAge()).toBe(errorMessage);
expect(await retirementCalculator.verifyErrorRetirementAge()).toBe(errorMessage);


});

//Additional Social Security fields should display/hide based on Social Security benefits toggle
test('social Security benefits Toggle Button @TestCase2',async({page,baseURL})=>{
  const retirementCalculator = new RetirementCalculatorPage(page);
  await retirementCalculator.navigate(baseURL);
  
 
  //To check with positive value
  const checkSocialSecurityWithPositiveValue = true;

  //To check with negative value
  if(checkSocialSecurityWithPositiveValue){
    const validateSocialSecurityToggle = await retirementCalculator.validateSocialSecurityBenefits(false);
    expect(await validateSocialSecurityToggle).toBeFalsy();    

  }
  

  if(checkSocialSecurityWithPositiveValue){
    const validateSocialSecurityToggle = await retirementCalculator.validateSocialSecurityBenefits(true);
    expect(await validateSocialSecurityToggle).toBeTruthy();    

  }
});

//User should be able to update default calculator values
test('update defaultCalculator Testvalues @TestCase3',async({page,baseURL})=>{
  const retirementCalculator = new RetirementCalculatorPage(page);


   // Load test data from JSON file
   const testData = readJsonData('../data/update_calculator_test_data.json');

   // Navigate to the page
   await retirementCalculator.navigate(baseURL);

   await retirementCalculator.updateDefaultCalculator(testData);
  expect( await retirementCalculator.updateOtherIncome(testData)).toBe('$450');
  



})



