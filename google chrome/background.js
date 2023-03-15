const authorize = async () => {
  let createdTabId;

  chrome.tabs.create(
    {
      url: "https://oauth.yandex.ru/authorize?response_type=token&client_id=23cabbbdc6cd418abb4b39c32c41195d",
    },
    (tab) => {
      createdTabId = tab.id;
    }
  );

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
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

      chrome.storage.local.set({ token: access_token });

      chrome.tabs.remove(createdTabId);
    }
  });
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.code == "no_token") {
    authorize();
  }
});

//match pattern: https://music.yandex.ru/#access_token=y0_AgAAAABYS36WAAG8XgAAAADcXOdBKvVtr0fNTVOxEB6oR9YR0pbkV8k&token_type=bearer&expires_in=30381156
