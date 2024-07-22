/// <reference types="cypress"/>

describe("Exercicio 3 e extras", () => {
  before(() => {
    cy.visit("../../src/index.html");
  });
  beforeEach(() => {
    cy.visit("../../src/index.html");
  });

  it("seleciona um produto (Blog) por seu texto",()=>{
    cy.get('#product').select("Blog").and("have.value","blog");
  })
  it("seleciona um produto (Mentoria) por seu valor (value)",()=>{
    cy.get('#product').select("mentoria").and("have.value","mentoria");
  })
});
