/// <reference types="cypress" />

describe('testes', () => {

    before(() => {
        cy.visit("https://wj-qa-automation-test.github.io/qa-test/");
    });

    const getIframeDocument = () => {
        return cy
        .get('iframe[src="buttons.html"]')
        .its('0.contentDocument')
    }
      
    const getIframeBody = () => {
        return getIframeDocument()
        .its('body')
        .then(cy.wrap)
    }

    it('Validando os botões', () => {
        cy.get('div[id="panel_size_one"]')
          .get('button#btn_one')
          .click()
        cy.get('div[id="panel_size_one"]')
          .get('button#btn_two')
          .click()
        cy.get('div[id="panel_size_one"]')
          .get('button#btn_three')
          .click()

        cy.get('div[id="panel_size_one"]')
          .contains('button#btn_one')
          .should('not.exist')
        cy.get('div[id="panel_size_one"]')
          .contains('button#btn_two')
          .should('not.exist')
        cy.get('div[id="panel_size_one"]')
          .contains('button#btn_three')
          .should('not.exist')  
    });

    it('Validando os botões no iframe', () => {
        getIframeBody().find('#btn_one').click()
        getIframeBody().find('#btn_two').click()
        getIframeBody().find('#btn_three').click()

        getIframeBody().contains('#btn_one').should('not.exist')
        getIframeBody().contains('#btn_two').should('not.exist')
        getIframeBody().contains('#btn_three').should('not.exist')

    });  

    it('Validando campos e imagens', () => {
        cy.get('input#first_name').type('Primeiro nome')
        
        cy.get('button#reset_buttons').click()
        cy.get('div[id="panel_size_one"]')
          .get('button#btn_one')
          .click()

        cy.get('input#opt_three').check()

        cy.get('select#select_box').select('ExampleTwo', {force : true})

        cy.get('div[id="panel_size_three"]')
          .find('img[src*="https://i.imgur.com/1vsaEJB.jpg"]') 
          .click()
    });
});