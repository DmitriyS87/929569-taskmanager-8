const createFilterInput = ({id, condition = false}, countTasks, onClickFilter) => {
  const input = document.createElement(`input`);
  input.type = `radio`;
  input.id = id;
  input.classList.add(`filter__input`, `visually-hidden`);
  input.name = `filter`;
  if (condition) {
    input.setAttribute(condition, condition);
  }
  input.addEventListener(`click`, () => {
    onClickFilter(countTasks);
  });
  return input;
};

const createFilterLabel = ({id, text}, countTasks) => {
  const label = document.createElement(`label`);
  label.htmlFor = id;
  label.classList.add(`filter__label`);
  label.innerHTML = `${text} <span class="filter__all-count">${countTasks}</span>`;
  return label;
};

export const createFilter = (renderData, countTasks, onClickFilter) => {
  const template = document.createDocumentFragment();
  template.appendChild(createFilterInput(renderData, countTasks, onClickFilter));
  template.appendChild(createFilterLabel(renderData, countTasks));
  return template;
};
