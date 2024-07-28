const { test, expect } = require('@playwright/test');
const readJsonData = require('../utils/readJsonData');

const RetirementCalculatorPage = require('../pages/RetirementCalculatorPage');

test('retirement Calculator Test', async ({ page ,baseURL}) => {
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

 

  // Send the email
  //await retirementCalculator.sendEmail('test@example.com');

  // Solve the captcha
  //await retirementCalculator.solveCaptcha();
});

//validate error message for blank Age Input
test('validate error message for InputAge field',async({page,baseURL})=>{
const retirementCalculator = new RetirementCalculatorPage(page);
await retirementCalculator.navigate(baseURL);

let errorMessage= 'Input required';
expect(await retirementCalculator.verifyErrorCurrentAge()).toBe(errorMessage);
expect(await retirementCalculator.verifyErrorRetirementAge()).toBe(errorMessage);


});

//validate Social security toggle button- 'Yes' and 'No'
test('social Security benefits Toggle Button',async({page,baseURL})=>{
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

//update default calculator
test('update defaultCalculator Testvalues',async({page,baseURL})=>{
  const retirementCalculator = new RetirementCalculatorPage(page);


   // Load test data from JSON file
   const testData = readJsonData('../data/update_calculator_test_data.json');

   // Navigate to the page
   await retirementCalculator.navigate(baseURL);

   await retirementCalculator.updateDefaultCalculator(testData)


})


