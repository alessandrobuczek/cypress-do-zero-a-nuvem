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


it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

  cy.get('#firstName').type('Alessandro')
  cy.get('#lastName').type('Buczek')
  cy.get('#email').type('abuczek@gmail,com') //email com formatação inválida
  cy.get('#open-text-area').type('teste')
  cy.get('button[type="submit"]').click()

  cy.get('.error').should('be.visible') // verificação do resultado esperado
})

// verificação do resultado esperado
it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
cy.get('#phone').type('abcdefghij').should('have.value', '')  // tentando preencher com letras
})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  //teste para verificar se a mensagem de erro é exibida quando o telefone é marcado como obrigatório mas não é preenchido
  cy.get('#firstName').type('Alessandro')
  cy.get('#lastName').type('Buczek')
  cy.get('#email').type('abuczek@gmail,com') //email com formatação inválida porque foi digitado com vírgula
  cy.get('#open-text-area').type('teste')
  cy.get('[for="phone-checkbox"]')
  cy.get('button[type="submit"]').click()

  //verificação do resultado esperado
  //deve apresentar a mensagem de erro porque o telefone é obrigatório
  cy.get('.error').should('be.visible')
})

it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
//comando clear para limpar os campos
//preenchendo validdando se foi preenchido corretamente e limpando os campos validando se estão vazios
//usando os comandos type, should e clear

  cy.get('#firstName').type('Alessandro').should('have.value', 'Alessandro').clear().should('have.value', '')
  cy.get('#lastName').type('Buczek').should('have.value', 'Buczek').clear().should('have.value', '')
  cy.get('#email').type('abuczek@gmail.com').should('have.value', 'abuczek@gmail.com').clear().should('have.value', '')

})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
  //não preenchendo nenhum campo e clicando em enviar
cy.get('button[type="submit"]').click()
//verificação do resultado esperado aparentando a mensagem de erro
cy.get('.error').should('be.visible')
})

it.only('envia o formulário com sucesso usando um comando customizado', () => {
//usando o comando customizado criado em cypress/support/commands.js 
//função para não repetir o código de preenchimento dos campos obrigatórios
//criando uma variável para passar os dados para o comando customizado

  const data = {
    firstName: 'Alessandro',
    lastName: 'Buczek',
    email: 'abuczek@gmail.com',
    Text: 'Teste de comando customizado com variáve'
  }

cy.fillMandatoryFieldsAndSubmit(data)//usando a variável data para preencher os campos
//cy.fillMandatoryFieldsAndSubmit() //usando os valores padrão definidos no comando customizado do arquivo commands.js
//verificação do resultado esperado
cy.get('.success').should('be.visible')
  

})

})

