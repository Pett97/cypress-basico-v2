/// <reference types="cypress"/>

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("../../src/index.html");
  });

  describe("1", () => {
    it("Verificar o Titulo da Aplicação", () => {
      cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
    });
  });

  describe("2", () => {
    it("Digitando em campos e clicando em elementos", () => {
      cy.get("#firstName")
        .should("be.visible")
        .type("Pett")
        .should("have.value", "Pett");
      cy.get("#lastName").type("Padua");
      cy.get("#email").type("teste@gmail.com");
      cy.get("#open-text-area").type("testes");
      cy.get(".button").click();
      cy.get(".success").should("exist");
    });

    it("teste validacao campos obrigatorios", () => {
      cy.get("#firstName")
        .should("be.visible")
        .type("Pett")
        .should("have.value", "Pett");
      cy.get("#lastName").should("be.visible");
      cy.get("#email").type("teste@gmail.com");
      cy.get("#open-text-area").type("testes");
      cy.get(".button").click();
      cy.get(".error").should("contain", "Valide os campos obrigatórios!");
    });

    it("teste Telefone aceita somente Numeros", () => {
      cy.get("#firstName")
        .should("be.visible")
        .type("Pett")
        .should("have.value", "Pett");
      cy.get("#lastName").type("Padua");
      cy.get("#email").type("teste@gmail.com");
      cy.get("#phone").type("teste").should("have.value", "");
      cy.get("#open-text-area").type("testes");
      cy.get(".button").click();
    });

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.get("#firstName")
        .should("be.visible")
        .type("Pett")
        .should("have.value", "Pett");
      cy.get("#lastName").type("Padua");
      cy.get("#email").type("teste@gmail.com");
      cy.get("#phone-checkbox").click();
      cy.get(".error").should("contain", "Valide os campos obrigatórios!");
      cy.get(".button").click();
    });

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.get("#firstName")
        .should("be.visible")
        .type("Pett")
        .should("have.value", "Pett")
        .clear();
      cy.get("#lastName").type("Padua");
      cy.get("#email").type("teste@gmail.com");
      cy.get(".button").click();
      cy.get(".error").should("contain", "Valide os campos obrigatórios!");
      cy.get(".button").click();
    });

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
      cy.get(".button").click();
      cy.get(".error").should("contain", "Valide os campos obrigatórios!");
    });

    it("Com CONTAINS", () => {
      cy.contains("button", "Enviar");
      cy.contains("label", "Nome").type("Pett C");
      cy.contains("label", "Sobrenome").type("Henrique");
      cy.contains("label", "E-mail").type("henrique@gmail.com");
      cy.contains("label", "Telefone").type("91241506");
      cy.get("#open-text-area").type("testes");
      cy.get(".button").click();
      cy.get(".success").should("contain", "Mensagem enviada com sucesso");
    });
  });
});
