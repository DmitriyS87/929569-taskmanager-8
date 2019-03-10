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
  return Math.round(Math.random() * max);
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

let TASK_DATA = {
  get title() {
    return TASKS_TITLES[Math.floor(Math.random() * 3)];
  },
  get dueDate() {
    return makeTaskDate();
  },
  get tags() {
    return new Set(getRandomSubArray(ARRAY_TAGS, MAX_TAGS_COUNT));
  },
  get picture() {
    return `http://picsum.photos/100/100?r=${Math.random()}`;
  },
  get color() {
    return ARRAY_COLORS[[Math.round(Math.random() * (ARRAY_COLORS.length - 1))]];
  },
  repeatingDays: {
    get Mo() {
      return Math.random() > 0.5 ? true : false;
    },
    get Tu() {
      return Math.random() > 0.5 ? true : false;
    },
    get We() {
      return Math.random() > 0.5 ? true : false;
    },
    get Th() {
      return Math.random() > 0.5 ? true : false;
    },
    get Fr() {
      return Math.random() > 0.5 ? true : false;
    },
    get Sa() {
      return Math.random() > 0.5 ? true : false;
    },
    get Su() {
      return Math.random() > 0.5 ? true : false;
    }
  },
  get isFavorite() {
    return Math.random() > 0.5 ? true : false;
  },
  get isDone() {
    return Math.random() > 0.5 ? true : false;
  }
};

export const makeTaskData = TASK_DATA;