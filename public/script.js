const URL_BASE = "https://ddragon.leagueoflegends.com/cdn/";
let versaoAtual = "";
let idiomaSelecionado = "pt-BR"; // Valor padrão

const textos = {
  "pt-BR": {
    languageSelectorLabel: "Selecione o idioma:",
    amountSelectorLabel: "Quantidade de campeões aleatórios:",
    generateButton: "Gere os campeões aleatórios",
    sideBlueTitle: "Lado Azul",
    sideRedTitle: "Lado Vermelho",
    shareLinkText: "Compartilhe o link com seus amigos:",
    copyLinkButton: "Copiar Link",
    perfectlyBalanced: "Perfeitamente balanceado",
    attributes: {
      dmg_dealt: "Dano Causado",
      dmg_taken: "Dano Recebido",
      healing: "Cura",
      energyregen_mod: "Regeneração de Energia",
      tenacity: "Tenacidade",
      shielding: "Escudo",
      ability_haste: "Aceleração de Habilidade",
      total_as: "Velocidade de Ataque Total",
    },
  },
  "en-US": {
    languageSelectorLabel: "Select the language:",
    amountSelectorLabel: "Number of random champions:",
    generateButton: "Generate random champions",
    sideBlueTitle: "Blue Side",
    sideRedTitle: "Red Side",
    shareLinkText: "Share the link with your friends:",
    copyLinkButton: "Copy Link",
    perfectlyBalanced: "Perfectly balanced",
    attributes: {
      dmg_dealt: "Damage Dealt",
      dmg_taken: "Damage Taken",
      healing: "Healing",
      energyregen_mod: "Energy Regen",
      tenacity: "Tenacity",
      shielding: "Shielding",
      ability_haste: "Ability Haste",
      total_as: "Total Attack Speed",
    },
  },
};

const alterarIdioma = () => {
  idiomaSelecionado = document.getElementById("language-selector").value;
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
  document.querySelector("#share-link-container p").textContent =
    textos[idiomaSelecionado].shareLinkText;
  document.getElementById("copy-link-button").textContent =
    textos[idiomaSelecionado].copyLinkButton;

  // Atualizar a URL com o idioma selecionado
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("lang", idiomaSelecionado);
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
};

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

const chamarApi = async (url) => {
  try {
    const resp = await fetch(url);
    if (resp.ok) return Object.keys((await resp.json()).data);
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};

const escolherIdsAleatorios = (ids, quantidade) => {
  const idsAleatorios = new Set();
  while (idsAleatorios.size < quantidade) {
    idsAleatorios.add(ids[Math.floor(Math.random() * ids.length)]);
  }
  return Array.from(idsAleatorios);
};

const dividirIds = (ids) => {
  const ladoAzul = [],
    ladoVermelho = [];
  ids.forEach((id, index) =>
    (index % 2 === 0 ? ladoAzul : ladoVermelho).push(id)
  );
  return { ladoAzul, ladoVermelho };
};

const obterUrlImagem = (id) =>
  `${URL_BASE}${versaoAtual}/img/champion/${id}.png`;

const exibirIds = (ladoAzul, ladoVermelho) => {
  const criarElemento = (id) => {
    const li = document.createElement("li"),
      img = document.createElement("img");
    img.src = obterUrlImagem(id);
    img.alt = id;
    img.style.width = "50px";
    img.classList.add("champion-icon");
    img.setAttribute("data-id", id);
    li.appendChild(img);
    li.appendChild(document.createTextNode(id)); // Mantido para exibir o nome do campeão
    return li;
  };
  document
    .getElementById("ladoAzul")
    .replaceChildren(...ladoAzul.map(criarElemento));
  document
    .getElementById("ladoVermelho")
    .replaceChildren(...ladoVermelho.map(criarElemento));

  // Adiciona os event listeners após exibir os ícones
  adicionarEventListeners();
};

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

    // Codificar os IDs em Base64 para encurtar o link
    const idsString = idsAleatorios.join(",");
    const idsBase64 = btoa(idsString);

    const newUrl = `${window.location.pathname}?champions=${encodeURIComponent(
      idsBase64
    )}&lang=${idiomaSelecionado}&amt=${quantidade}`;
    window.history.pushState({}, "", newUrl);

    // Atualizar o link no input e exibir o container
    const shareLinkInput = document.getElementById("share-link");
    shareLinkInput.value = window.location.href;

    const shareLinkContainer = document.getElementById("share-link-container");
    shareLinkContainer.style.display = "block";
  }
};

