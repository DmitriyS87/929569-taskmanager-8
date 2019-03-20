import {mapColors} from './data';
import Component from './component';

class Task extends Component {
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

    this._onEdit = null;
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

  _onEditButtonClick() {
    return (this._onEdit instanceof Function) && this._onEdit();
  }

  handleEvent(event) {
    return event.type === `click` && this._onEditButtonClick();
  }

  set onEdit(fn) {
    this._onEdit = fn.bind(this);
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

    const _template = `<article class="card ${this._getColorStyle(this._color)} ${this._isRepeating() ? ` card--repeat` : ``}">
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
            >${this._title}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">no</span>
              </button>

              <fieldset class="card__date-deadline" ${this._isHasDate ? `` : ` disabled`}>
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
                repeat:<span class="card__repeat-status">no</span>
              </button>

              <fieldset class="card__repeat-days" disabled>
                <div class="card__repeat-days-inner">
                  <input
                    class="visually-hidden card__repeat-day-input"
                    type="checkbox"
                    id="repeat-mo-${this._count}"
                    name="repeat"
                    value="mo"
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
                    checked
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
                    checked
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
                    checked
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

          <label class="card__img-wrap ${this._picture ? `` : `card__img-wrap--empty`}">
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
                checked
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
    this._element.querySelector(`.card__btn--edit`).addEventListener(`click`, this, false);
  }

  removeListeners() {
    this._element.querySelector(`.card__btn--edit`).removeEventListener(`click`, this, false);
  }

  update(data) {
    this._title = data.title;

    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._isFavorite = data.isFavorite;
    this._isDone = data.isDone;
  }
}

export default Task;

