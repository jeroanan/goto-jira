document.addEventListener('DOMContentLoaded', () => {

  const ge = id => document.getElementById(id);
  const cancelButton = ge('cancel');
  const saveButton = ge('save');
  const baseUrl = ge('baseUrl');

  const goHome = () => location.href = 'main.html';

  const saveClicked = e => {
    e.preventDefault();
    chrome.storage.sync.set({'base_url': baseUrl.value.trim()});
    goHome();
  };

  baseUrl.addEventListener('keydown', e => {
    if (e.keyCode!==13) {
      return;
    }

    saveClicked(e);
  });

  cancelButton.addEventListener('click', e => {
    e.preventDefault();
    goHome();
  });

  saveButton.addEventListener('click', e => saveClicked(e));

  chrome.storage.sync.get(['base_url'], r => {
    baseUrl.value = r.base_url===undefined ? '' :r.base_url;
  });

}, false);

