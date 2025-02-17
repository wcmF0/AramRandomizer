const URL_BASE = "https://ddragon.leagueoflegends.com/cdn/";
let versaoAtual = "";

const textos = {
  "pt-BR": {
    languageSelectorLabel: "Selecione o idioma:",
    amountSelectorLabel: "Quantidade de campeões aleatórios:",
    generateButton: "Gere os campeões aleatorios",
    sideBlueTitle: "Lado Azul",
    sideRedTitle: "Lado Vermelho",
  },
  "en-US": {
    languageSelectorLabel: "Select the language:",
    amountSelectorLabel: "Number of random champions:",
    generateButton: "Generate random champions",
    sideBlueTitle: "Blue Side",
    sideRedTitle: "Red Side",
  },
};

const alterarIdioma = () => {
  const idiomaSelecionado = document.getElementById("language-selector").value;
  document.querySelector('label[for="language-selector"]').textContent =
    textos[idiomaSelecionado].languageSelectorLabel;
  document.querySelector('label[for="amount-selector"]').textContent =
    textos[idiomaSelecionado].amountSelectorLabel;
  document.querySelector('button[onclick="gerar()"]').textContent =
    textos[idiomaSelecionado].generateButton;
  document.querySelector(".blue").textContent =
    textos[idiomaSelecionado].sideBlueTitle;
  document.querySelector(".red").textContent =
    textos[idiomaSelecionado].sideRedTitle;
};

// Obtém a versão mais recente da API
const obterVersaoMaisRecente = async () => {
  try {
    const resp = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    if (resp.ok) return (await resp.json())[0];
  } catch (error) {
    console.error("Erro ao buscar a versão mais recente:", error);
  }
};

// Chama a API e retorna os IDs dos campeões
const chamarApi = async (url) => {
  try {
    const resp = await fetch(url);
    if (resp.ok) return Object.keys((await resp.json()).data);
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};

// Seleciona IDs aleatórios
const escolherIdsAleatorios = (ids, quantidade) => {
  const idsAleatorios = new Set();
  while (idsAleatorios.size < quantidade) {
    idsAleatorios.add(ids[Math.floor(Math.random() * ids.length)]);
  }
  return Array.from(idsAleatorios);
};

// Divide os IDs em duas listas
const dividirIds = (ids) => {
  const ladoAzul = [],
    ladoVermelho = [];
  ids.forEach((id, index) =>
    (index % 2 === 0 ? ladoAzul : ladoVermelho).push(id)
  );
  return { ladoAzul, ladoVermelho };
};

// Obtém a URL da imagem do campeão
const obterUrlImagem = (id) =>
  `${URL_BASE}${versaoAtual}/img/champion/${id}.png`;

// Exibe os IDs e as imagens nas listas
const exibirIds = (ladoAzul, ladoVermelho) => {
  const criarElemento = (id) => {
    const li = document.createElement("li"),
      img = document.createElement("img");
    img.src = obterUrlImagem(id);
    img.alt = id;
    img.style.width = "50px";
    li.appendChild(img);
    li.appendChild(document.createTextNode(id));
    return li;
  };
  document
    .getElementById("ladoAzul")
    .replaceChildren(...ladoAzul.map(criarElemento));
  document
    .getElementById("ladoVermelho")
    .replaceChildren(...ladoVermelho.map(criarElemento));
};

// Função principal para obter os IDs aleatórios, dividi-los e exibi-los
const gerar = async () => {
  const quantidade = parseInt(
    document.getElementById("amount-selector").value,
    10
  );
  if (quantidade < 1)
    return alert(
      "Erro: A quantidade de campeões aleatórios deve ser pelo menos 1."
    );
  if (quantidade > 50) return alert("Erro: O máximo de campeões gerados é 50.");

  const URL = `${URL_BASE}${versaoAtual}/data/en_US/champion.json`;
  const ids = await chamarApi(URL);
  if (ids) {
    const idsAleatorios = escolherIdsAleatorios(ids, quantidade * 2);
    const { ladoAzul, ladoVermelho } = dividirIds(idsAleatorios);
    exibirIds(ladoAzul, ladoVermelho);
  }
};

// Carrega o patch mais recente assim que a página carregar
const carregarVersao = async () => {
  versaoAtual = await obterVersaoMaisRecente();
  if (versaoAtual)
    document.getElementById(
      "versao-patch"
    ).textContent = `Patch: ${versaoAtual}`;
};

// Adicionar evento para carregar a versão mais recente ao carregar a página
window.addEventListener("load", carregarVersao);
