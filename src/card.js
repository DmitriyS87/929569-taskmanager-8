const REPEATING_STYLE = `card--repeat`;

const mapColors = new Map([[`black`, `card--black`],
  [`yellow`, `card--yellow`],
  [`blue`, `card--blue`],
  [`green`, `card--green`],
  [`pink`, `card--pink`]]);

const hashtagTemplate = document.createElement(`template`);
hashtagTemplate.innerHTML = `<span class="card__hashtag-inner">
<input
  type="hidden"
  name="hashtag"
  value="repeat"
  class="card__hashtag-hidden-input"
/>
<button type="button" class="card__hashtag-name">
  #repeat
</button>
<button type="button" class="card__hashtag-delete">
  delete
</button>
</span>`;


const getColorStyle = (color) => {
  return mapColors.get(color);
};

const addHashtag = (name) => {
  const template = hashtagTemplate.content.cloneNode(true);
  template.querySelector(`.card__hashtag-inner input`).value = name;
  template.querySelector(`.card__hashtag-name`).textContent = `#` + name;
  return template;
};

export const createCard = (data) => {
  const template = document.createElement(`template`);
  template.innerHTML = `<article class="card">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--favorites card__btn--disabled"
        >
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          ></textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">no</span>
            </button>

            <fieldset class="card__date-deadline" disabled>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="23 September"
                  name="date"
                />
              </label>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__time"
                  type="text"
                  placeholder="11:15 PM"
                  name="time"
                />
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">no</span>
            </button>

            <fieldset class="card__repeat-days" disabled>
              <div class="card__repeat-days-inner">
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-mo-5"
                  name="repeat"
                  value="mo"
                />
                <label class="card__repeat-day" for="repeat-mo-5"
                  >mo</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-tu-5"
                  name="repeat"
                  value="tu"
                  checked
                />
                <label class="card__repeat-day" for="repeat-tu-5"
                  >tu</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-we-5"
                  name="repeat"
                  value="we"
                />
                <label class="card__repeat-day" for="repeat-we-5"
                  >we</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-th-5"
                  name="repeat"
                  value="th"
                />
                <label class="card__repeat-day" for="repeat-th-5"
                  >th</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-fr-5"
                  name="repeat"
                  value="fr"
                  checked
                />
                <label class="card__repeat-day" for="repeat-fr-5"
                  >fr</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  name="repeat"
                  value="sa"
                  id="repeat-sa-5"
                />
                <label class="card__repeat-day" for="repeat-sa-5"
                  >sa</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-su-5"
                  name="repeat"
                  value="su"
                  checked
                />
                <label class="card__repeat-day" for="repeat-su-5"
                  >su</label
                >
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">

            </div>

            <label>
              <input
                type="text"
                class="card__hashtag-input"
                name="hashtag-input"
                placeholder="Type new hashtag here"
              />
            </label>
          </div>
        </div>

        <label class="card__img-wrap card__img-wrap--empty">
          <input
            type="file"
            class="card__img-input visually-hidden"
            name="img"
          />
          <img
            src="img/add-photo.svg"
            alt="task picture"
            class="card__img"
          />
        </label>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            <input
              type="radio"
              id="color-black-5"
              class="card__color-input card__color-input--black visually-hidden"
              name="color"
              value="black"
            />
            <label
              for="color-black-5"
              class="card__color card__color--black"
              >black</label
            >
            <input
              type="radio"
              id="color-yellow-5"
              class="card__color-input card__color-input--yellow visually-hidden"
              name="color"
              value="yellow"
            />
            <label
              for="color-yellow-5"
              class="card__color card__color--yellow"
              >yellow</label
            >
            <input
              type="radio"
              id="color-blue-5"
              class="card__color-input card__color-input--blue visually-hidden"
              name="color"
              value="blue"
            />
            <label
              for="color-blue-5"
              class="card__color card__color--blue"
              >blue</label
            >
            <input
              type="radio"
              id="color-green-5"
              class="card__color-input card__color-input--green visually-hidden"
              name="color"
              value="green"
              checked
            />
            <label
              for="color-green-5"
              class="card__color card__color--green"
              >green</label
            >
            <input
              type="radio"
              id="color-pink-5"
              class="card__color-input card__color-input--pink visually-hidden"
              name="color"
              value="pink"
            />
            <label
              for="color-pink-5"
              class="card__color card__color--pink"
              >pink</label
            >
          </div>
        </div>
      </div>

      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>
</article>`;

  template.content.querySelector(`.card__text`).textContent = data.title;
  template.content.querySelector(`.card__date-deadline`).removeAttribute(`disabled`);

  const getLocaledDate = (date, locale, options) => {
    return new Intl.DateTimeFormat(locale, options).format(date);
  };
  const dayOptions = {
    day: `numeric`,
    month: `long`
  };
  const timeOptions = {
    hour: `numeric`,
    minute: `numeric`
  };

  template.content.querySelector(`.card__date`).value = getLocaledDate(data.dueDate, `en-GB`, dayOptions);
  template.content.querySelector(`.card__time`).value = getLocaledDate(data.dueDate, `en-US`, timeOptions);
  template.content.querySelector(`.card`).classList.add(getColorStyle(data.color));
  template.content.querySelector(`.card__img-wrap`).classList.remove(`card__img-wrap--empty`);
  template.content.querySelector(`.card__img`).src = data.picture;
  const makeRepeatingCard = () => {
    template.content.querySelector(`.card`).classList.add(REPEATING_STYLE);
  };
  for (const day in data.repeatingDays) {
    if (data.repeatingDays[day] === true) {
      makeRepeatingCard();
    }
  }
  if (data.isFavorite) {
    template.content.querySelector(`.card`).classList.add(`card--deadline`);
  }
  data.tags.forEach((tag) => {
    template.content.querySelector(`.card__hashtag-list`).appendChild(addHashtag(tag));
  });

  return template.content;
};


