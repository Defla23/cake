describe("users tests", () => {
    beforeEach(() => {
        
        // login as admin
        cy.loginAsUser()
       
    })


      it('display all users', () => {
            cy.visit("/user/dashboard/design")

            
            
         })
    })