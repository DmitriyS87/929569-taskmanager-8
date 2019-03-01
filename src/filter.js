const createFilterInput = (data, taskCount, onFilterClick) => {
  const input = document.createElement(`input`);
  input.type = `radio`;
  input.id = data.id;
  input.classList.add(`filter__input`, `visually-hidden`);
  input.name = `filter`;
  if (data.condition) {
    input.setAttribute(data.condition, data.condition);
  }
  input.addEventListener(`click`, () => {
    onFilterClick(taskCount);
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

export const createFilter = (data, taskCount, onFilterClick) => {
  const template = document.createDocumentFragment();
  template.appendChild(createFilterInput(data, taskCount, onFilterClick));
  template.appendChild(createFilterLabel(data, taskCount));
  return template;
};
