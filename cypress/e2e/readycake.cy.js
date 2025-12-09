describe("readycake tests", () => {
    beforeEach(() => {
        
        // login as admin
        cy.loginAsAdmin()
       
    })


      it('should create a todo via the UI', () => {
            cy.visit("/admin/dashboard/readycakes")
            
         })
    })