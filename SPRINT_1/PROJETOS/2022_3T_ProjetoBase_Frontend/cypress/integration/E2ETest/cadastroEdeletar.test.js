describe('Cadastrar E Excluir - Equipamento', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Deve logar e cadastrar um novo equipamento e logo excluir ele', () => {
        cy.get('.cabecalhoPrincipal-nav-login').should('exist')
        cy.get('.cabecalhoPrincipal-nav-login').click()

        cy.get('.input__login').first().type('paulo@email.com')
        cy.get('.input__login').last().type('123456789')
        cy.get('.btn__login').click()

        cy.get('#nomePatrimonio').type('Garrafa')

        cy.get('input[type=file]').first().selectFile('src/assets/tests/equipamentoOCR.jpeg')
        cy.wait(5000)
        //cy.get('#codigoPatrimonio').should('have.value','1202529')
        cy.get('#codigoPatrimonio').type('1202529')
        
        cy.get('input[type=file]').last().selectFile('src/assets/tests/garrafa.jpg')
        
        
        cy.wait(3000)
        cy.get('#cadastrar').click()
        

        cy.wait(3000)
         cy.get('.card div h4').last().should('have.text','Garrafa').get('.card .excluir').last().click();
    })
})  