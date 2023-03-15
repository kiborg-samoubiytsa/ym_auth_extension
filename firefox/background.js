let createdTabId;

const authorize = async () => {
  browser.tabs.create(
    {
      url: "https://oauth.yandex.ru/authorize?response_type=token&client_id=23cabbbdc6cd418abb4b39c32c41195d",
    },
    (tab) => {
      createdTabId = tab.id;
    }
  );
};

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tabId !== createdTabId) {
    return false;
  }

  if (
    await tab.url.match(
      /https:\/\/music\.yandex\.ru\/#access_token=(.+)&token_type=bearer&expires_in=(.+)/
    )
  ) {
    const token_url = tab.url;
    let access_token = token_url.split("#access_token=")[1].split("&")[0];

    browser.storage.local.set({ token: access_token });

    browser.tabs.remove(createdTabId);
  }
});
browser.runtime.onMessage.addListener((message) => {
  if (message.code == "no_token") {
    authorize();
  }
});
