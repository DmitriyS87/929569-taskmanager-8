import {createFilter} from './filter';
import {makeTaskData} from './data';
import Task from './task';
import TaskEdit from './task-edit';

const RANDOM_MAX = 5;
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

const generateTasks = (number = 10) => {
  const arrayTasks = [];
  for (let i = 0; i < number; i++) {
    let newTask = new Task(makeTaskData);
    let newTaskEdit = new TaskEdit(makeTaskData);
    TASKS_BOARD.appendChild(newTask.render());
    newTask.onEdit = () => {
      newTaskEdit.render();
      TASKS_BOARD.replaceChild(newTaskEdit.element, newTask.element);
      newTask.unrender();
    };
    newTaskEdit.onSubmit = () => {
      newTask.render();
      TASKS_BOARD.replaceChild(newTask.element, newTaskEdit.element);
      newTaskEdit.unrender();
    };
    arrayTasks.push([newTask, newTaskEdit]);
  }
  return arrayTasks;
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

const tasks = generateTasks(RANDOM_MAX);

