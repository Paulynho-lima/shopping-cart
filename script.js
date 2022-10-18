/* eslint-disable comma-dangle */
/* eslint-disable quotes */
const PRODUCT_KEY = "productKey";

function createProductImageElement(imageSource) {
  const img = document.createElement("img");
  img.className = "item__image";
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
  return item.querySelector("span.item__sku").innerText;
}
// usei como referencia o site https://www.w3schools.com/jsref/jsref_number.asp
const spanPrice = document.querySelector(".total-price");
const totalPrice = () => {
  let totalItems = 0;
  const listItems = document.querySelectorAll(".cart__item");
  listItems.forEach((value) => {
    const valuePrice = value.innerText.split("$")[1];
    totalItems += Number(valuePrice);
  });
  spanPrice.innerText = `R$${totalItems.toFixed(2)}`;
};

const product = document.querySelector(".cart__items");

const saveLocalStorage = () => {
  localStorage.setItem(PRODUCT_KEY, product.innerHTML);
  // console.log( product)
};

// requisito 3 apagar intem do carrinho
function cartItemClickListener(event) {
  const deleteIntem = document.querySelectorAll(".cart__item");
  event.target.remove(deleteIntem);
  saveLocalStorage();
  totalPrice();
}
// requisito 2 add no carrinho
// usei como referencia a documentação https://www.w3schools.com/jsref/prop_node_parentelement.asp
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement("li");
  li.className = "cart__item";
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: R$${salePrice}`;
  li.addEventListener("click", cartItemClickListener);
  return li;
}
const buscarId = async (event) => {
  const alvo = event.target.parentElement;
  const sku = getSkuFromProductItem(alvo);
  const response = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  const objet = await response.json();
  document
    .querySelector(".cart__items")
    .appendChild(createCartItemElement(objet));
  saveLocalStorage();
  totalPrice();
};

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement("section");
  section.className = "item";

  section.appendChild(createCustomElement("span", "item__sku", sku));
  section.appendChild(createCustomElement("span", "item__title", name));
  section.appendChild(createProductImageElement(image));
  const button = createCustomElement(
    "button",
    "item__add",
    "Adicionar ao carrinho!"
  );
  button.addEventListener("click", buscarId);
  section.appendChild(button);

  return section;
}
// requisito 1 add produtos;
const incrementResults = (result) => {
  result.forEach((entry) => {
    const obj = entry;
    const section = document.querySelector(".items");
    section.appendChild(createProductItemElement(obj));
  });
};

const getComputer = async (computer) => {
  const response = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${computer}`
  );
  const object = await response.json();
  const array = object.results;
  incrementResults(array);
};
// recuperar lista do local storage
const getLocalStorage = () => {
  product.innerHTML = localStorage.getItem(PRODUCT_KEY);
  product.addEventListener("click", cartItemClickListener);
};

// recuperar botao e função apaga tudo.
const buttom = document.querySelector(".empty-cart");

const clear = () => {
  product.innerText = "";
  saveLocalStorage();
  totalPrice();
};
buttom.addEventListener("click", clear);

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

const buscarProd = () => {
  const input = document.querySelector(".buscar");
  const valueInp = input.value;
  if (valueInp === "") alert("Adicione um produto!.");
  getComputer(valueInp);

  getLocalStorage();
  if (valueInp) alert("Produto listado abaixo!");
};

const button2 = createCustomElement("button", "buscar-item", "Buscar Produto!");

const inputs = document.querySelector(".divBusca");
button2.addEventListener("click", buscarProd);
inputs.appendChild(button2);

window.onload = () => {
  getComputer("computador");
  totalPrice();
  getLocalStorage();
};
