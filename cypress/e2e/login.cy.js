describe("login functionility", () => {

    beforeEach(() => {
        cy.visit('/login')
        //cy.viewport(1280, 920)
        })

        it("should login with valid credentials", () =>{
           // cy.contains('Login').should('be.visible')
         cy.getDataTest('login-header').contains(/Welcome back/i)
         cy.getDataTest("login-email-input").as("login-emailInput")

          cy.get("@login-emailInput")
            .should("be.visible")
            .should('have.attr', 'type', 'email')
            .type('defla31@gmail.com')

            cy.getDataTest('login-password-input').as('login-passwordInput')

            cy.get('@login-passwordInput')
            .should('be.visible')
            .should('have.attr', 'type', 'password')
            .type('123456')

            cy.getDataTest('login-submit-button').as('login-submitButton')
            cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .should('not.be.disabled')
            .click()

            cy.contains(/Login successful/i).should('be.visible')
            cy.url().should("include", '/admin/dashboard/analytics')

        })
         it("should not login with invalid credentials", () =>{
             cy.contains(/Welcome back/i).should('be.visible')

        // Get the email input
        cy.getDataTest('login-email-input').as('login-emailInput')
        cy.get('@login-emailInput')
            .type('defla31@gmail.com')

        // Get the password input
        cy.getDataTest('login-password-input').as('login-passwordInput')
        cy.get('@login-passwordInput')
            .type('wrongpassword123')

        // Submit the form
        cy.getDataTest('login-submit-button').as('login-submitButton')
        cy.get('@login-submitButton')
            .should('contain.text', 'Login')
            .click()

        // Assert that the error message is displayed
        cy.contains(/Invalid credentials./i).should('be.visible')

         })
       
    
     })
