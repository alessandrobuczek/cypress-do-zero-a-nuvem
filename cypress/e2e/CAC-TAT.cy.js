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
  //cy.get('button[type="submit"]').click()
  
  //**COMANDO CONTAINS*/
  //uysing o comando cy.contains() para selecionar o botão pelo texto
  //Usado quando não se quer usar o seletor css ou não se tem um seletor css específico
  //Substitui o comando cy.get('button[type="submit"]').click() que foi comentado acima
  cy.contains('button', 'Enviar').click()

  //verificação do resultado esperado
  //seletor css . é uma classe
  cy.get('.success').should('be.visible')
  })


it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

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
  cy.get('[for="phone-checkbox"]').check
  cy.get('button[type="submit"]').click()

  //verificação do resultado esperado
  //deve apresentar a mensagem de erro porque o campo telefone não foi preenchido e é obrigatório
  cy.get('.error').should('be.visible')
})


//** COMMANDO CLEAR*/ 
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


//** cy.fillMandatoryFieldsAndSubmit()  - Trabalhando com variáveis
it('envia o formulário com sucesso usando um comando customizado', () => {
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


//**COMANDO SELECT  */
//comando select para selecionar um produto de campo como lista
//conseguimos selecionar um valor do campo por texto, valor e índice
it('seleciona um produto (YouTube) por seu texto', () => {
  
  cy.get('#product').select('YouTube').should('have.value', 'youtube') 
    //teste de seleção pelo value
    //verificando se o valor selecionado é youtube, o texto em minusculo é o value do option no html e o texto maiusculo é o que aparece na tela

})

it('seleciona um produto (Mentoria) por seu valor', () => {
  
  cy.get('#product').select('mentoria').should('have.value', 'mentoria')  
  //teste de seleção pelo valor do texto
  //verificando se o valor selecionado é mentoria, o texto em minusculo é o value do option no html e o texto maiusculo é o que aparece na tela
})

it('seleciona um produto (Blog) por seu índice', () => {
  
  //teste de seleção pelo índice
  cy.get('#product').select(1).should('have.value', 'blog')  
  //teste de seleção pelo índice
  //verificando se o valor selecionado é blog, o texto em minusculo é o value do option no html e o texto maiusculo é o que aparece na tela 

  })

  //** COMANDO CHECK PARA RADIO BUTTON */
  it('marca o tipo de atendimento "Feedback"', () => {
    //comando radio button
    //aqui estamos utilizando um seletor css que identifica melhor o radio button pelo atributo value


    cy.get('input[type="radio"][value="feedback"]').check().should('have.checked')
    //verificação do resultado esperado para validar se o radio button está marcado
  })

  //** COMANDO WRAP E EACH */
  it('marca cada tipo de atendimento', () => {
    //comando radio button
    //aqui estamos utilizando o comando each para percorrer todos os radio buttons
    cy.get('input[type="radio"]').each((TypeOfService) => {
      cy.wrap(TypeOfService).check() //checando cada radio button
      cy.wrap(TypeOfService).should('be.checked') //verificando se cada radio button está marcado
    })


  })

  //** COMANDO LAST */
  //comando last para selecionar o último elemento da lista de checkboxes

  it('marca e desmarca o checkbox "Receber novidades por e-mail"', () => {
    //comando checkbox

    //Marcar todos os checkboxes com um seletor mais genérico
    //validação se todos os checkboxes estão marcados com o should
    //selecionando todos os checkboxes menos o último e desmarcando o último usando o comando last
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked') 

    //para marcar e desmarcar o checkbox individualmente
    /*cy.get('#email-checkbox').check() //marcando o checkbox e verificando se está marcado
    cy.get('#phone-checkbox').check() //desmarcando o checkbox e verificando se está desmarcado*/

  })

 //** COMANDO SELECTFILE */
 //Realizando upload de arquivos com o comando selectFile
it('faz upload de um arquivo usando o comando selectFile', () => {

  cy.get('#file-upload')
  .selectFile('cypress/fixtures/example.json')
//.should(input => {console.log(input[0].files[0])}) //comando para validar e   exibir no console da aplicação o arquivo selecionado
.should(input => {expect(input[0].files[0].name).to.equal('example.json')
 }) 
  //teste de verificação do resultado esperado
  //verificando se o arquivo selecionado é o example.json no console do html da página 

})


//** COMANDO SELECTFILE */
 //com opção de drag-and-drop simulado onde o usuário arrasta e solta o arquivo na área de upload
it('faz upload de um arquivo simulando um drag-and-drop', () => {

  cy.get('#file-upload')//seletor css do campo de upload
  .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) //alterando a ação padrão de upload para drag-and-drop
  .should(input => {expect(input[0].files[0].name).to.equal('example.json')
 })

})


//** COMANDO fixture */
 //comando fixture para carregar um arquivo de fixture e dar um alias para ele

it('faz upload de um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

  cy.fixture('example.json').as('sampleFile') //criando um alias para a fixture example.json  

cy.get('#file-upload')
  .selectFile('@sampleFile') //chamando o alias pelo alias criado acima
  
//.should(input => {console.log(input[0].files[0])}) //comando para validar e   exibir no console da aplicação o arquivo selecionado
.should(input => {expect(input[0].files[0].name).to.equal('example.json')
 }) 

})



 //** COMANDO invoke  com remoção do target para a pagina abrir na mesma aba */

 //comando invoke para acessar um elemento que está oculto na página e exibi-lo
 //em html um target _blank indica que o link abre em outra aba
 /*por exemplo: </div>
        <button type="submit" class="button">Enviar</button>
        <div id="privacy">
          <a href="privacy.html" target="_blank">Política de Privacidade</a>
        </div>*/

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  //cy.get('#privacy a').should('have.attr', 'target', '_blank') //verificando se o link tem o atributo target com o valor _blank que indica que abre em outra aba
//cy.get('a') --seletor muito genérico, por isso é recomendavel usar o comando contains para selecionar pelo texto
cy.contains('a', 'Política de Privacidade') //usamos a tag genérica mais buscamos o seletor pelo texto
.should('have.attr', 'href', 'privacy.html') //verificando se o link tem o atributo target com o valor _blank que indica que abre em outra aba
//usando and com should para fazer mais de uma verificação no mesmo comando
.and('have.attr', 'target', '_blank') //verificando se o link tem o atributo target com o valor _blank que indica que abre em outra aba
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    //removendo o atributo target para abrir na mesma aba
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target') //removendo o atributo target para abrir na mesma aba
    .click() //clicando no link
    //verificando se a página carregou corretamente e contento o título esperado
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible') //verificando se o título da página é o esperado
  })


  //**CONFIGURAÇÃO DE RESOLUÇÃO DE TELA PARA TESTES MOBILE
  //ALTERADO O ARQUIVO PACKAGE.JSON PARA INCLUIR UM NOVO SCRIPT
  //"cy:open:mobile": "cypress open --config viewportWidth=410,viewportHeight=860",



})




