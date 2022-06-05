/// <reference types="cypress" />
// Use `cy.dataCy` custom command for more robust tests
// See https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements

// ** This file is an example of how to write Cypress tests, you can safely delete it **

// This test will pass when run against a clean Quasar project
describe('Landing', () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it(".should() - assert that <title> is correct", () => {
    cy.title().should("include", "La'u Koviti");
  });

  // tests
  // shows correct date
  // it("Shows correct date", () => {
  //   cy.get("div.text-subtitle1").should('include', 'Sunday 5 June, 2022');
  // })

  // does not show tests
  // it("does not show tests", () => {
  //   cy.get("main.q-page").should("not", "1 test result");
  // });

  // appears not signed in
  // can add test x2
  it("can add test", () => {
    cy.get(".q-btn--fab")
      .as('addButton')
      .click();
    cy.contains("Save")
      .click();
    cy.get("div.q-notification__message")
      .as('notify')
      .contains("Added");
    cy.get('div.filter-and-sort')
      .as('result')
      .contains("1 test result");

    cy.get('@addButton').click();
    cy.contains("Save").click();
    cy.get("@notify").contains("Added");
    cy.get('@result').contains("2 test results");
    cy.wait(5000);

  });
  // can edit test
  // can submit test
  // cannot delete test once submitted
})

// ** The following code is an example to show you how to write some tests for your home page **
//
// describe('Home page tests', () => {
//   beforeEach(() => {
//     cy.visit('/')
//   })
//   it('has pretty background', () => {
//     cy.dataCy('landing-wrapper')
//       .should('have.css', 'background').and('match', /(".+(\/img\/background).+\.png)/)
//   })
//   it('has pretty logo', () => {
//     cy.dataCy('landing-wrapper img')
//       .should('have.class', 'logo-main')
//       .and('have.attr', 'src')
//       .and('match', /^(data:image\/svg\+xml).+/)
//   })
//   it('has very important information', () => {
//     cy.dataCy('instruction-wrapper')
//       .should('contain', 'SETUP INSTRUCTIONS')
//       .and('contain', 'Configure Authentication')
//       .and('contain', 'Database Configuration and CRUD operations')
//       .and('contain', 'Continuous Integration & Continuous Deployment CI/CD')
//   })
// })
