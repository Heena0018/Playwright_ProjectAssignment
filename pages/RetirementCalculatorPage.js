const BasePage = require('./BasePage');

class RetirementCalculatorPage extends BasePage {
  constructor(page) {
    super(page);
    this.currentAgeInput = this.page.getByLabel('What is your current age?');
    this.retirementAgeInput = this.page.getByLabel('At what age do you plan to');
    this.currentAnnualIncomeInput = this.page.getByLabel('What is your current annual');
    this.spouseAnnualIncomeInput = this.page.getByLabel('What is your spouse\'s annual');
    this.currentSavingsInput = this.page.getByLabel('What is your current retirement savings balance?');
    this.annualContributionInput = this.page.getByLabel('How much are you currently');
    this.rateOfIncreaseInput = this.page.getByLabel('What is the rate of increase');
    this.includeSocialSecurityYesButton = this.page.getByLabel('Should we include Social').getByText('Yes');
    this.maritalQuestion = this.page.locator('#marital-status-label')
    this.marriedButton = this.page.getByText('Married');
    this.singleButton = this.page.getByText('Single');
    this.includeSocialSecurityNoButton = this.page.getByLabel('Should we include Social').getByText('No');
    this.socialSecurityOverrideInput = this.page.getByLabel('Social Security override');
    this.adjustDefaultsButton = this.page.getByRole('button', { name: 'Adjust default values' });
    this.otherIncomeInput = this.page.getByLabel('What other income will you');
    this.yearsPlanInput = this.page.getByLabel('How many years do you plan to');
    this.postRetirementIncomeYesButton = this.page.getByLabel('Does your post-retirement').getByText('Yes');
    this.expectedIncomeInput = this.page.getByLabel('If yes, what is the expected');
    this.finalAnnualIncomeInput = this.page.getByLabel('How much of your final annual');
    this.preRetirementInvestmentInput = this.page.getByLabel('Pre-retirement investment');
    this.postRetirementInvestmentInput = this.page.getByLabel('Post-retirement investment');
    this.saveChangesButton = this.page.getByRole('button', { name: 'Save changes' });
    this.calculateButton = this.page.getByRole('button', { name: 'Calculate' });
    this.emailResultsButton = this.page.getByRole('button', { name: 'Email my results' });
    this.emailTextbox = this.page.getByRole('textbox', { name: 'Your email address' });
    this.sendEmailButton = this.page.getByRole('button', { name: 'Send email' });
    this.captchaFrame = this.page.frameLocator('iframe[name="c-1lldf9jxa76m"]');
    this.captchaTiles = this.captchaFrame.locator('.rc-imageselect-tile');
    this.captchaVerifyButton = this.captchaFrame.getByRole('button', { name: 'Verify' });

    this.currentAgeInputError= this.page.locator('#invalid-current-age-error');
    this.retirementAgeInputError= this.page.locator('#invalid-retirement-age-error')
  }
  

  async fillForm(data) {
    await this.currentAgeInput.fill(data.currentAge.toString());
    await this.retirementAgeInput.fill(data.retirementAge.toString());
    await this.currentAnnualIncomeInput.fill(data.currentAnnualIncome.toString());
    await this.spouseAnnualIncomeInput.fill(data.spouseAnnualIncome.toString());
    await this.currentSavingsInput.fill(data.currentRetirementSavings.toString());
    await this.annualContributionInput.fill(data.currentRetirementContribution.toString());
    await this.rateOfIncreaseInput.fill(data.annualRetirementContributionIncrease.toString());

    if (data.socialSecurityIncome === "Yes") {
      await this.includeSocialSecurityYesButton.click();
      // await this.socialSecurityIncomeYes.check();
    }
    // await this.includeSocialSecurityYesButton.click();

    if (data.relationshipStatus === "Married") {
      await this.marriedButton.click();
    }
    
    await this.socialSecurityOverrideInput.fill(data.socialSecurityOverride.toString());
    await this.adjustDefaultsButton.click();
    await this.otherIncomeInput.fill(data.additionalOtherIncome.toString());
    
    await this.yearsPlanInput.fill(data.yearsRetirementNeedsToLast.toString());
    
    if (data.postRetirementIncomeIncreaseWithInflation === "Yes") {
      await this.postRetirementIncomeYesButton.click();
    }
    
    await this.expectedIncomeInput.fill(data.percentFinalAnnualIncomeDesired);
  
    await this.finalAnnualIncomeInput.fill(data.percentFinalAnnualIncomeDesired)
    await this.preRetirementInvestmentInput.fill(data.preRetirementInvestmentReturn);
    await this.postRetirementInvestmentInput.fill(data.postRetirementInvestmentReturn);

 
    await this.saveChangesButton.click();
    await this.calculateButton.click();
  }

