import {createFilter} from './filter';
import {makeTaskData} from './data';
import Task from './task';

const RANDOM_MAX = 50;
const FILTERS_PATH = document.querySelector(`.main__filter`);
const TASKS_BOARD = document.querySelector(`.board__tasks`);
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

const getRandomCount = (max) => {
  return Math.round(Math.random() * max);
};

const generateArrayTasks = (number = 10) => {
  const arrayTasks = [];
  for (let i = 0; i < number; i++) {
    let newTask = new Task(makeTaskData);
    arrayTasks.push(newTask.render());
  }
  return arrayTasks;
};

const renderTasks = (tasks) => {
  const cardsFragment = document.createDocumentFragment();
  for (let i = 0; i < tasks.length; i++) {
    cardsFragment.appendChild(tasks[i]);
  }
  TASKS_BOARD.appendChild(cardsFragment);
};

const pushFilteredCards = (tasksCount) => {
  const cardsFragment = document.createDocumentFragment();
  for (let i = 0; i < tasksCount; i++) {
    cardsFragment.appendChild(tasks[i]);
  }
  TASKS_BOARD.appendChild(cardsFragment);
};

const clearTasksBoard = () => {
  TASKS_BOARD.innerHTML = ``;
};

FILTERS.forEach((renderData) => {
  const onClickFilter = (countTasks) => {
    clearTasksBoard();
    pushFilteredCards(countTasks);
  };

  const countTasks = getRandomCount(RANDOM_MAX);
  FILTERS_PATH.appendChild(createFilter(renderData, countTasks, onClickFilter));
});

const tasks = generateArrayTasks(RANDOM_MAX);
renderTasks(tasks);

