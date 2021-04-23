const getBaseUrl = cb => chrome.storage.sync.get(['base_url'], r => cb(r.base_url));

document.addEventListener('DOMContentLoaded', () => {
  const goButton = document.getElementById('go');

  goButton.addEventListener('click', e => {
    e.preventDefault();

    getBaseUrl(r => console.debug(`Base url is ${r}`));

  }, false);
}, false);
