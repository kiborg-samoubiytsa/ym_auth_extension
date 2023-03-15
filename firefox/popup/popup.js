const chechIfTokenPresent = async () => {
  const access_token = await browser.storage.local.get(["token"]);

  if (Object.keys(access_token).length > 0) {
    const container = document.createElement("div");
    container.className = "successfulAuthContainer";
    document.body.appendChild(container);

    const secondaryText = document.createElement("span");
    secondaryText.className = "secondaryText";
    secondaryText.textContent = "Ваш Токен:";
    container.appendChild(secondaryText);

    const tokenPlaceholder = document.createElement("span");
    tokenPlaceholder.className = "tokenPlaceholder";
    tokenPlaceholder.textContent = access_token.token;
    container.appendChild(tokenPlaceholder);

    tokenPlaceholder.addEventListener("click", (e) => {
      
    })
  } else {
    const requestAuth = () => {
      browser.runtime.sendMessage({ code: "no_token" });
    };

    const container = document.createElement("div");
    container.className = "authRequiredContainer";
    document.body.appendChild(container);

    const secondaryText = document.createElement("span");
    secondaryText.className = "secondaryText";
    secondaryText.textContent = "Необходимо пройти авторизацию";
    container.appendChild(secondaryText);

    const authButton = document.createElement("button");
    authButton.className = "authButton";
    authButton.textContent = "Авторизоваться";
    authButton.addEventListener("click", requestAuth);
    container.appendChild(authButton);
  }
};
chechIfTokenPresent();
