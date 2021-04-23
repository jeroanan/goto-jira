document.addEventListener('DOMContentLoaded', () => {

  const ge = id => document.getElementById(id);
  const cancelButton = ge('cancel');
  const saveButton = ge('save');
  const baseUrl = ge('baseUrl');

  const goHome = () => location.href = 'issue.html';

  cancelButton.addEventListener('click', e => {
    e.preventDefault();
    goHome();
  });

  saveButton.addEventListener('click', e => {
    e.preventDefault();
    chrome.storage.sync.set({'base_url': baseUrl.value.trim()});
    goHome();
  });
  chrome.storage.sync.get(['base_url'], r => baseUrl.value = r.base_url);

}, false);

