it('acessa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html') //acessando a página da política de privacidade
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible') //verificando se o título da página é o esperado   
    cy.contains('p', 'Talking About Testing').should('be.visible') //verificando uma tag p de paragrafo para validar que o conteúdo carregou corretamente
})
