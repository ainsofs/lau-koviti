// La'u Koviti tests

describe('Landing', () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("show correct app name", () => {
    cy.title().should("include", "La'u Koviti");
  });

  // tests
  // TODO shows correct date
  // it("Shows correct date", () => {
  //   cy.get('header').contains('Sunday 5 June, 2022');
  // })

  it("do not show test results if none", () => {
    cy.get("main").should("not.contain", "1 test result", { matchCase: false });
  });

  // TODO appears not signed in

  // can add test x2
  it("can add/edit/submit/delete tests", () => {
    cy.get(".q-btn--fab").as("addButton").click();
    cy.contains("Add");
    cy.contains("Save").click();
    cy.contains("added");
    cy.get("div.filter-and-sort").as("result").contains("1 test result", { matchCase: false });

    cy.get("@addButton").click();
    cy.contains("Save").click();
    cy.contains("added");
    cy.get("@result").contains("2 test results", { matchCase: false });

    // can edit test
    cy.get("div.q-item--clickable").as("list").first().click();
    cy.contains("Edit");
    cy.contains("Save").click();
    cy.contains("updated");
    cy.get("@result").contains("2 test results", { matchCase: false });

    // can submit test
    cy.get("@list").first().contains("send").click();
    cy.get('input[aria-label="First name"]').focus().type("test first");
    cy.get('input[aria-label="Last name"]').focus().type("test last");
    cy.get(".btn-submit").click();
    cy.contains("updated");
    cy.get("@result").contains("2 test results", { matchCase: false });

    // cannot edit test after submission
    cy.get("div.q-item--clickable").as("list").first().click();
    cy.get('input[aria-label="Date of the test"]').should("have.attr", 'disabled');
    cy.get("body").type("{esc}");

    // check that progress bar is displaying
    cy.get(".q-linear-progress")
      .as("progress")
      .contains("1 of 2");
    cy.get("@progress").should("have.class", "text-accent");
    // test results should be the same
    cy.get("@result").contains("2 test results", { matchCase: false });

    // can delete other tests
    cy.get("@list").eq(1).contains("delete").click();
    cy.contains("delete?");
    cy.get("button").contains("Delete").click();
    cy.contains("deleted");
    cy.get("@result").contains("1 test result", { matchCase: false });

    // check progress bar is now green
    cy.get("@progress").contains("All test results sent");
    cy.get("@progress").should("have.class", "text-positive");
  });

  // check all pages work
  // can add test x2
  it("check all pages work", () => {
    cy.visit("/#/personal");
    cy.visit("/#/settings");
    cy.visit("/#/help");
    cy.visit("/#/user");
    cy.visit("/#/manage");
  });

  // TODO Check basic fb integration
  // TODO check manage profiles, cannot delete profile if they have tests
  // TODO test in mobile mode
})
