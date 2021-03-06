import * as Api from '/api.js';
// 주소 뒤 카테고리 단어 추출
const url = window.location.href;
const stringUrl = decodeURI(url);
const urlSplit = stringUrl.split('/');
const urlId = urlSplit[urlSplit.length - 2];

async function newFunction() {
  let datas = await Api.get(`/api/productlist/${urlId}`);
  let cate = await Api.get(`/api/categorylist`);
  let cateName = '';
  let itemList = [];
  datas.forEach((item) => {
    itemList.push(item);
    displayItems(itemList);
    parseToHTML(item);

    cate.forEach((category) => {
      if (category._id === item.category) {
        cateName = category.name;
        let categoryH2 = document.querySelector('.section > h2');
        categoryH2.innerHTML = cateName;
      }
    });
  });
  return;
}

//HTML Display
function displayItems(items) {
  const listH2 = document.querySelector('.section > h2');
  const ul = document.querySelector('.section-wrap');
  ul.innerHTML = items.map(parseToHTML).join('');
  // listH2.innerHTML = ${items.}
}

//데이터 -> HTML 변환
function parseToHTML(item) {
  return `
		<li class="item" id="${item._id}">
			<a href="/product/detail/${item._id}" class="item-wrap">
				<div class="item-img">
					<img src="${item.imageUrl}" alt="">
				</div>
				<div class="item-text">
					<p class="name">${item.name}</p>
					<p class="price">${item.price}원</p>
					<p class="description">${item.descriptionSummary}</p>
				</div>
			</a>
		</li>
	`;
}

newFunction();
