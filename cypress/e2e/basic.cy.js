describe('UI navigation', () => {
    it("should visit multiple pages",() => {
        cy.visit('/')

        cy.getDataTest('Cake Éclair-header').contains(/welcome to Cake Éclair/i)

        cy.visit('/about')
         cy.getDataTest('about-header').contains(/About Cake Éclair/i)

        cy.visit('/sign_in')
        cy.get('h1').contains(/Welcome, Create Your Account/i)

        

    })
 })    