document.addEventListener('DOMContentLoaded', () => {
  const ge = id => document.getElementById(id);

  const goIssueButton = ge('go-issue');
  const issueNo = ge('issueNo');

  let baseUrl = '';

  const getBaseUrl = cb => chrome.storage.sync.get(['base_url'], r => cb(r.base_url));

  const toggleAttr = (el, attribute, addAttr) => {
    if (addAttr) {
      el.setAttribute(attribute, true);
    } else {
      el.removeAttribute(attribute);
    }
  }

  const disableElement = (el, disabled) => toggleAttr(el, 'disabled', disabled);
  const showElement = (el, show) => toggleAttr(el, 'hidden', !show);

  const refreshForm = () => {
    getBaseUrl(url => {
      baseUrl = url == undefined ? '' : url.trim();
      const iNo = issueNo.value.trim();

      const disableButton = baseUrl==='' || iNo==='';
      disableElement(goIssueButton, disableButton);

      const showWarning = baseUrl==='';
      showElement(ge('setBaseUrlWarning'), showWarning);
    });
  };

  goIssueButton.addEventListener('click', e => {
    e.preventDefault();

    const n = issueNo.value.trim();
    window.open(`${baseUrl}/browse/${n}`, '_blank');

  }, false);

  issueNo.addEventListener('keydown', e => refreshForm());

  refreshForm();

}, false);
