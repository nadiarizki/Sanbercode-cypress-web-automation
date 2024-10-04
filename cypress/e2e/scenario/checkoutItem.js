import * as page from "../object/page.js";
import * as homepage from "../object/homepage.js";
import * as cartpage from "../object/cartpage.js";
import * as checkoutpage from "../object/checkoutpage.js";


before(() => {
  cy.config("defaultCommandTimeout", 20000);
});

describe('Sauce Demo', () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get(page.input_username).type('standard_user');
    cy.get(page.input_password).type('secret_sauce');
    cy.get(page.btn_login).click();
    cy.get(homepage.app_logo).should('be.visible');
  });

  it('Success Checkout Order', () => {
    cy.get(homepage.btn_addToCart).click();
    cy.get(homepage.btn_shoppingCart).click();
    cy.get(cartpage.btn_checkout).click();
    cy.get(checkoutpage.input_firstName).type('Nadia');
    cy.get(checkoutpage.input_lastName).type('Dwijaatmaja');
    cy.get(checkoutpage.input_postCode).type('12410');
    cy.get(checkoutpage.btn_continue).click();
    cy.get(checkoutpage.btn_finish).click();
    cy.get(checkoutpage.txt_title).contains('Checkout: Complete!')
    cy.get(checkoutpage.txt_Header).contains('Thank you for your order!')
  });

  it('Sort Item Name - Desc', () => {
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
  
});
