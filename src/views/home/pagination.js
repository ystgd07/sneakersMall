import { selectElementId, makeProductList } from "./home.js";
import { fetchProductList } from "./api/index.js";

/**
 * @description
 * 페이지 이동 버튼 생성 함수
 * @param {*} param0
 */
export function renderPagination({
  currentPage,
  totalPage,
  brand = "",
  category = "",
  sort = "",
  name = "",
}) {
  selectElementId("js-pagination").innerHTML = "";
  let disabledPage = currentPage; // 현재 위치한 페이지 버튼을 비활성화 시키기 위한 변수
  const displayCountPage = 5; //몇 페이지씩 보여줄지 정하는 상수
  let pageGroup = Math.ceil(currentPage / displayCountPage); // 나타내고 있는 페이지들 묶음
  let lastNumberPerPage = pageGroup * displayCountPage; // 나타내고 있는 마지막 페이지

  if (lastNumberPerPage > totalPage) lastNumberPerPage = totalPage;

  // 나타내고 있는 첫번째 페이지
  let first =
    lastNumberPerPage - (displayCountPage - 1) <= 0
      ? 1
      : lastNumberPerPage - (displayCountPage - 1);
  const fragmentPage = document.createDocumentFragment();

  //이전 페이지 버튼 생성
  if (pageGroup > 1) {
    const prevLi = document.createElement("li");
    prevLi.addEventListener("click", async () => {
      const { currentPage, totalPage, items } = await fetchProductList({
        page: first - 1,
        brand: brand,
        sort: sort,
        category: category,
        name: name,
      });
      makeProductList(items);
      renderPagination({ currentPage, totalPage, brand });
    });
    prevLi.insertAdjacentHTML(
      "beforeend",
      `<button class="pagination-link" id='prev'>&lt;</button>`
    );

    fragmentPage.appendChild(prevLi);
  }

  // 각 페이지 버튼 생성
  for (let page = first; page <= lastNumberPerPage; page++) {
    const li = document.createElement("li");
    li.insertAdjacentHTML(
      "beforeend",
      `<button id='page-${page}' data-num='${page}' class="pagination-link" ${
        currentPage === page ? "disabled" : ""
      }>${page}</button>`
    );
    li.addEventListener("click", async () => {
      selectElementId(`page-${disabledPage}`).removeAttribute("disabled");
      selectElementId(`page-${page}`).setAttribute("disabled", "true");
      disabledPage = page;
      const { items } = await fetchProductList({
        page: page,
        brand: brand,
        category: category,
        sort: sort,
        name: name,
      });
      makeProductList(items);
    });
    fragmentPage.appendChild(li);
  }

  // 다음 페이지 버튼 생성
  if (lastNumberPerPage < totalPage) {
    const nextLi = document.createElement("li");
    nextLi.addEventListener("click", async () => {
      const { currentPage, totalPage, items } = await fetchProductList({
        page: lastNumberPerPage + 1,
        brand: brand,
        category: category,
        sort: sort,
        name: name,
      });
      makeProductList(items);
      renderPagination({ currentPage, totalPage, brand });
    });
    nextLi.insertAdjacentHTML(
      "beforeend",
      `<button class="pagination-link" id='next'>&gt;</button>`
    );

    fragmentPage.appendChild(nextLi);
  }

  document.getElementById("js-pagination").appendChild(fragmentPage);
}
