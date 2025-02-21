const URL_BASE = "https://ddragon.leagueoflegends.com/cdn/";
let versaoAtual = "";
let idiomaSelecionado = "en-US"; // Valor padrão

const textos = {
  "pt-BR": {
    languageSelectorLabel: "Selecione o idioma:",
    amountSelectorLabel: "Quantidade de campeões aleatórios:",
    generateButton: "Gere os campeões aleatorios",
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

document.getElementById("language-selector").value = idiomaSelecionado;
alterarIdioma();

const obterVersaoMaisRecente = async () => {
  try {
    const resp = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    if (resp.ok) {
      const versions = await resp.json();
      return versions[0];
    }
  } catch (error) {
    console.error("Erro ao buscar a versão mais recente:", error);
  }
};

const chamarApi = async (url) => {
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const data = await resp.json();
      return Object.keys(data.data);
    }
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
  const ladoAzul = [];
  const ladoVermelho = [];
  ids.forEach((id, index) => {
    if (index % 2 === 0) {
      ladoAzul.push(id);
    } else {
      ladoVermelho.push(id);
    }
  });
  return { ladoAzul, ladoVermelho };
};

const obterUrlImagem = (id) => {
  return `${URL_BASE}${versaoAtual}/img/champion/${id}.png`;
};

const exibirIds = (ladoAzul, ladoVermelho) => {
  const criarElemento = (id) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = obterUrlImagem(id);
    img.alt = id;
    img.style.width = "50px";
    img.classList.add("champion-icon");
    img.setAttribute("data-id", id);
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

  adicionarEventListeners();
};

const gerar = async () => {
  const quantidade = parseInt(
    document.getElementById("amount-selector").value,
    10
  );
  if (quantidade < 1)
    return alert("Error: The number of random champions must be at least 1.");
  if (quantidade > 50)
    return alert("Error: The maximum number of champions generated is 50.");

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

    const shareLinkInput = document.getElementById("share-link");
    shareLinkInput.value = window.location.href;

    const shareLinkContainer = document.getElementById("share-link-container");
    shareLinkContainer.style.display = "block";
  }
};

const copiarLink = () => {
  const shareLinkInput = document.getElementById("share-link");
  shareLinkInput.select();
  shareLinkInput.setSelectionRange(0, 99999);

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
    document.getElementById("language-selector").value = idiomaSelecionado;
    alterarIdioma();
  }

  if (championsParam && amtParam) {
    const idsString = atob(championsParam);
    const idsAleatorios = idsString.split(",");
    const quantidade = parseInt(amtParam, 10);
    const { ladoAzul, ladoVermelho } = dividirIds(idsAleatorios);
    exibirIds(ladoAzul, ladoVermelho);

    const shareLinkInput = document.getElementById("share-link");
    shareLinkInput.value = window.location.href;

    const shareLinkContainer = document.getElementById("share-link-container");
    shareLinkContainer.style.display = "block";
  }
};

const carregarVersao = async () => {
  versaoAtual = await obterVersaoMaisRecente();
  if (versaoAtual) {
    document.getElementById(
      "versao-patch"
    ).textContent = `Patch: ${versaoAtual}`;
  }
  await carregarCampeoesDaURL();
};

function adicionarAtributo(identificador, valor) {
  let resultado = "";
  const nome = textos[idiomaSelecionado].attributes[identificador];
  let formattedValue = "";
  let classe = "";

  if (identificador === "ability_haste") {
    formattedValue = valor > 0 ? `+${valor}` : `${valor}`;
    classe = valor > 0 ? "buff" : "debuff";
  } else if (identificador === "total_as" || identificador === "tenacity") {
    const percentIncrease = ((valor - 1) * 100).toFixed(1);
    formattedValue = `+${percentIncrease}%`;
    classe = "buff";
  } else if (identificador === "dmg_taken") {
    const percent = (valor * 100).toFixed(0);
    formattedValue = `${percent}%`;
    if (valor > 1) {
      classe = "debuff";
    } else if (valor < 1) {
      classe = "buff";
    }
  } else {
    const percent = (valor * 100).toFixed(0);
    formattedValue = `${percent}%`;
    if (valor > 1) {
      classe = "buff";
    } else if (valor < 1) {
      classe = "debuff";
    }
  }
  resultado = `<span class="${classe}">${nome}: ${formattedValue}</span><br>`;
  return resultado;
}

const adicionarEventListeners = () => {
  const championIcons = document.querySelectorAll(".champion-icon");
  let infoBoxesAbertas = [];

  championIcons.forEach((icon) => {
    icon.addEventListener("click", async (event) => {
      event.stopPropagation();
      const championId = event.target.getAttribute("data-id");

      // Verifica se já existe uma info-box para este campeão
      const infoBoxExistente = infoBoxesAbertas.find(
        (box) => box.dataset.championId === championId
      );
      if (infoBoxExistente) {
        return;
      }

      try {
        const response = await fetch(
          `/api/aram/${encodeURIComponent(championId)}`
        );
        const championData = await response.json();

        const infoBox = document.createElement("div");
        infoBox.classList.add("aram-info-box");
        infoBox.dataset.championId = championId;

        let infoBoxContent = `<strong>${championData.apiname}</strong><br>`;

        if (Object.keys(championData.aram).length === 0) {
          const msgPerfeito = textos[idiomaSelecionado].perfectlyBalanced;
          infoBoxContent += `<span class="perfeito">${msgPerfeito}</span>`;
        } else {
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

        // Adiciona o botão de fechar (X)
        infoBoxContent += `<span class="close-btn">&times;</span>`;
        infoBox.innerHTML = infoBoxContent;

        // Aplica a animação de entrada (fade in)
        infoBox.style.animation = "fadeIn 0.5s ease-out forwards";

        const rect = icon.getBoundingClientRect();
        infoBox.style.position = "absolute";
        infoBox.style.left = `${rect.right + window.scrollX + 100}px`;
        infoBox.style.top = `${rect.top + window.scrollY - 10}px`;

        document.body.appendChild(infoBox);
        infoBoxesAbertas.push(infoBox);

        // Define um timer para fechar automaticamente a info-box após 5 segundos
        const autoCloseTimer = setTimeout(() => {
          if (document.body.contains(infoBox)) {
            infoBox.classList.add("fade-out");
            setTimeout(() => {
              infoBox.remove();
              infoBoxesAbertas = infoBoxesAbertas.filter(
                (box) => box !== infoBox
              );
            }, 500); // tempo de duração da animação de fade out
          }
        }, 5000);

        // Evento para fechar a info-box ao clicar no "X"
        infoBox.querySelector(".close-btn").addEventListener("click", () => {
          clearTimeout(autoCloseTimer);
          infoBox.classList.add("fade-out");
          setTimeout(() => {
            infoBox.remove();
            infoBoxesAbertas = infoBoxesAbertas.filter(
              (box) => box !== infoBox
            );
          }, 500);
        });
      } catch (error) {
        console.error("Erro ao buscar dados do campeão:", error);
      }
    });
  });
};

window.addEventListener("load", carregarVersao);
