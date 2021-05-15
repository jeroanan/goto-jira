document.addEventListener('DOMContentLoaded', () => {
  const ge = id => document.getElementById(id);

  const goIssueButton = ge('go-issue');
  const issueNo = ge('issueNo');

  const goProjectButton = ge('go-project');
  const projectCode = ge('projectCode');

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

  const getVal = el => el.value.trim();

  const refreshForm = () => {
    getBaseUrl(url => {
      baseUrl = url == undefined ? '' : url.trim();
      
      const iNo = getVal(issueNo);
      const disableGoIssueButton = baseUrl==='' || iNo==='';
      disableElement(goIssueButton, disableGoIssueButton);

      const pCode = getVal(projectCode);
      const disableGoProjectButton = baseUrl=='' || pCode==='';
      disableElement(goProjectButton, disableGoProjectButton);

      const showWarning = baseUrl==='';
      showElement(ge('setBaseUrlWarning'), showWarning);
    });
  };

  const goIssueButtonClicked = e => {
    e.preventDefault();

    const n = getVal(issueNo);
    window.open(`${baseUrl}/browse/${n}`, '_blank');
  };

  const goProjectButtonClicked = e => {
    e.preventDefault();

    const pc = getVal(projectCode).toUpperCase();
    window.open(`${baseUrl}/secure/RapidBoard.jspa?projectKey=${pc}`, '_blank');
  };

  const checkEnterPressed = (e, button, onEnter) => {

    if (e.keyCode===13 && !button.getAttribute('disabled')) {
      onEnter(e);
      return true;
    }
    return false;
  };

  const addTextBoxEventListener = (textBox, button, onEnter) => {

    textBox.addEventListener('keydown', e => {
      if (e.keyCode===13 && !button.getAttribute('disabled')) {
        onEnter(e);
        return;
      }
      refreshForm()
    });
  };

  goIssueButton.addEventListener('click', e => goIssueButtonClicked(e), false);
  addTextBoxEventListener(issueNo, goIssueButton, goIssueButtonClicked);
  addTextBoxEventListener(projectCode, goProjectButton, goProjectButtonClicked);

  refreshForm();

}, false);
