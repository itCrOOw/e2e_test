Feature: Shopping
    As a user
    I want to be able to add products to my cart
    So that I can complete a purchase

    Scenario: Complete purchase flow
        Given I am logged in with valid credentials
        When I add the product "Sauce Labs Backpack" to the cart
        And I add the product "Sauce Labs Bike Light" to the cart
        And I view the cart
        And I should have "2" items in the cart
        And I should the following items on the cart:
            | Item                  | Price |
            | Sauce Labs Bike Light | 9.99  |
            | Sauce Labs Backpack   | 29.99 |
        And I proceed to checkout
        And I fill out the checkout form with the details:
            | First Name | Last Name | Postal Code |
            | John       | Doe       | 12345       |
        And I should see the correct payment, shipping, and total information:
            | Payment Information | Shipping Information        | Item total | Tax  | Total |
            | SauceCard #31337    | Free Pony Express Delivery! | 39.98      | 3.20 | 43.18 |
        And I complete the purchase
        Then I should see the confirmation message "Thank you for your order!"