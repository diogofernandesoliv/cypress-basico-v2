/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(() => {
    cy.visit('./src/index.html');
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  })

  it.only('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Diogo');
    cy.get('#lastName').type('Fernandes de Oliveira');
    cy.get('#email').type('diogofernandesq@gmail.com');
    cy.get('#open-text-area').type('Quero aprender tudo sobre Cypress');
    cy.get('button[type="submit"]').click();

    cy.get('.success').should('be.visible');
  })
})