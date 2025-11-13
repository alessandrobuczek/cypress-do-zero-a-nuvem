Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data ={
firstName: 'João', 
lastName: 'Silva', 
email: 'joao.silva@example.com', 
Text: 'Texto com valores padrão'
}) => {

  cy.get('#firstName').type(data.firstName)
  cy.get('#lastName').type(data.lastName)
  cy.get('#email').type(data.email) 
  cy.get('#open-text-area').type(data.Text)
  cy.get('button[type="submit"]').click()

})