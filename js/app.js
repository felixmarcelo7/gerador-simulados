// Guarda referências aos elementos do HTML para atualizar as telas e ouvir eventos.
const frm = document.querySelector("form");
const secSimulado = document.getElementById("simulado");
const secFimSimulado = document.getElementById("fimSimulado");
const enunciado = document.getElementById("enunciadoQuestao");
const contInicial = document.getElementById("spnCont");
const contFinal = document.getElementById("spnTot");
const numAcertosFim = document.getElementById("numAcertosFim");
const totQuestoesFim = document.getElementById("totQuestoesFim");
const alternativasContainer = document.getElementById("alternativasContainer");
const proxBtn = document.getElementById("proxBtn");
const novoSimuladoBtn = document.getElementById("novoSimulado");
const selDisciplina = document.getElementById("selDisciplina");
// Estado do simulado: posição da questão (começa em 0), totais e questões sorteadas.
let indexQuestaoAtual = 0;
let totQuestoes = 0;
let totAcertos = 0;
let questoesSelecionadas = [];
// O array questoes vem de questions.js, carregado antes deste arquivo no HTML.
// O spread (...) copia o array para embaralhar sem mudar a ordem do original.
// Os objetos das questões continuam compartilhados entre os dois arrays.
const copiaQuestoes = [...questoes];

const shuffle = (array) => {
  // Embaralha o próprio array com o algoritmo Fisher-Yates.
  // currentIndex indica quantos elementos ainda faltam embaralhar.
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    // Sorteia um índice entre 0 e currentIndex - 1.
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Troca o último elemento da parte ainda não embaralhada pelo sorteado.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

frm.addEventListener("submit", (e) => {
  e.preventDefault();

  totQuestoes = Number(frm.numQuestoes.value);
  frm.classList.add("oculto");
  secSimulado.classList.remove("oculto");
  // Embaralha e pega as primeiras N questões
  shuffle(copiaQuestoes);
  questoesSelecionadas = copiaQuestoes.slice(0, totQuestoes);
  console.log(questoesSelecionadas);
  exibirQuestao();
});

// Confere a resposta e avança para a próxima questão ou mostra o resultado.
proxBtn.addEventListener("click", () => {
  // :checked encontra apenas a alternativa marcada; se não houver, retorna null.
  const respostaSelecionada = alternativasContainer.querySelector(
    'input[name="resposta"]:checked',
  );

  // O return encerra este clique sem avançar caso nenhuma opção esteja marcada.
  if (!respostaSelecionada) {
    alert("Selecione uma alternativa!");
    return;
  }

  // O value do radio guarda a posição da alternativa, começando em 0.
  const indiceResposta = Number(respostaSelecionada.value);

  if (
    indiceResposta === questoesSelecionadas[indexQuestaoAtual].respostaCorreta
  ) {
    totAcertos++;
  }

  // O último índice é total - 1, pois a contagem dos arrays começa em 0.
  if (indexQuestaoAtual < totQuestoes - 1) {
    indexQuestaoAtual++;
    exibirQuestao();
  } else {
    // Após responder à última questão, troca de tela e preenche o placar final.
    secSimulado.classList.add("oculto");
    secFimSimulado.classList.remove("oculto");

    numAcertosFim.textContent = totAcertos;
    totQuestoesFim.textContent = totQuestoes;
    return;
  }
});

// Volta ao formulário e prepara os contadores para uma nova rodada.
novoSimuladoBtn.addEventListener("click", () => {
  secFimSimulado.classList.add("oculto");
  frm.classList.remove("oculto");
  // Restaura os campos aos valores iniciais e coloca o foco na disciplina.
  frm.reset();
  selDisciplina.focus();
  indexQuestaoAtual = 0;
  totQuestoes = 0;
  totAcertos = 0;
  questoesSelecionadas = [];
});

// Monta na tela a questão indicada por indexQuestaoAtual.
const exibirQuestao = () => {
  // Remove as alternativas anteriores, incluindo a seleção da resposta anterior.
  alternativasContainer.innerHTML = "";
  enunciado.textContent = questoesSelecionadas[indexQuestaoAtual].enunciado;
  // Soma 1 apenas para exibir uma contagem mais natural ao usuário: 1, 2, 3...
  contInicial.textContent = indexQuestaoAtual + 1;
  contFinal.textContent = totQuestoes;

  // Cria um item de lista para cada alternativa; index é a posição no array.
  questoesSelecionadas[indexQuestaoAtual].alternativas.forEach(
    (alternativa, index) => {
      const alt = document.createElement("li");

      alt.innerHTML = /*html*/ `
      <input type="radio" name="resposta" id="alternativa${index}" value="${index}" />
      <label for="alternativa${index}">${alternativa}</label>
      `;

      alternativasContainer.appendChild(alt);
    },
  );
};
