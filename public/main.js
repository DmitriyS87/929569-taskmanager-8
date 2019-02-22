'use strict';

const RANDOM_MAX = 50;

const FILTERS = [
  {
    id: `filter__all`,
    text: `ALL`,
    condition: `checked`
  },
  {
    id: `filter__overdue`,
    text: `OVERDUE`,
    condition: `disabled`
  },
  {
    id: `filter__today`,
    text: `TODAY`,
    condition: `disabled`
  },
  {
    id: `filter__favorites`,
    text: `FAVORITES`
  },
  {
    id: `filter__repeating`,
    text: `Repeating`
  },
  {
    id: `filter__tags`,
    text: `Tags`
  },
  {
    id: `filter__archive`,
    text: `ARCHIVE`
  }
];

const FILTERS_PATH = document.querySelector(`.main__filter`);

const TASK_2_CARD_COUNT = 7;

const TASKS_BOARD = document.querySelector(`.board__tasks`);

const getRandomCount = () => {
  return Math.round(Math.random() * RANDOM_MAX);
};

const createFilterInput = ({id, condition = false}) => {
  const input = document.createElement(`input`);
  input.type = `radio`;
  input.id = id;
  input.classList.add(`filter__input`, `visually-hidden`);
  input.name = `filter`;
  if (condition) {
    input.setAttribute(condition, condition);
  }
  return input;
};

const createFilterLabel = ({id, text}, countTasks) => {
  const label = document.createElement(`label`);
  label.htmlFor = id;
  label.classList.add(`filter__label`);
  label.innerHTML = `${text} <span class="filter__all-count">${countTasks}</span>`;
  return label;
};

const pushFilteredCards = (tasksCount) => {
  const fragmentCards = document.createDocumentFragment();
  for (let i = 0; i < tasksCount; i++) {
    fragmentCards.appendChild(taskCard());
  }
  TASKS_BOARD.appendChild(fragmentCards);
};

const taskCard = () => {
  const templateCard = document.querySelector(`.tmpl__taskcard`);
  return templateCard.content.cloneNode(true);
};

const fragment = document.createDocumentFragment();

const fragmentFilters = FILTERS.reduce((result, current) => {
  const countTasks = getRandomCount();
  fragment.appendChild(createFilterInput(current));
  fragment.appendChild(createFilterLabel(current, countTasks));
  return fragment;
}, 0);

FILTERS_PATH.appendChild(fragmentFilters);
pushFilteredCards(TASK_2_CARD_COUNT);
