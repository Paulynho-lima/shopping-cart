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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

  function cartItemClickListener() {
// coloque seu código aqui
 }
// requisito 2 add no corrinho
// usei como referencia a documentação https://www.w3schools.com/jsref/prop_node_parentelement.asp
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
const buscarId = async (event) => {
  const alvo = event.target.parentElement;
  const sku = getSkuFromProductItem(alvo);
  const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  const objet = await response.json();
  document.querySelector('.cart__items').appendChild(createCartItemElement(objet));
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.addEventListener('click', buscarId);
  section.appendChild(button);

  return section;
}
// requisito 1 add produtos;
const incrementResults = (result) => {
  result.forEach((entry) => {
    const obj = entry;
    const section = document.querySelector('.items');
    section.appendChild(createProductItemElement(obj));
  });
};

const getComputer = async (computer) => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${computer}`);
  const object = await response.json();
  const array = object.results;
  incrementResults(array);
};
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

window.onload = () => {
  getComputer('computador');
};
