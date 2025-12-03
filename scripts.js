document.addEventListener("DOMContentLoaded", function () {
  /* =========================================
   * MENU MOBILE
   * ======================================= */
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav__link");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("nav--open");
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("nav--open");
      });
    });
  }

  /* =========================================
   * SAUDAÇÃO DINÂMICA
   * ======================================= */
  const saudacaoEl = document.querySelector("[data-saudar]");
  if (saudacaoEl) {
    const hora = new Date().getHours();
    let texto = "Bem-vindo(a) ao nosso salão!";

    if (hora >= 5 && hora < 12) {
      texto = "Bom dia! Que tal começar o dia com um novo visual?";
    } else if (hora >= 12 && hora < 18) {
      texto = "Boa tarde! Seu horário perfeito está a um clique.";
    } else {
      texto = "Boa noite! Garanta seu horário para amanhã :)";
    }

    saudacaoEl.textContent = texto;
  }

  /* =========================================
   * ANO AUTOMÁTICO NO RODAPÉ
   * ======================================= */
  const anoAtualEl = document.getElementById("ano-atual");
  if (anoAtualEl) {
    anoAtualEl.textContent = String(new Date().getFullYear());
  }

  /* =========================================
   * MÁSCARA SIMPLES PARA TELEFONE
   * ======================================= */
  const telefoneInput = document.getElementById("telefone");

  function aplicarMascaraTelefone(valor) {
    let v = valor.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);

    if (v.length > 6) {
      return "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
    }
    if (v.length > 2) {
      return "(" + v.slice(0, 2) + ") " + v.slice(2);
    }
    if (v.length > 0) {
      return "(" + v;
    }
    return "";
  }

  if (telefoneInput) {
    telefoneInput.addEventListener("input", function (event) {
      const valor = event.target.value;
      const mascarado = aplicarMascaraTelefone(valor);
      event.target.value = mascarado;
    });
  }

  /* =========================================
   * FUNÇÕES GENÉRICAS DE ERRO / FEEDBACK
   * ======================================= */
  const feedbackEl = document.getElementById("form-feedback");

  function exibirErro(campoId, mensagem) {
    const seletor = '[data-error-for="' + campoId + '"]';
    const erroSpan = document.querySelector(seletor);
    if (erroSpan) {
      erroSpan.textContent = mensagem;
    }
  }

  function limparErros() {
    const spansErro = document.querySelectorAll(".form__error");
    spansErro.forEach(function (span) {
      span.textContent = "";
    });
  }

  function setFeedback(mensagem, tipo) {
    if (!feedbackEl) return;

    feedbackEl.textContent = mensagem;
    feedbackEl.classList.remove("form__feedback--sucesso", "form__feedback--erro");

    if (tipo === "sucesso") {
      feedbackEl.classList.add("form__feedback--sucesso");
    } else if (tipo === "erro") {
      feedbackEl.classList.add("form__feedback--erro");
    }
  }

  /* =========================================
   * VIA CEP (CEP → Cidade / Estado)
   * ======================================= */
  const cepInput = document.getElementById("cep");
  const cidadeInput = document.getElementById("cidade");
  const estadoInput = document.getElementById("estado");

  function limparEndereco() {
    if (cidadeInput) cidadeInput.value = "";
    if (estadoInput) estadoInput.value = "";
  }

  function preencherEndereco(dados) {
    if (cidadeInput && typeof dados.localidade === "string") {
      cidadeInput.value = dados.localidade;
    }
    if (estadoInput && typeof dados.uf === "string") {
      estadoInput.value = dados.uf;
    }
  }

  async function buscarCep(cepLimpo) {
    try {
      const url = "https://viacep.com.br/ws/" + cepLimpo + "/json/";
      const resposta = await fetch(url);

      if (!resposta.ok) {
        throw new Error("Erro ao consultar o CEP");
      }

      const dados = await resposta.json();

      if (dados.erro) {
        limparEndereco();
        exibirErro("cep", "CEP não encontrado.");
        return;
      }

      exibirErro("cep", "");
      preencherEndereco(dados);
    } catch (erro) {
      limparEndereco();
      exibirErro("cep", "Não foi possível consultar o CEP.");
    }
  }

  if (cepInput) {
    // Máscara simples: 00000-000
    cepInput.addEventListener("input", function (event) {
      let valor = event.target.value.replace(/\D/g, "");
      if (valor.length > 8) valor = valor.slice(0, 8);

      if (valor.length > 5) {
        valor = valor.slice(0, 5) + "-" + valor.slice(5);
      }

      event.target.value = valor;
    });

    // Consulta ao ViaCEP quando o usuário sai do campo
    cepInput.addEventListener("blur", function (event) {
      const valor = event.target.value.replace(/\D/g, "");

      limparEndereco();
      exibirErro("cep", "");

      if (valor.length === 0) {
        // Não digitou nada, não precisa consultar
        return;
      }

      if (valor.length !== 8) {
        exibirErro("cep", "CEP inválido. Use 8 dígitos.");
        return;
      }

      buscarCep(valor);
    });
  }

  /* =========================================
   * VALIDAÇÃO DO FORMULÁRIO
   * ======================================= */
  const form = document.getElementById("form-agendamento");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      limparErros();
      setFeedback("", "");

      const nome = document.getElementById("nome");
      const telefone = document.getElementById("telefone");
      const cep = document.getElementById("cep");
      const cidade = document.getElementById("cidade");
      const estado = document.getElementById("estado");
      const servico = document.getElementById("servico");
      const data = document.getElementById("data");
      const hora = document.getElementById("hora");

      let valido = true;

      if (!nome || nome.value.trim().length < 3) {
        exibirErro("nome", "Informe um nome válido (mínimo 3 caracteres).");
        valido = false;
      }

      if (!telefone || telefone.value.replace(/\D/g, "").length < 10) {
        exibirErro("telefone", "Informe um telefone válido.");
        valido = false;
      }

      if (!cep || cep.value.replace(/\D/g, "").length !== 8) {
        exibirErro("cep", "Informe um CEP válido (8 dígitos).");
        valido = false;
      }

      if (!cidade || cidade.value.trim().length === 0) {
        exibirErro("cidade", "Preencha um CEP válido para obter a cidade.");
        valido = false;
      }

      if (!estado || estado.value.trim().length === 0) {
        exibirErro("estado", "Preencha um CEP válido para obter o estado.");
        valido = false;
      }

      if (!servico || !servico.value) {
        exibirErro("servico", "Selecione um serviço.");
        valido = false;
      }

      if (!data || !data.value) {
        exibirErro("data", "Selecione uma data.");
        valido = false;
      }

      if (!hora || !hora.value) {
        exibirErro("hora", "Selecione um horário.");
        valido = false;
      }

      if (!valido) {
        setFeedback("Por favor, corrija os campos destacados.", "erro");
        return;
      }

      // Aqui você pode integrar com API, Airtable, backend etc.
      // Por enquanto, vamos apenas simular um envio bem-sucedido.
      form.reset();
      limparEndereco(); // limpa cidade/estado visualmente
      setFeedback("Agendamento enviado com sucesso! Entraremos em contato em breve.", "sucesso");
    });
  }
});