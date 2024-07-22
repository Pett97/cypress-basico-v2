// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

Cypress.Commands.add("enviarFormularioComSucesso", () => {
  cy.get("#firstName")
    .should("be.visible")
    .type("Pett")
    .should("have.value", "Pett");
  cy.get("#lastName").type("Padua"),{delay:0};
  cy.get("#email").type("teste@gmail.com");
  cy.get("#open-text-area").type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at tristique velit. Integer consequat est est, vel egestas orci mollis et. In mauris orci, egestas a fermentum ac, faucibus sed erat. Curabitur iaculis tincidunt nulla eu fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis aliquet diam, id mollis purus. Donec nunc ligula, faucibus a felis at, maximus tristique arcu. ' ,{delay:0});
  cy.get(".button").click();
  cy.get(".success").should("exist");
});
