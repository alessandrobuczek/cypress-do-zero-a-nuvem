const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'd6a5gp', //ID do projeto no Cypress Dashboard
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
 // video: true //gravar vídeos dos testes, ligar somente quenaod or usar este recurso
})
