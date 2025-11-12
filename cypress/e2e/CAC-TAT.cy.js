describe('Central de Atendimento ao Cliente TAT', () => {
  //comando beforeEach para ser executado antes de cada teste
  beforeEach(() => {
    cy.visit('./src/index.html')

  })
//Comando only para executar apenas o teste selecionado
//comando get para selecionar elementos na página
//comando type para digitar nos campos selecionados
//comando click para clicar no botão de enviar
//command cy.get('.success').should('be.visible') para verificar se a mensagem de sucesso está visível
  it('verifica o título da aplicação', () => {
     //verificação do resultado esperado
    cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
  })


  //comando de ação do teste
   //seletor css # é um id
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Teste para encrever um texto mais longo e definir a repitição, no caso aqui 10x', 10)
  
    cy.get('#firstName').type('Alessandro')
  cy.get('#lastName').type('Buczek')
  cy.get('#email').type('abuczek@gmail.com')
  //cy.get('#open-text-area').type('Obrigado')
  cy.get('#open-text-area').type(longText, { delay: 0 }) //executando a variável longtext, removendo o delay padrão do cypress')
  cy.get('button[type="submit"]').click()

  //verificação do resultado esperado
  //seletor css . é uma classe
  cy.get('.success').should('be.visible')
  })


it.only  ('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

  cy.get('#firstName').type('Alessandro')
  cy.get('#lastName').type('Buczek')
  cy.get('#email').type('abuczek@gmail,com') //email com formatação inválida
  cy.get('#open-text-area').type('teste')
  cy.get('button[type="submit"]').click()

  cy.get('.error').should('be.visible') // verificação do resultado esperado
})

})


