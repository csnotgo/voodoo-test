const getElem = (elem) => document.querySelector(elem);

const arrow = getElem(".arrow");
const moreInfo = getElem(".more-info");
const infoBox = getElem(".info-box");
const list = getElem(".list");

moreInfo.addEventListener("click", showInfo);

async function getAll() {
  try {
    const { products } = await (await fetch("https://voodoo-sandbox.myshopify.com/products.json?limit=12")).json();

    return products;
  } catch (error) {
    console.log(error);
  }
}

function showInfo() {
  infoBox.classList.toggle("hidden");
  arrow.style.transform = "rotate(180deg)";

  if (infoBox.classList.contains("hidden")) {
    arrow.style.transform = "rotate(0)";
  }
}

async function createMarkup() {
  const products = await getAll();
  console.log(products);
  const productImage = products[0]?.images.map(({ src }) => src);

  const markup = products
    ?.map(({ variants }) => {
      console.log(variants);
      return variants
        .map(({ title, price }) => {
          return `<li class="max-w-[342px] h-[402px] relative">
          <span class="bg-black p-2 flex justify-center items-center w-[47px] h-[24px] rounded absolute top-3 left-3 ">
            <p class="text-lightSand text-xs ">USED</p>
          </span>
          <img src="${productImage}" alt="${title}" class="w-full h-[300px] border  border-black rounded">
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
          <button type="button" class="bg-black text-white text-sm font-bold py-4 rounded w-full h-[42px] flex items-center justify-center hover:bg-orangeHover focus:bg-orangeHover">
          PICK-UP IN <span class="underline ml-1">2200</span>
          </button>
      </li>`;
        })
        .join(" ");
    })
    .join(" ");

  list.innerHTML = markup;
}

createMarkup();
