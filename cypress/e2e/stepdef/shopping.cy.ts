import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

Given('I am logged in with valid credentials', () => {
    cy.visit('/');
    cy.get('[data-test="username"]')
        .type(Cypress.env('testUser')
            .userEmail);
    cy.get('[data-test="password"]')
        .type(Cypress.env('testUser')
            .userPassword);
    cy.get('[data-test="login-button"]')
        .click();
});

When('I add the product {string} to the cart', (productName: string) => {
    cy.contains('[class="inventory_item_label"]', productName)
        .should('contain', productName).siblings('.pricebar')
        .find('.btn_primary')
        .click();
});

When('I view the cart', () => {
    cy.get('[class="shopping_cart_container"]')
        .click();
});


Then('I should have "{int}" items in the cart', (numberOfItems: number) => {
    cy.get('[class="shopping_cart_link"]')
        .should('contain', numberOfItems)
    cy.get('[class="inventory_item_name"]')
        .should('have.length', numberOfItems);
})

Then('I should the following items on the cart:', (dataTable: DataTable) => {
    const expectedItems = dataTable.hashes();

    expectedItems.forEach(expectedItem => {
    cy.get('[class="cart_item"]')
        .contains(expectedItem.Item)
        .parents('[class="cart_item"]')
        .find('[class="inventory_item_price"]')
        .then(priceElement => {
        const actualPrice = parseFloat(priceElement.text().substring(1));
        expect(actualPrice).to.equal(parseFloat(expectedItem.Price));
        });
    }); 
})

When('I proceed to checkout', () => {
    cy.get('[id="checkout"').click();    
});

When('I fill out the checkout form with the details:', (dataTable: DataTable) => {
    const data = dataTable.hashes()[0];
    cy.get('[id="first-name"]').type(data['First Name']);
    cy.get('[id="last-name"]').type(data['Last Name']);
    cy.get('[id="postal-code"]').type(data['Postal Code']);
    cy.get('[id="continue"]').click();
});

Then("I should see the correct payment, shipping, and total information:", (dataTable: DataTable) => {
    const checkoutInfo = dataTable.hashes()[0];

    cy.get("[class='summary_value_label']")
        .should("contain", checkoutInfo['Payment Information']);

    cy.get("[class='summary_value_label']")
        .should("contain", checkoutInfo['Shipping Information']);

    cy.get(".summary_subtotal_label")
        .should("contain", checkoutInfo['Item total']);

    cy.get(".summary_tax_label")
        .should("contain", checkoutInfo['Tax']);

    cy.get(".summary_total_label")
        .should("contain", checkoutInfo['Total']);
});

When('I complete the purchase', () => {
    cy.get('[id="finish"]').click();
});

Then('I should see the confirmation message {string}', (message: string) => {
    cy.contains(message);
});