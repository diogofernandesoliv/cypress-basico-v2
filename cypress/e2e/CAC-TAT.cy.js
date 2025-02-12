/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  beforeEach(() => {
    cy.visit('./src/index.html');
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Quero aprender tudo sobre Cypress!', 10);

    cy.get('#firstName').type('Diogo');
    cy.get('#lastName').type('Fernandes de Oliveira');
    cy.get('#email').type('diogofernandesqa@gmail.com');
    cy.get('#open-text-area').type(longText, {delay: 0});
    cy.contains('button', 'Enviar').click();

    cy.get('.success').should('be.visible');
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('Quero aprender tudo sobre Cypress!', 10);

    cy.get('#firstName').type('Diogo');
    cy.get('#lastName').type('Fernandes de Oliveira');
    cy.get('#email').type('diogofernandesqa@gmail,com');
    cy.get('#open-text-area').type(longText, {delay: 0});
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  })

  it('campo telefone continua vazio quando preenchido com um valorn não numérico', () => {
    cy.get('#phone')
    .type('abcde')
    .should('have.value', '');
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = Cypress._.repeat('Quero aprender tudo sobre Cypress!', 10);

    cy.get('#firstName').type('Diogo');
    cy.get('#lastName').type('Fernandes de Oliveira');
    cy.get('#email').type('diogofernandesqa@gmail.com');
    cy.get('#open-text-area').type(longText, {delay: 0});
    cy.get('#phone-checkbox').click();
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    const longText = Cypress._.repeat('Quero aprender tudo sobre Cypress!', 10);

    cy.get('#firstName')
      .type('Diogo')
      .should('have.value', "Diogo")
      .clear()
      .should('have.value', '');
    cy.get('#lastName')
      .type('Fernandes de Oliveira')
      .should('have.value', "Fernandes de Oliveira")
      .clear()
      .should('have.value', '');
    cy.get('#email')
      .type('diogofernandesqa@gmail.com')
      .should('have.value', "diogofernandesqa@gmail.com")
      .clear()
      .should('have.value', '');
    cy.get('#open-text-area')
      .type(longText, {delay: 0})
      .should('have.value', longText)
      .clear()
      .should('have.value', '');
    cy.get('#phone')
      .type('31986782444')
      .should('have.value', '31986782444')
      .clear()
      .should('have.value', '');
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Diogo',
      lastName: 'Fernandes de Oliveira',
      email: 'diogofernandesqa@gmail.com',
      text: 'Teste.'
    }

    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success').should('be.visible');
  })

  it('envia o formuário com sucesso usando um comando customizado sem passar dados', () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success').should('be.visible');
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube');
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria');
  })
  
  it.only('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog');
  })
})