import { getAllElems, getElem } from "./helpers.js";

export const refs = {
  arrow: getElem(".arrow"),
  moreInfo: getElem(".more-info"),
  infoBox: getElem(".info-box"),
  list: getElem(".list"),
  paginationList: getElem(".pagination-list"),
  signUpBtns: getAllElems(".sign-up-btn"),
  form: getElem(".form"),
};
