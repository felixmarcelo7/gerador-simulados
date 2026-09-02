const frm = document.querySelector("form");

frm.addEventListener("submit", (e) => {
  e.preventDefault();
  const discSelecionada = frm.selDisciplina.value;
  const qtnQuestoes = Number(frm.numQuestoes.value);

  console.log(`Disciplina: ${discSelecionada}, Quantidade: ${qtnQuestoes}`);
});
