const URL_BASE = "https://ddragon.leagueoflegends.com/cdn/";
let versaoAtual = "";
let idiomaSelecionado = "en-US"; // Valor padrão

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
document.getElementById("language-selector").value = idiomaSelecionado;
alterarIdioma();

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
    const li = document.createElement("li");
    li.classList.add("champion-item");
    const img = document.createElement("img");
    img.src = obterUrlImagem(id);
    img.alt = id;
    img.style.width = "50px";
    img.classList.add("champion-icon");
    img.setAttribute("data-id", id);
    li.appendChild(img);
    li.appendChild(document.createTextNode(id));

    // Adiciona o indicador de carregamento
    const loadingIndicator = document.createElement("div");
    loadingIndicator.classList.add("loading-indicator");
    li.appendChild(loadingIndicator);

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
    document.getElementById("language-selector").value = idiomaSelecionado;
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

// Função para adicionar atributos à info box com coloração
function adicionarAtributo(identificador, valor) {
  let resultado = "";
  const nome = textos[idiomaSelecionado].attributes[identificador];
  let formattedValue = "";
  let classe = ""; // Classe CSS para aplicar a cor

  if (identificador === "ability_haste") {
    // Exibir como '+10' ou '-10'
    formattedValue = valor > 0 ? `+${valor}` : `${valor}`;
    classe = valor > 0 ? "buff" : "debuff";
  } else if (identificador === "total_as" || identificador === "tenacity") {
    // Sempre verde
    const percentIncrease = ((valor - 1) * 100).toFixed(1);
    formattedValue = `+${percentIncrease}%`;
    classe = "buff";
  } else if (identificador === "dmg_taken") {
    // Dano Recebido
    const percent = (valor * 100).toFixed(0);
    formattedValue = `${percent}%`;
    if (valor > 1) {
      // Debuff
      classe = "debuff";
    } else if (valor < 1) {
      // Buff
      classe = "buff";
    }
  } else {
    // Outros atributos
    const percent = (valor * 100).toFixed(0);
    formattedValue = `${percent}%`;
    if (valor > 1) {
      // Buff
      classe = "buff";
    } else if (valor < 1) {
      // Debuff
      classe = "debuff";
    }
  }

  // Monta o resultado com a classe CSS
  resultado = `<span class="${classe}">${nome}: ${formattedValue}</span><br>`;

  return resultado;
}

const adicionarEventListeners = () => {
  const championIcons = document.querySelectorAll(".champion-icon");
  let infoBoxAberta = null;
  let timeoutId = null;
  let currentFetchController = null;

  // Seleciona o overlay de carregamento
  const loadingOverlay = document.getElementById("loading-overlay");

  championIcons.forEach((icon) => {
    icon.addEventListener("click", async (event) => {
      event.stopPropagation();
      const championId = event.target.getAttribute("data-id");

      // Exibe o overlay de carregamento
      loadingOverlay.style.display = "flex";

      // Se houver uma infoBox aberta, remova-a
      if (infoBoxAberta) {
        infoBoxAberta.classList.remove("show");

        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        setTimeout(() => {
          if (infoBoxAberta) {
            infoBoxAberta.remove();
            infoBoxAberta = null;
          }
        }, 300);
      }

      // Se houver uma requisição em andamento, cancele-a
      if (currentFetchController) {
        currentFetchController.abort();
      }

      // Cria um novo AbortController para a nova requisição
      currentFetchController = new AbortController();
      const signal = currentFetchController.signal;

      try {
        const response = await fetch(
          `/api/aram/${encodeURIComponent(championId)}`,
          { signal }
        );

        // Se a requisição foi abortada ou houve um erro, não faça nada
        if (!response.ok) {
          // Oculta o overlay mesmo que a resposta não seja ok
          loadingOverlay.style.display = "none";
          return;
        }

        const championData = await response.json();

        // Oculta o overlay de carregamento
        loadingOverlay.style.display = "none";

        infoBoxAberta = document.createElement("div");
        infoBoxAberta.classList.add("aram-info-box");
        infoBoxAberta.dataset.championId = championId;

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

        infoBoxAberta.innerHTML = infoBoxContent;

        const rect = icon.getBoundingClientRect();
        infoBoxAberta.style.position = "absolute";
        infoBoxAberta.style.left = `${rect.right + window.scrollX + 100}px`;
        infoBoxAberta.style.top = `${rect.top + window.scrollY - 10}px`;

        document.body.appendChild(infoBoxAberta);

        void infoBoxAberta.offsetWidth;

        infoBoxAberta.classList.add("show");

        // Inicia o temporizador para fechar automaticamente após 3 segundos
        timeoutId = setTimeout(() => {
          if (infoBoxAberta) {
            infoBoxAberta.classList.remove("show");
            setTimeout(() => {
              if (infoBoxAberta) {
                infoBoxAberta.remove();
                infoBoxAberta = null;
              }
            }, 300);
          }
        }, 3000);
      } catch (error) {
        // Oculta o overlay em caso de erro
        loadingOverlay.style.display = "none";

        if (error.name === "AbortError") {
          // A requisição foi abortada, não precisa fazer nada
          return;
        } else {
          console.error("Erro ao buscar dados do campeão:", error);
        }
      } finally {
        // Limpa o currentFetchController se a requisição foi concluída ou abortada
        currentFetchController = null;
      }
    });
  });

  // Fecha a infoBox ao clicar em qualquer lugar fora dela
  document.addEventListener("click", (event) => {
    if (infoBoxAberta) {
      infoBoxAberta.classList.remove("show");

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      setTimeout(() => {
        if (infoBoxAberta) {
          infoBoxAberta.remove();
          infoBoxAberta = null;
        }
      }, 300);
    }

    // Cancela qualquer requisição em andamento
    if (currentFetchController) {
      currentFetchController.abort();
      currentFetchController = null;
    }

    // Oculta o overlay de carregamento
    loadingOverlay.style.display = "none";
  });
};

// Iniciar a aplicação ao carregar a página
window.addEventListener("load", carregarVersao);
