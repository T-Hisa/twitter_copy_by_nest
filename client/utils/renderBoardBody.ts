export const renderBoardBody = (body: string, id: string, isModal: boolean) => {
  let text = body.replace(/\n/g, '<br/>');
  let matchWords = text.match(
    /https?:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*?\.(com|co|jp|es)/,
  );
  if (matchWords) {
    const matchWord = matchWords[0];
    let genAnchorTag = `
      <a
        href=${matchWord}
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        class="match"
        title=${matchWord}
      >
        ${matchWord}
      </a>
    `;
    text = text.replace(matchWord, genAnchorTag);
  }
  let bodyEl: HTMLDivElement;
  if (isModal) {
    bodyEl = document.getElementById(
      `body-modal-${id}`,
    ) as HTMLDivElement;
    if (bodyEl) {
      bodyEl.innerHTML = text;
    }
  } else {
    bodyEl = document.getElementById(`body-${id}`) as HTMLDivElement;
    if (bodyEl) {
      bodyEl.innerHTML = text;
    }
  }
};