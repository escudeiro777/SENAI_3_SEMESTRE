describe('Componente - Rodape', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it('Deve existiruma tag Footeer no corpo do documento', () => {
        cy.get('footer').should('exist')
    })

    it('Deve conter o texto da Escola SENAI', () => {
        cy.get('footer section div p').should('have.text', 'Escola SENAI de Informática - 2021')
    })
    it('Deve verificar se a tag footer está visivel e se possui uma classe chamada rodapé', () => {
cy.get('footer').should('be.visible').and('have.class','rodapePrincipal')
    })
})