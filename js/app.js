const frm = document.querySelector("form");
const secSimulado = document.getElementById("simulado");
const enunciado = document.getElementById("enunciadoQuestao");
const contInicial = document.getElementById("spnCont");
const contFinal = document.getElementById("spnTot");
const alternativasContainer = document.getElementById("alternativasContainer");

frm.addEventListener("submit", (e) => {
  e.preventDefault();
  const discSelecionada = frm.selDisciplina.value;
  const qtnQuestoes = Number(frm.numQuestoes.value);
  frm.classList.add("oculto");
  secSimulado.classList.remove("oculto");

  enunciado.textContent = questoes[0].enunciado;
  contInicial.textContent = 1;
  contFinal.textContent = qtnQuestoes;

  questoes[0].alternativas.forEach((alternativa, index) => {
    const alt = document.createElement("li");

    alt.innerHTML = /*html*/ `
      <input type="radio" name="resposta" id="alternativa${index}" value="${index}" />
      <label for="alternativa${index}">${alternativa}</label>
      `;

    alternativasContainer.appendChild(alt);
  });

  console.log(`Disciplina: ${discSelecionada}, Quantidade: ${qtnQuestoes}`);
});
