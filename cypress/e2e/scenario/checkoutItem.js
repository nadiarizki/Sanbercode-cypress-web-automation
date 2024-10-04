import * as page from "../object/page.js";
import * as homepage from "../object/homepage.js";
import * as cartpage from "../object/cartpage.js";
import * as checkoutpage from "../object/checkoutpage.js";


before(() => {
  cy.config("defaultCommandTimeout", 20000);
});

describe('Checkout Item', () => {
  beforeEach(() => {
    cy.visit(Cypress.env("baseUrl"));
    cy.get(page.input_username).type('standard_user');
    cy.get(page.input_password).type('secret_sauce');
    cy.get(page.btn_login).click();
    cy.get(homepage.app_logo).should('be.visible');
  });

  it('Success Checkout Item', () => {
    cy.get(homepage.btn_addToCart).click();
    cy.get(homepage.btn_shoppingCart).click();
    cy.get(checkoutpage.txt_title).contains('Your Cart')
    cy.get(checkoutpage.txt_itemName).should('be.visible')
    cy.get(cartpage.btn_checkout).click();
    cy.get(checkoutpage.txt_title).contains('Checkout: Your Information')
    cy.get(checkoutpage.input_firstName).type('Nadia');
    cy.get(checkoutpage.input_lastName).type('Dwijaatmaja');
    cy.get(checkoutpage.input_postCode).type('12410');
    cy.get(checkoutpage.btn_continue).click();
    cy.get(checkoutpage.txt_title).contains('Checkout: Overview')
    cy.get(checkoutpage.txt_itemName).should('be.visible')
    cy.get(checkoutpage.txt_paymentInfo).should('be.visible')
    cy.get(checkoutpage.txt_shippingInfo).should('be.visible')
    cy.get(checkoutpage.txt_subTotalInfo).should('be.visible')
    cy.get(checkoutpage.txt_taxInfo).should('be.visible')
    cy.get(checkoutpage.txt_totalInfo).should('be.visible')
    cy.get(checkoutpage.btn_finish).click();
    cy.get(checkoutpage.txt_title).contains('Checkout: Complete!')
    cy.get(checkoutpage.txt_Header).contains('Thank you for your order!')
  });

  it('Failed Checkout Item - Empty First Name', () => {
    cy.get(homepage.btn_addToCart).click();
    cy.get(homepage.btn_shoppingCart).click();
    cy.get(checkoutpage.txt_title).contains('Your Cart')
    cy.get(checkoutpage.txt_itemName).should('be.visible')
    cy.get(cartpage.btn_checkout).click();
    cy.get(checkoutpage.txt_title).contains('Checkout: Your Information')
    cy.get(checkoutpage.btn_continue).click();
    cy.get(page.txt_error).contains('Error: First Name is required')
  });

  it('Failed Checkout Item - Empty Last Name', () => {
    cy.get(homepage.btn_addToCart).click();
    cy.get(homepage.btn_shoppingCart).click();
    cy.get(checkoutpage.txt_title).contains('Your Cart')
    cy.get(checkoutpage.txt_itemName).should('be.visible')
    cy.get(cartpage.btn_checkout).click();
    cy.get(checkoutpage.txt_title).contains('Checkout: Your Information')
    cy.get(checkoutpage.input_firstName).type('Nadia');
    cy.get(checkoutpage.btn_continue).click();
    cy.get(page.txt_error).contains('Error: Last Name is required')
  });

  it('Failed Checkout Item - Postal Code', () => {
    cy.get(homepage.btn_addToCart).click();
    cy.get(homepage.btn_shoppingCart).click();
    cy.get(checkoutpage.txt_title).contains('Your Cart')
    cy.get(checkoutpage.txt_itemName).should('be.visible')
    cy.get(cartpage.btn_checkout).click();
    cy.get(checkoutpage.txt_title).contains('Checkout: Your Information')
    cy.get(checkoutpage.input_firstName).type('Nadia');
    cy.get(checkoutpage.input_lastName).type('Dwijaatmaja');
    cy.get(checkoutpage.btn_continue).click();
    cy.get(page.txt_error).contains('Error: Postal Code is required')
  });
  
});