  async verifyErrorCurrentAge() {
    try {
      await this.currentAgeInput.fill("");
      await this.calculateButton.click();
      return await this.currentAgeInputError.textContent();

    } catch (error) {
      console.error("Error during input clearing or button click:", error);
    }
  

  }

  async verifyErrorRetirementAge() {
    try {
      await this.currentAgeInput.fill("");
      await this.retirementAgeInput.fill("");
      await this.calculateButton.click();
      return await this.retirementAgeInputError.textContent();

    } catch (error) {
      console.error("Error during input clearing or button click:", error);
    }
  

  }

  async validateSocialSecurityBenefits(socialSecurityValue){
    if (socialSecurityValue) {

      await this.includeSocialSecurityYesButton.click();
      
    }   
    else {

      await this.includeSocialSecurityNoButton.click();

    }

     let isMaritalQuestionVisible = await this.maritalQuestion.isVisible();
     console.log(isMaritalQuestionVisible)
    let isMarriedButtonVisible = await this.marriedButton.isVisible();
    console.log(isMarriedButtonVisible)

    let isSigleButtonVisible = await this.singleButton.isVisible();
    console.log(isSigleButtonVisible)

    let isSocialSecurityOverrideVisible = await this.socialSecurityOverrideInput.isVisible();
    console.log(isSocialSecurityOverrideVisible)

    if( isMarriedButtonVisible && isSigleButtonVisible && isSocialSecurityOverrideVisible){
      return true;
    }
    else{
      return false;
    }

  }


async updateDefaultCalculator(data){

  await this.adjustDefaultsButton.click();
  await this.otherIncomeInput.fill(data.additionalOtherIncome.toString());
  await this.yearsPlanInput.fill(data.yearsRetirementNeedsToLast.toString());
  
  if (data.postRetirementIncomeIncreaseWithInflation === "Yes") {
    await this.postRetirementIncomeYesButton.click();
    await this.expectedIncomeInput.fill(data.expectedInflationRate);
    await this.finalAnnualIncomeInput.fill(data.percentFinalAnnualIncomeDesired)
    await this.preRetirementInvestmentInput.fill(data.preRetirementInvestmentReturn);
    await this.postRetirementInvestmentInput.fill(data.postRetirementInvestmentReturn);
    await this.saveChangesButton.click();
  }

  else{
    await this.finalAnnualIncomeInput.fill(data.percentFinalAnnualIncomeDesired)
    await this.preRetirementInvestmentInput.fill(data.preRetirementInvestmentReturn);
    await this.postRetirementInvestmentInput.fill(data.postRetirementInvestmentReturn);
    await this.saveChangesButton.click();
  }

}


  
  

  async sendEmail(email) {
    await this.emailResultsButton.click();
    await this.emailTextbox.fill(email);
    await this.sendEmailButton.click();
  }

  async solveCaptcha() {
    await this.captchaTiles.first().click();
    await this.captchaVerifyButton.click();
  }
}

module.exports = RetirementCalculatorPage;
