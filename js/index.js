const getElem = (elem) => document.querySelector(elem);
const getAllElems = (elem) => document.querySelectorAll(elem);

const arrow = getElem(".arrow");
const moreInfo = getElem(".more-info");
const infoBoxMob = getElem(".info-box-mob");
const infoBox = getElem(".info-box");
const list = getElem(".list");
const signUpBtns = getAllElems(".sign-up-btn");
const form = getElem(".form");

moreInfo.addEventListener("click", showInfo);
signUpBtns.forEach((elem) => elem.addEventListener("click", onClick));
window.addEventListener("resize", debounce(createMarkup, 250));

async function getAll() {
  try {
    const { products } = await (await fetch("https://voodoo-sandbox.myshopify.com/products.json?limit=12")).json();

    return products;
  } catch (error) {
    console.log(error);
  }
}

async function createMarkup() {
  const products = await getAll();
  const productImage = products[0]?.images.map(({ src }) => src);
  const arr = [];

  const width = window.screen.width;
  let productCount = 0;

  if (width <= 923) {
    productCount = 6;
  } else if (width >= 924 && width <= 1023) {
    productCount = 9;
  } else if (width >= 1024) {
    productCount = 12;
  }

  products?.map(({ variants }) => {
    arr.push(variants);
  });

  const items = arr.flatMap((item) => item).slice(0, productCount);

  const listItems = items.map(({ title, price }) => markup(productImage, title, price)).join(" ");

  list.innerHTML = listItems;

  const orderBtn = getAllElems(".order-btn");
  orderBtn.forEach((elem) => elem.addEventListener("click", onClick));
}

function markup(url, title, price) {
  return `<li class="max-w-[342px] sm:w-[342px] h-[402px] relative md:max-w-[300px]">
        <span class="bg-black p-2 flex justify-center items-center w-[47px] h-[24px] rounded absolute top-3 left-3 ">
          <p class="text-lightSand text-xs ">USED</p>
        </span>
        <img src="${url}" alt="${title}" class="w-full h-[300px] border  border-black rounded">
        <div class="flex justify-between py-3">
          <div class="font-bold text-sm">
            <p>${title}</p>
            <p>${price} $</p>
          </div>
          <div class="text-right text-sm">
            <p class="font-medium">Condition</p>
            <p>Slightly used</p>
          </div>
        </div>
        <button type="button" class="order-btn bg-black text-white text-sm font-bold py-4 rounded w-full h-[42px] flex items-center justify-center hover:bg-orangeHover focus:bg-orangeHover">
        PICK-UP IN <span class="underline ml-1">2200</span>
        </button>
    </li>`;
}

function showInfo() {
  infoBox.classList.toggle("hidden");
  const width = window.screen.width;

  if (width >= 320 && width <= 360) {
    moreInfo.style.height = "500px";
  } else if (width >= 361 && width <= 704) {
    moreInfo.style.height = "485px";
  } else if (width >= 705 && width <= 921) {
    moreInfo.style.height = "435px";
  } else if (width >= 922) {
    moreInfo.style.height = "300px";
  }
  arrow.style.transform = "rotate(180deg)";

  if (infoBox.classList.contains("hidden")) {
    arrow.style.transform = "rotate(0)";
    moreInfo.style.height = "auto";
  }
}

function onClick(e) {
  e.preventDefault();
  alert("More in next updates (˵´•‿•`˵ ⑅)");
  e.target.blur();
  form.reset();
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

createMarkup();
