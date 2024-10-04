import * as page from "../object/page.js";
import * as homepage from "../object/homepage.js";

before(() => {
  cy.config("defaultCommandTimeout", 20000);
});

describe('Sort Item', () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get(page.input_username).type('standard_user');
    cy.get(page.input_password).type('secret_sauce');
    cy.get(page.btn_login).click();
    cy.get(homepage.app_logo).should('be.visible');
  });


  it('Sort Item by Name - Desc', () => {
    cy.get(homepage.dropdown_sort).select('Name (Z to A)')
    cy.get(homepage.txt_itemName).then($elements => {
      // Convert to array and get text
      const strings = [...$elements].map(el => el.innerText); 
      // Sort and reverse for Z to A
      const sortedStrings = [...strings].sort().reverse(); 
      // Deep equal for array comparison
      cy.wrap(strings).should('deep.equal', sortedStrings); 
    });
  });

  it('Sort Item by Name - Asc', () => {
    cy.get(homepage.dropdown_sort).select('Name (A to Z)')
    cy.get(homepage.txt_itemName).then($elements => {
      // Convert to array and get text
      const strings = [...$elements].map(el => el.innerText); 
      // Sort A to Z
      const sortedStrings = [...strings].sort(); 
      // Deep equal for array comparison
      cy.wrap(strings).should('deep.equal', sortedStrings); 
    });
  });
  
  it('Sort Item by Price - Low to High', () => {
    cy.get(homepage.dropdown_sort).select('Price (low to high)')
    cy.get(homepage.txt_itemPrice).then($elements => {
        // Extract text, remove the dollar sign, and convert to numbers
        const prices = [...$elements].map(el => parseFloat(el.innerText.replace('$', '')));
        // Sort low to high
        const sortedPrices = [...prices].sort((a, b) => a - b); 
        // Deep equal for array comparison
        cy.wrap(prices).should('deep.equal', sortedPrices); 
      });
    });

  it('Sort Item by Price - High to Low', () => {
    cy.get(homepage.dropdown_sort).select('Price (high to low)')
    cy.get(homepage.txt_itemPrice).then($elements => {
        // Extract text, remove the dollar sign, and convert to numbers
        const prices = [...$elements].map(el => parseFloat(el.innerText.replace('$', '')));
        // Sort high to low
        const sortedPrices = [...prices].sort((a, b) => b - a); 
        // Deep equal for array comparison
        cy.wrap(prices).should('deep.equal', sortedPrices); 
      });
    });


});
