describe("signup tests", () => {
    beforeEach(() => {
        cy.visit('/sign_in')
        //cy.viewport(1280, 920)
    })
    it("should register with valid credentials", () =>{

    cy.getDataTest('sign_in-header').contains(/Welcome, Create Your Account/i)
    cy.intercept('POST','/users', {
        statusCode:201,
        body:{
            message:'succesfull',
            user:{
            userid: '29',
            name:'testsample',
            email:'testsample12@gmail.com',
            phone:'0720202002',
            address:'nyeri',
            role:'cusomer',

            }
        }
    }).as('signup')
        cy.getDataTest('sign_in-name').as('NameInput')
        cy.get('@NameInput')
            .type('testsample')

        cy.getDataTest('sign_in-email').as('emailInput')
        cy.get('@emailInput')
            .should('have.attr', 'type', 'email')
            .type('testsample12@gmail.com')

        cy.getDataTest('sign_in-phone').as('phoneInput')
        cy.get('@phoneInput')
            .should('have.attr', 'type', 'text')
            .type('0720202002')

        cy.getDataTest('sign_in-address').as('addressInput')
        cy.get('@addressInput')
            .should('have.attr', 'type', 'text')
            .type('nyeri')

        cy.getDataTest('sign_in-password').as('passwordInput')
        cy.get('@passwordInput')
            .should('have.attr', 'type', 'password')
            .type('mypass123');

        cy.getDataTest('sign_in-confirmpassword').as('confirmPasswordInput')
        cy.get('@confirmPasswordInput')
            .should('have.attr', 'type', 'password')
            .type('mypass123');

        cy.getDataTest('sign_in-submitbtn').as('submitButton')
        cy.get('@submitButton')
            .should('contain.text', 'Register')
            .should('not.be.disabled')
            .click()

    })
 })