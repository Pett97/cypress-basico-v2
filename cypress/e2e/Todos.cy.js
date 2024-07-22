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
        .type("Pett", { delay: 0 })
        .should("have.value", "Pett");
      cy.get("#lastName").type("Padua", { delay: 0 });
      cy.get("#email").type("teste@gmail.com", { delay: 0 });
      cy.get("#open-text-area").type("testes", { delay: 0 });
      cy.get(".button").click();
      cy.get(".success").should("exist");
    });

    it("teste validacao campos obrigatorios", () => {
      cy.get("#firstName")
        .should("be.visible")
        .type("Pett", { delay: 0 })
        .should("have.value", "Pett");
      cy.get("#lastName").should("be.visible");
      cy.get("#email").type("teste@gmail.com", { delay: 0 });
      cy.get("#open-text-area").type("testes", { delay: 0 });
      cy.get(".button").click();
      cy.get(".error").should("contain", "Valide os campos obrigatórios!");
    });

    it("teste Telefone aceita somente Numeros", () => {
      cy.get("#firstName")
        .should("be.visible")
        .type("Pett")
        .should("have.value", "Pett");
      cy.get("#lastName").type("Padua", { delay: 0 });
      cy.get("#email").type("teste@gmail.com", { delay: 0 });
      cy.get("#phone").type("teste", { delay: 0 }).should("have.value", "");
      cy.get("#open-text-area").type("testes", { delay: 0 });
      cy.get(".button").click();
    });

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.get("#firstName")
        .should("be.visible")
        .type("Pett", { delay: 0 })
        .should("have.value", "Pett");
      cy.get("#lastName").type("Padua", { delay: 0 });
      cy.get("#email").type("teste@gmail.com", { delay: 0 });
      cy.get("#phone-checkbox").click();
      cy.get(".error").should("contain", "Valide os campos obrigatórios!");
      cy.get(".button").click();
    });

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.get("#firstName")
        .should("be.visible")
        .type("Pett", { delay: 0 })
        .should("have.value", "Pett")
        .clear();
      cy.get("#lastName").type("Padua");
      cy.get("#email").type("teste@gmail.com", { delay: 0 });
      cy.get(".button").click();
      cy.get(".error").should("contain", "Valide os campos obrigatórios!");
      cy.get(".button").click();
    });

    it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
      cy.get(".button").click();
      cy.get(".error").should("contain", "Valide os campos obrigatórios!");
    });

    //util para buscar elementos em lista dinamicas
    it("Com CONTAINS", () => {
      cy.contains("button", "Enviar");
      cy.contains("label", "Nome").type("Pett C", { delay: 0 });
      cy.contains("label", "Sobrenome").type("Henrique"), { delay: 0 };
      cy.contains("label", "E-mail").type("henrique@gmail.com", { delay: 0 });
      cy.contains("label", "Telefone").type("91241506", { delay: 0 });
      cy.get("#open-text-area").type("testes", { delay: 0 });
      cy.contains("button", "Enviar").click();
      cy.get(".success").should("contain", "Mensagem enviada com sucesso");
    });

    it("Com Comando Customizado", () => {
      cy.enviarFormularioComSucesso();
    });
  });

  describe("Exercicio 3 e extras", () => {
    //seleciona pelo texto da selação
    it("seleciona um produto (Blog) por seu texto", () => {
      cy.get("#product").select("Blog").and("have.value", "blog");
    });
    //é mais acertivo porém teria que conhecer a utilidade do valor informado
    it("seleciona um produto (Mentoria) por seu valor (value)", () => {
      cy.get("#product").select("mentoria").and("have.value", "mentoria");
    });
  });

  describe("Exercicio 4 e extras", () => {
    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .and("have.value", "feedback");
    });
    it("marca cada tipo de atendimento", () => {
      cy.get('input[type="radio"').should("have.length", 3);
      cy.get('input[type="radio"').each(($el) => {
        cy.wrap($el).check().should("be.checked");
      });
    });
  });

  describe("Exercicio 5 Marcando (e desmarcando) inputs do tipo checkbox e extras", () => {
    it("marca ambos checkboxes, depois desmarca o último", () => {
      cy.get('#check input[type="checkbox"]')
        .as("checkboxes")
        .check()
        .should("be.checked")
        .last()
        .uncheck()
        .should("not.be.checked");
    });

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.get("#firstName")
        .should("be.visible")
        .type("Pett", { delay: 0 })
        .should("have.value", "Pett");
      cy.get("#lastName").type("Padua", { delay: 0 });
      cy.get("#email").type("teste@gmail.com", { delay: 0 });
      cy.get("#phone-checkbox").check();

      cy.get(".button").click();
      cy.get(".error").should("contain", "Valide os campos obrigatórios!");
    });
  });

  describe("Exercicio 6 e extras Fazendo upload de arquivos com Cypress", () => {
    it("seleciona um arquivo da pasta fixtures", () => {
      cy.fixture("example.json").as("testeJson");
      cy.get('input[type="file"]#file-upload')
        .should("not.have.value")
        .selectFile("@testeJson")
        .should(function ($input) {
          //console.log($input)

          expect($input[0].files[0].name).to.be.equal("example.json");
        });
    });
  });

  describe("Exercicio 7 e extras Lidando com links que abrem em outra aba", () => {
    it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
      cy.get('a[href="privacy.html"]').should("have.attr", "target", "_blank");
      cy.get('a[href="privacy.html"]').invoke("removeAttr", "target").click();
    });

    it.only("esta a página da política de privacidade de forma independente", () => {
      cy.get("#privacy a").invoke("removeAttr", "target").click();
      cy.title().should(
        "have.contain",
        "Central de Atendimento ao Cliente TAT - Política de privacidade"
      );
      cy.get("#title").should("have.text", "CAC TAT - Política de privacidade");
    });
  });
});
