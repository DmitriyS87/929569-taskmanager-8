
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getLessRandomCount = (max) => {
  return Math.floor(Math.random() * max);
};
