const TASKS_TITLES = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const ARRAY_TAGS = [`homework`, `theory`, `practice`, `intensive`, `keks`, `mentor`, `important`];
const MAX_TAGS_COUNT = 3;
const ARRAY_COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];


const makeTaskDate = () => {
  const date = new Date();
  date.setDate(Math.floor(Math.random() * 7 - Math.random() * 7));
  return date;
};

const getIndexSequence = function (max) {
  const sequence = [];
  for (let index = 0; index < max; index++) {
    sequence.push(index);
  }
  return sequence;
};

const getRandomCount = (max) => {
  return Math.floor(Math.random() * max);
};

const getRandomSubArray = function (array, count) {
  const subArray = [];
  const indexSequence = getIndexSequence(array.length);
  const length = getRandomCount(count);
  for (let j = 0; j < length; j++) {
    let randomIndex = getRandomCount(indexSequence.length - 1);
    subArray.push(array[indexSequence[randomIndex]]);
    indexSequence.splice(randomIndex, 1);
  }
  return subArray;
};

const getRandomBoolean = () => {
  return Math.random() > 0.5 ? true : false;
};

const TASK_DATA = () => {
  return {
    title: TASKS_TITLES[getRandomCount(3)],
    dueDate: makeTaskDate(),
    tags: new Set(getRandomSubArray(ARRAY_TAGS, MAX_TAGS_COUNT)),
    picture: `http://picsum.photos/100/100?r=${Math.random()}`,
    color: ARRAY_COLORS[getRandomCount(ARRAY_COLORS.length)],
    repeatingDays: {
      Mo: getRandomBoolean(),
      Tu: getRandomBoolean(),
      We: getRandomBoolean(),
      Th: getRandomBoolean(),
      Fr: getRandomBoolean(),
      Sa: getRandomBoolean(),
      Su: getRandomBoolean()
    },
    isFavorite: getRandomBoolean(),
    isDone: getRandomBoolean()
  };
};

export const makeTaskData = TASK_DATA;
export const mapColors = new Map([[`black`, `card--black`],
  [`yellow`, `card--yellow`],
  [`blue`, `card--blue`],
  [`green`, `card--green`],
  [`pink`, `card--pink`]]);
