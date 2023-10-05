//Refactor the test to separate the common test commands from the ones specific to the "should book an interview". The beforeEach function should be run in the scope of the describe block.
describe("Appointments", () => { //Add the describe block and the first test called "should book an interview".
    beforeEach(() => {
        cy.request("GET", "/api/debug/reset");//Add the Cypress function to the beginning of the test function and rerun the tests.
  
      cy.visit("/");
  
      cy.contains("[data-testid=day]", "Monday"); //Within the test function for the first test, visit the root of the web server, and confirm that the DOM contains the text "Monday".
    });
  
    it("should book an interview", () => {
      cy.get("[alt=Add]") //Add the command to the test that clicks the add button for the empty appointment. Remember that cy.get() allows arguments that match the jQuery API.
        .first()
        .click();
  
      cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");//Add the command to type the name "Lydia Miller-Jones" into the student input field.
      cy.get('[alt="Sylvia Palmer"]').click(); //Add the command to select the interviewer with the name "Sylvia Palmer".
  
      cy.contains("Save").click(); //Add the command to click the save button.
  
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");//Add the commands that verify that we show the student and interviewer names within and element that has the ".appointment__card--show" class.
      cy.contains(".appointment__card--show", "Sylvia Palmer");
    });
  
    it("should edit an interview", () => { //Add the "should edit an interview" test to the appointments.spec.js file
      cy.get("[alt=Edit]")
        .first()
        .click({ force: true });
  
      cy.get("[data-testid=student-name-input]")
        .clear()
        .type("Lydia Miller-Jones");
      cy.get('[alt="Tori Malcolm"]').click();
  
      cy.contains("Save").click();
  
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Tori Malcolm");
    });
  
    it("should cancel an interview", () => { //Add the "should cancel an interview" test to the appointment.spec.js file.
      cy.get("[alt=Delete]")
        .first()
        .click({ force: true });//Add the command to click the delete button.
  
      cy.contains("Confirm").click();//Add the command to click the confirm button.
  
      cy.contains("Deleting").should("exist");
      cy.contains("Deleting").should("not.exist");
  
      cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");//Add the commands that confirm the absence of the "Archie Cohen" appointment
    });
  });