import {mapColors} from './data';
import Component from './component';

const ENTER_CODE = 13;

class TaskEdit extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;
    this._isHasDate = true;

    this._state.isRepeating = false;
    this._state.isDate = false;

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeating = this._onChangeRepeating.bind(this);
    this._onInputTitle = this._onInputTitle.bind(this);
    this._onChangePicture = this._onChangePicture.bind(this);
    this._onChangeColor = this._onChangeColor.bind(this);
    this._onChangeHashtag = this._onChangeHashtag.bind(this);

    this._onSubmit = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
  }

  _getTag(tag) {
    return `<span class="card__hashtag-inner">
     <input
       type="hidden"
       name="hashtag"
       value="${tag}"
       class="card__hashtag-hidden-input"
     />
     <button type="button" class="card__hashtag-name">
       #${tag}
     </button>
     <button type="button" class="card__hashtag-delete">
       delete
     </button>
     </span>`;
  }

  _getColorStyle(color) {
    return mapColors.get(color);
  }

  _isRepeating() {
    return Object.values(this._repeatingDays).some((value) => {
      return value === true;
    });
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _onChangeRepeating() {
    this._state.isRepeating = !this._state.isRepeating;
    this.removeListeners();
    this._partialUpdate();
    this.createListeners();
  }

  _onInputTitle(evt) {
    this._title = evt.target.value;
  }

  _onChangeHashtag(evt) {
    if (evt.keyCode === ENTER_CODE) {
      evt.preventDefault();
      this._tags.add(evt.target.value);
      this.removeListeners();
      this._partialUpdate();
      this.createListeners();
    }
  }

  _onChangePicture() {
  }

  _onChangeColor(evt) {
    this._element.classList.remove(this._getColorStyle(this._color));
    this._color = evt.target.value;
    this._element.classList.add(this._getColorStyle(this._color));
  }

  _createColorRadioListeners() {
    for (let radioInput of this._element.querySelectorAll(`.card__color-input`)) {
      radioInput.addEventListener(`change`, this._onChangeColor);
    }
  }

  _removeColorRadioListeners() {
    for (let radioInput of this._element.querySelectorAll(`.card__color-input`)) {
      radioInput.removeEventListener(`change`, this._onChangeColor);
    }
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _processForm(formData) {

    const entry = {
      title: ``,
      color: ``,
      picture: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false
      }
    };

    const translator = TaskEdit.createMapper(entry);

    for (let pair of formData.entries()) {
      let [key, value] = pair;
      if (translator[key]) {
        translator[key](value);
      }
    }

    return entry;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get template() {
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

    const _template = `<article class="card card--edit ${this._getColorStyle(this._color)} ${this._state.isRepeating ? `card--repeat` : ``}">
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
            >${this._title}</textarea
            >
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder="23 September"
                    name="date"
                    value="${getLocaledDate(this._dueDate, `en-GB`, dayOptions)}"
                  />
                </label>
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__time"
                    type="text"
                    placeholder="11:15 PM"
                    name="time"
                    value="${getLocaledDate(this._dueDate, `en-US`, timeOptions)}"
                  />
                </label>
              </fieldset>

              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${this._state.isRepeating ? `yes` : `no`}</span>
              </button>

              <fieldset class="card__repeat-days" ${!this._state.isRepeating && `disabled`}>
                <div class="card__repeat-days-inner">
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-mo-${this._count}"
                    name="repeat"
                    value="mo"
                    ${this._repeatingDays.mo && `checked`}
                  />
                  <label class="card__repeat-day" for="repeat-mo-${this._count}"
                    >mo</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-tu-${this._count}"
                    name="repeat"
                    value="tu"
                    ${this._repeatingDays.tu && `checked`}
                  />
                  <label class="card__repeat-day" for="repeat-tu-${this._count}"
                    >tu</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-we-${this._count}"
                    name="repeat"
                    value="we"
                    ${this._repeatingDays.we && `checked`}
                  />
                  <label class="card__repeat-day" for="repeat-we-${this._count}"
                    >we</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-th-${this._count}"
                    name="repeat"
                    value="th"
                    ${this._repeatingDays.th && `checked`}
                  />
                  <label class="card__repeat-day" for="repeat-th-${this._count}"
                    >th</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-fr-${this._count}"
                    name="repeat"
                    value="fr"
                    ${this._repeatingDays.fr && `checked`}
                  />
                  <label class="card__repeat-day" for="repeat-fr-${this._count}"
                    >fr</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    name="repeat"
                    value="sa"
                    id="repeat-sa-${this._count}"
                    ${this._repeatingDays.sa && `checked`}
                  />
                  <label class="card__repeat-day" for="repeat-sa-${this._count}"
                    >sa</label
                  >
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-su-${this._count}"
                    name="repeat"
                    value="su"
                    ${this._repeatingDays.su && `checked`}
                  />
                  <label class="card__repeat-day" for="repeat-su-${this._count}"
                    >su</label
                  >
                </div>
              </fieldset>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
              ${Array.from(this._tags).map((tag) => {
    return this._getTag(tag);
  }).join(` `)}
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

          <label class="card__img-wrap ${this._picture ? `card__img-wrap--empty` : ``}">
            <input
              type="file"
              class="card__img-input visually-hidden"
              name="img"
            />
            <img
              src="${this._picture ? this._picture : `img/add-photo.svg`}"
              alt="task picture"
              class="card__img"
            />
          </label>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              <input
                type="radio"
                id="color-black-${this._count}"
                class="card__color-input card__color-input--black visually-hidden"
                name="color"
                value="black"
                ${this._color === `black` && `checked`}
              />
              <label
                for="color-black-${this._count}"
                class="card__color card__color--black"
                >black</label
              >
              <input
                type="radio"
                id="color-yellow-${this._count}"
                class="card__color-input card__color-input--yellow visually-hidden"
                name="color"
                value="yellow"
                ${this._color === `yellow` && `checked`}
              />
              <label
                for="color-yellow-${this._count}"
                class="card__color card__color--yellow"
                >yellow</label
              >
              <input
                type="radio"
                id="color-blue-${this._count}"
                class="card__color-input card__color-input--blue visually-hidden"
                name="color"
                value="blue"
                ${this._color === `blue` && `checked`}
              />
              <label
                for="color-blue-${this._count}"
                class="card__color card__color--blue"
                >blue</label
              >
              <input
                type="radio"
                id="color-green-${this._count}"
                class="card__color-input card__color-input--green visually-hidden"
                name="color"
                value="green"
                ${this._color === `green` && `checked`}
              />
              <label
                for="color-green-${this._count}"
                class="card__color card__color--green"
                >green</label
              >
              <input
                type="radio"
                id="color-pink-${this._count}"
                class="card__color-input card__color-input--pink visually-hidden"
                name="color"
                value="pink"
                ${this._color === `pink` && `checked`}
              />
              <label
                for="color-pink-${this._count}"
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
    return _template;
  }

  createListeners() {
    this._element.querySelector(`.card__save`).addEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, this._onChangeRepeating);
    this._element.querySelector(`.card__text`).addEventListener(`input`, this._onInputTitle);
    this._element.querySelector(`.card__img-input`).addEventListener(`input`, this._onChangePicture);
    this._element.querySelector(`.card__hashtag-input`).addEventListener(`keypress`, this._onChangeHashtag);
    this._createColorRadioListeners();
  }

  removeListeners() {
    this._element.querySelector(`.card__save`).removeEventListener(`click`, this._onSubmitButtonClick);
    this._element.querySelector(`.card__date-deadline-toggle`).removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`).removeEventListener(`click`, this._onChangeRepeating);
    this._element.querySelector(`.card__text`).removeEventListener(`input`, this._onInputTitle);
    this._element.querySelector(`.card__img-input`).removeEventListener(`change`, this._onChangePicture);
    this._element.querySelector(`.card__hashtag-input`).removeEventListener(`keypress`, this._onChangeHashtag);
    this._removeColorRadioListeners();
  }

  static createMapper(target) {
    return {
      hashtag: (value) => {
        return target.tags.add(value);
      },
      text: (value) => {
        target.title = value;
        return target.title;
      },
      color: (value) => {
        target.color = value;
        return target.color;
      },
      repeat: (value) => {
        target.repeatingDays[value] = true;
        return target.repeatingDays[value];
      },
      date: (value) => {
        return target.dueDate[value];
      },
      img: (value) => {
        target.picture = value;
        return target.picture[value];
      }
    };
  }

  render() {
    this._state.isRepeating = this._isRepeating();
    super.render();
  }

  update(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    if (data.picture !== ``) {
      this._picture = data.picture;
    }
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }
}

export default TaskEdit;
