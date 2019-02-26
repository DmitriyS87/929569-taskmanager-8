import filter from './filter';

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

const pushFilteredCards = (tasksCount) => {
  const fragmentCards = document.createDocumentFragment();
  for (let i = 0; i < tasksCount; i++) {
    fragmentCards.appendChild(taskCard());
  }
  TASKS_BOARD.appendChild(fragmentCards);
};

const clearTasksBoard = () => {
  TASKS_BOARD.innerHTML = ``;
};

const taskCard = () => {
  const templateCard = document.querySelector(`.tmpl__taskcard`);
  return templateCard.content.cloneNode(true);
};

FILTERS.forEach((renderData) => {
  const onClickFilter = (countTasks) => {
    clearTasksBoard();
    pushFilteredCards(countTasks);
  };

  const countTasks = getRandomCount();
  FILTERS_PATH.appendChild(filter(renderData, countTasks, onClickFilter));
});

pushFilteredCards(TASK_2_CARD_COUNT);
