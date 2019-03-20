import {createFilter} from './filter';
import {makeTaskData} from './data';
import Task from './task';
import TaskEdit from './task-edit';
import {getLessRandomCount} from './util';

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

const generateTasks = (number = 10) => {
  const arrayTasks = [];
  for (let i = 0; i < number; i++) {
    const data = makeTaskData();
    let newTask = new Task(data);
    let newTaskEdit = new TaskEdit(data);
    TASKS_BOARD.appendChild(newTask.render());
    newTask.onEdit = () => {
      newTaskEdit.render();
      TASKS_BOARD.replaceChild(newTaskEdit.element, newTask.element);
      newTask.unrender();
    };
    newTaskEdit.onSubmit = (newObject) => {
      data.title = newObject.title;
      data.tags = newObject.tags;
      data.color = newObject.color;
      data.repeatingDays = newObject.repeatingDays;
      data.dueDate = newObject.dueDate;

      newTask.update(data);
      newTask.render();
      TASKS_BOARD.replaceChild(newTask.element, newTaskEdit.element);
      newTaskEdit.unrender();
    };
    arrayTasks.push([newTask, newTaskEdit]);
    // console.log([newTask._count, newTaskEdit._count]);
  }
  return arrayTasks;
};

FILTERS.forEach((renderData) => {
  const onClickFilter = (countTasks) => {
    for (let i = 0; i < allTasks.length; i++) {
      if (i >= countTasks) {
        allTasks[i][0].element.classList.add(`card__delete`);
      } else if (allTasks[i][0].element.querySelector(`.card__delete`)) {
        allTasks[i][0].element.classList.remove(`card__delete`);
      }

    }
  };

  const countTasks = getLessRandomCount(RANDOM_MAX + 1);
  FILTERS_PATH.appendChild(createFilter(renderData, countTasks, onClickFilter));
});

const allTasks = generateTasks(RANDOM_MAX);

