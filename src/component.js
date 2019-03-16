import {createElement} from './util';

class Component {
  constructor() {
    if (new.target === Component) {
      throw Error(`Can't instantiate BaseComponent, use only to insert BaseComponent structure to your own components`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  createListeners() {
  }

  removeListeners() {
  }

  render() {
    this._element = createElement(this.template);
    this.createListeners();
    return this._element;
  }

  unrender() {
    this.removeListeners();
    this._element.remove();
    this._element = null;
  }

}

export default Component;
