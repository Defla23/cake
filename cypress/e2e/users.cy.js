describe("users tests", () => {
    beforeEach(() => {
        
        // login as admin
        cy.loginAsAdmin()
       
    })


      it('display all users', () => {
            cy.visit("/admin/dashboard/users")

            
            
         })
    })