// Função para copiar o link
const copiarLink = () => {
  const shareLinkInput = document.getElementById("share-link");
  shareLinkInput.select();
  shareLinkInput.setSelectionRange(0, 99999); // Para dispositivos móveis

  try {
    const sucesso = document.execCommand("copy");
    if (sucesso) {
      console.log("Link copiado para a área de transferência!");
    } else {
      alert("Não foi possível copiar o link. Por favor, copie manualmente.");
    }
  } catch (err) {
    alert("Erro ao copiar o link: " + err);
  }
};

// Adicionar evento ao botão de copiar
document
  .getElementById("copy-link-button")
  .addEventListener("click", copiarLink);

const carregarCampeoesDaURL = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const championsParam = urlParams.get("champions");
  const langParam = urlParams.get("lang");
  const amtParam = urlParams.get("amt");

  if (langParam) {
    idiomaSelecionado = langParam;
    document.getElementById("language-selector").value = langParam;
    alterarIdioma();
  } else {
    // Aplica o idioma padrão se não houver parâmetro na URL
    alterarIdioma();
  }

  if (championsParam && amtParam) {
    // Decodificar os IDs do Base64
    const idsString = atob(championsParam);
    const idsAleatorios = idsString.split(",");
    const quantidade = parseInt(amtParam, 10);

    const { ladoAzul, ladoVermelho } = dividirIds(idsAleatorios);
    exibirIds(ladoAzul, ladoVermelho);

    // Atualizar o link no input e exibir o container
    const shareLinkInput = document.getElementById("share-link");
    shareLinkInput.value = window.location.href;

    const shareLinkContainer = document.getElementById("share-link-container");
    shareLinkContainer.style.display = "block";
  }
};

const carregarVersao = async () => {
  versaoAtual = await obterVersaoMaisRecente();
  if (versaoAtual)
    document.getElementById(
      "versao-patch"
    ).textContent = `Patch: ${versaoAtual}`;

  // Carregar campeões da URL se houver
  await carregarCampeoesDaURL();
};

// Função para adicionar atributos à info box
function adicionarAtributo(identificador, valor) {
  let resultado = "";
  const nome = textos[idiomaSelecionado].attributes[identificador];

  if (identificador === "ability_haste") {
    // Exibir como '+10'
    resultado = `${nome}: +${valor}<br>`;
  } else if (identificador === "total_as") {
    // Calcular o aumento em relação a 1 e exibir como '+2.5%'
    const percentIncrease = ((valor - 1) * 100).toFixed(1);
    resultado = `${nome}: +${percentIncrease}%<br>`;
  } else if (identificador === "tenacity") {
    // Calcular a tenacidade em relação a 1 e exibir como '+20'
    const tenacityIncrease = ((valor - 1) * 100).toFixed(0);
    resultado = `${nome}: +${tenacityIncrease}<br>`;
  } else {
    // Para os demais atributos, manter a formatação original
    const percent = (valor * 100).toFixed(0);
    resultado = `${nome}: ${percent}%<br>`;
  }

  return resultado;
}

// Função para adicionar event listeners aos ícones dos campeões
const adicionarEventListeners = () => {
  const championIcons = document.querySelectorAll(".champion-icon");

  championIcons.forEach((icon) => {
    icon.addEventListener("mouseover", async (event) => {
      const championId = event.target.getAttribute("data-id");

      try {
        const response = await fetch(
          `/api/aram/${encodeURIComponent(championId)}`
        );

        const championData = await response.json();

        const infoBox = document.createElement("div");
        infoBox.classList.add("aram-info-box");
        let infoBoxContent = `<strong>${championData.apiname}</strong><br>`;

        if (Object.keys(championData.aram).length === 0) {
          // Mensagem traduzida
          const msgPerfeito = textos[idiomaSelecionado].perfectlyBalanced;
          infoBoxContent += `<span class="perfeito">${msgPerfeito}</span>`;
        } else {
          // Verifica e adiciona os atributos existentes
          const atributos = [
            "dmg_dealt",
            "dmg_taken",
            "healing",
            "energyregen_mod",
            "tenacity",
            "shielding",
            "ability_haste",
            "total_as",
          ];

          atributos.forEach((atributo) => {
            if (atributo in championData.aram) {
              infoBoxContent += adicionarAtributo(
                atributo,
                championData.aram[atributo]
              );
            }
          });
        }

        infoBox.innerHTML = infoBoxContent;

        document.body.appendChild(infoBox);

        const moveInfoBox = (e) => {
          infoBox.style.left = `${e.pageX + 10}px`;
          infoBox.style.top = `${e.pageY + 10}px`;
        };

        document.addEventListener("mousemove", moveInfoBox);

        icon.addEventListener("mouseout", () => {
          infoBox.remove();
          document.removeEventListener("mousemove", moveInfoBox);
        });
      } catch (error) {
        console.error("Erro ao buscar dados do campeão:", error);
      }
    });
  });
};

// Iniciar a aplicação ao carregar a página
window.addEventListener("load", carregarVersao);
