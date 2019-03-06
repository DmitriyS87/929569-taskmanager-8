const createFilterInput = (data, taskCount, onClickFilter) => {
  const input = document.createElement(`input`);
  input.type = `radio`;
  input.id = data.id;
  input.classList.add(`filter__input`, `visually-hidden`);
  input.name = `filter`;
  if (data.condition) {
    input.setAttribute(data.condition, data.condition);
  }
  input.addEventListener(`click`, () => {
    onClickFilter(taskCount);
  });
  return input;
};

const createFilterLabel = (data, taskCount) => {
  const label = document.createElement(`label`);
  label.htmlFor = data.id;
  label.classList.add(`filter__label`);
  label.innerHTML = `${data.text} <span class="filter__all-count">${taskCount}</span>`;
  return label;
};

export const createFilter = (data, taskCount, onClickFilter) => {
  const template = document.createDocumentFragment();
  template.appendChild(createFilterInput(data, taskCount, onClickFilter));
  template.appendChild(createFilterLabel(data, taskCount));
  return template;
};
