/// <reference types="cypress"/>

/// <reference types="cypress"/>

describe("Exercicio 3 e extras", () => {
    before(() => {
      cy.visit("../../src/index.html");
    });
    beforeEach(() => {
      cy.visit("../../src/index.html");
    });
    
    it('marca o tipo de atendimento "Feedback"',()=>{
        cy.get('input[type="radio"][value="feedback"]').check().and("have.value","feedback")
    })

    it("marca cada tipo de atendimento",()=>{
        cy.get('input[type="radio"').each(($el)=>{
            cy.wrap($el).check().should("be.checked");
        })
    })

  });
  