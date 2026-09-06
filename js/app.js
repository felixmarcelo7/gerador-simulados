const frm = document.querySelector("form");
const secSimulado = document.getElementById("simulado");
const enunciado = document.getElementById("enunciadoQuestao");
const contInicial = document.getElementById("spnCont");
const contFinal = document.getElementById("spnTot");
const alternativasContainer = document.getElementById("alternativasContainer");
const proxBtn = document.getElementById("proxBtn");
let indexQuestaoAtual = 0;
let totQuestoes = 0;
let totAcertos = 0;

frm.addEventListener("submit", (e) => {
  e.preventDefault();
  const discSelecionada = frm.selDisciplina.value;
  totQuestoes = Number(frm.numQuestoes.value);
  frm.classList.add("oculto");
  secSimulado.classList.remove("oculto");

  exibirQuestao();
});

proxBtn.addEventListener("click", () => {
  const respostaSelecionada = alternativasContainer.querySelector(
    'input[name="resposta"]:checked',
  );

  if (!respostaSelecionada) {
    alert("Selecione uma alternativa!");
    return;
  }

  const indiceResposta = Number(respostaSelecionada.value);

  if (indiceResposta === questoes[indexQuestaoAtual].respostaCorreta) {
    totAcertos++;
  }

  if (indexQuestaoAtual < totQuestoes - 1) {
    indexQuestaoAtual++;
    exibirQuestao();
  } else {
    console.log(`Fim do simulado: ${totAcertos} de ${totQuestoes}`);
    proxBtn.disabled = true;
    return;
  }
});

const exibirQuestao = () => {
  //gera o enunciado
  alternativasContainer.innerHTML = "";
  enunciado.textContent = questoes[indexQuestaoAtual].enunciado;
  contInicial.textContent = indexQuestaoAtual + 1;
  contFinal.textContent = totQuestoes;

  //gera as alternativas
  questoes[indexQuestaoAtual].alternativas.forEach((alternativa, index) => {
    const alt = document.createElement("li");

    alt.innerHTML = /*html*/ `
      <input type="radio" name="resposta" id="alternativa${index}" value="${index}" />
      <label for="alternativa${index}">${alternativa}</label>
      `;

    alternativasContainer.appendChild(alt);
  });
};
