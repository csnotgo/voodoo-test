import { debounce, getAllElems } from "./helpers.js";
import { refs } from "./refs.js";

refs.moreInfo.addEventListener("click", showInfo);
refs.signUpBtns.forEach((elem) => elem.addEventListener("click", onClick));
window.addEventListener("resize", debounce(createMarkup, 250));

let currentPage = 1;
let productsPerPage = 0;

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

  if (width <= 923) {
    productsPerPage = 6;
  } else if (width >= 924 && width <= 1023) {
    productsPerPage = 9;
  } else if (width >= 1024) {
    productsPerPage = 12;
  }

  products?.map(({ variants }) => {
    arr.push(variants);
  });

  const items = arr.flat();
  const totalPages = Math.ceil(items.length / productsPerPage);
  createPaginationBtns(totalPages);

  const listItems = slicePerPage(items, productsPerPage)
    .map(({ title, price }) => markup(productImage, title, price))
    .join(" ");

  refs.list.innerHTML = listItems;

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
  refs.infoBox.classList.toggle("hidden");
  const width = window.screen.width;

  if (width >= 320 && width <= 360) {
    refs.moreInfo.style.height = "500px";
  } else if (width >= 361 && width <= 704) {
    refs.moreInfo.style.height = "485px";
  } else if (width >= 705 && width <= 921) {
    refs.moreInfo.style.height = "435px";
  } else if (width >= 922) {
    refs.moreInfo.style.height = "300px";
  }
  refs.arrow.style.transform = "rotate(180deg)";

  if (refs.infoBox.classList.contains("hidden")) {
    refs.arrow.style.transform = "rotate(0)";
    refs.moreInfo.style.height = "auto";
  }
}

function onClick(e) {
  e.preventDefault();
  alert("More in next updates (˵´•‿•`˵ ⑅)");
  e.target.blur();
  refs.form.reset();
}

function createPaginationBtns(totalPages) {
  const buttons = [];
  for (let i = 1; i <= totalPages; i++) buttons.push(i);

  const lastIndex = buttons.length - 1;
  const activeIndex = buttons.indexOf(currentPage);
  const skipCount = lastIndex - currentPage - 1;

  if (currentPage === 1) buttons.splice(activeIndex + 3, lastIndex - 3, "next");
  else if (currentPage <= 3) buttons.splice(activeIndex + 2, skipCount, "next");
  else if (currentPage === buttons.length) buttons.splice(1, buttons.length - 4, "prev");
  else {
    buttons.splice(1, currentPage - 3, "prev");
    if (skipCount > 0) buttons.splice(5, skipCount, "next");
  }

  const markup = buttons
    .map((num) => {
      return `<li class=" border border-black rounded-full flex justify-center items-center">
      <button type="button" class="pagination-btn rounded-full text-sm font-semibold w-[40px] h-[40px]">${num}</button>
      </li>`;
    })
    .join(" ");

  refs.paginationList.innerHTML = markup;

  const paginationBtns = document.querySelectorAll(".pagination-btn");
  paginationBtns.forEach((elem) =>
    elem.addEventListener("click", () => {
      if (elem.textContent === "next") currentPage += 1;
      if (elem.textContent === "prev") currentPage -= 1;
      if (!isNaN(elem.textContent)) currentPage = +elem.textContent;

      createMarkup();
      if (currentPage === +elem.textContent) {
        elem.classList.add("bg-black");
        elem.classList.add("text-white");
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    })
  );
}

function slicePerPage(arr, productsPerPage) {
  const skipIndex = currentPage > 1 ? productsPerPage * (currentPage - 1) : 0;
  const limitIndex = skipIndex + productsPerPage;
  const sliced = arr.slice(skipIndex, limitIndex);
  return sliced;
}

createMarkup();
