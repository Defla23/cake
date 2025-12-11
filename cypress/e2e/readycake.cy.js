describe("readycake tests", () => {
    beforeEach(() => {
        
        // login as admin
        cy.loginAsAdmin()
       
    })


      it('should create a cake via the UI', () => {
            cy.visit("/admin/dashboard/readycakes")

             const readycake = `Cypress E2E Test cake ${Date.now()}`
             cy.getDataTest('cakecreate-btn').click()
              
         })
    })