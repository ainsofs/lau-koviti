// La'u Koviti tests

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
    cy.get(".q-btn--fab").as("addButton").click();
    cy.contains("Add");
    cy.contains("Save").click();
    cy.contains("Added");
    cy.get("div.filter-and-sort").as("result").contains("1 test result");

    cy.get("@addButton").click();
    cy.contains("Save").click();
    cy.contains("Added");
    cy.get("@result").contains("2 test results");

    // can edit test
    cy.get("div.q-item--clickable").as("list").first().click();
    cy.contains("Edit");
    cy.contains("Save").click();
    cy.contains("Updated");
    cy.get("@result").contains("2 test results");

    // can submit test
    cy.get("@list").first().contains("send").click();
    cy.get('input[aria-label="First name"]').focus().type("test first");
    cy.get('input[aria-label="Last name"]').focus().type("test last");
    cy.get('.btn-submit').click();
    cy.contains("Updated");
    cy.get("@result").contains("2 test results");

    // check that progress bar is displaying
    cy.get(".q-linear-progress")
      .as('progress')
      .contains("1 of 2 tests submitted");
    cy.get("@progress").should("have.class", "text-accent");
    // test results should be the same
    cy.get("@result").contains("2 test results");

    // TODO cannot delete test once submitted
    // cy.get("@list").first().contains("delete").click();
    // cy.contains("really delete?");
    // cy.get("button").contains("delete").click();
    // cy.get("@result").contains("1 test results");

    // can delete other tests
    cy.get("@list").eq(1).contains("delete").click();
    cy.contains("delete?");
    cy.get("button").contains("Delete").click();
    cy.contains("Deleted");
    cy.get("@result").contains("1 test result");

    // check progress bar is now green
    cy.get("@progress").contains("All test results sent");
    cy.get("@progress").should("have.class", "text-positive");
  });
})
