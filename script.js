function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement("section");
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!')
  );

  return section;
}
/*
function getSkuFromProductItem(item) {
  return item.querySelector("span.item__sku").innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement("li");
  li.className = "cart__item";
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener("click", cartItemClickListener);
  return li;
}
*/

// USANDO O THEN ////
/*
const getComputer = (computer) => {
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${computer}`)
    .then((response) => response.json())
    .then((Object) => {
      Object.results.forEach((result) => {
        const obj = result;
        const section = document.querySelector('.items');
        section.appendChild(createProductItemElement(obj));
      });
    })
    .catch((error) => console.log(error, 'erro'));
};
*/
const getComputer = async (computer) => {
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${computer}`
  );
  const object = await response.json();
  const array = object.results;
  incrementResults(array);
};
const incrementResults = (result) => {
  result.forEach((entry) => {
    const obj = entry;
    const section = document.querySelector('.items');
    section.appendChild(createProductItemElement(obj));
  });
};

window.onload = () => {
  getComputer("computador");
};
