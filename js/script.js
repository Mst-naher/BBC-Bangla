// console.log("connected");

const categoryContainer = document.getElementById("categoryContainer");
const newsContainer = document.getElementById("newsContainer");
const bookmarkContainer = document.getElementById("bookmarkContainer");


let bookmarks = []

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories") //promise
    .then((res) => res.json()) //res -->promise
    .then((data) => {
      // console.log(data.categories);
      const categories = data.categories;
      // console.log(categories);
      showCategory(categories);
    })

    .catch((err) => {
      console.log(err);
    });
};

const showCategory = (categories) => {
  categories.forEach((cat) => {
    // console.log(cat.title);
    categoryContainer.innerHTML += `
      <li id="${cat.id}" class="hover:border-b-4 hover:border-red-600 border-red-600  cursor-pointer">
            ${cat.title}
          </li>
     `;
  });

  categoryContainer.addEventListener("click", (e) => {
    // console.log(e);
    const allLi = document.querySelectorAll("li");
    // console.log(allLi);
    allLi.forEach((li) => {
      li.classList.remove("border-b-4");
    });

    if (e.target.localName === "li") {
      // console.log(e.target);
      e.target.classList.add("border-b-4");
      loadNewsByCategory(e.target.id);
    }
  });
};

const loadNewsByCategory = (categoryId) => {
  console.log(categoryId);

  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.articles);

      showNewsByCategory(data.articles);
    })

    .catch((err) => {
      console.log(err);
    });
};

const showNewsByCategory = (articles) => {
  console.log(articles);
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    console.log(article);

    newsContainer.innerHTML += `
     <div class="border border-gray-300 rounded-lg shadow-lg ">
        <div>
        <img class="" src="${article.image.srcset[5].url}"/>
       </div>
       <div id= "${article.id}" class="p-2">
       <h1 class="font-semibold"> ${article.title}</h1>
       <p class="text-sm"> ${article.time}</p>
        <button class="btn ">Bookmark</button>
        </div>
       
      </div>

    `;
  });
};

newsContainer.addEventListener("click", (e) => {
  // console.log(e.target);
  // console.log(e.target.innerHTML);
  if (e.target.innerText === "Bookmark") {
    console.log("Bookmark is clicked");
   handleBookmarks(e)
  }
});

const handleBookmarks = (e) =>{
 const title = e.target.parentNode.children[0].innerText;
 const id = e.target.parentNode.id;
 // console.log(id)

 bookmarks.push({
   title: title,
   id: id,
 });
 showBookmarks(bookmarks);

}


const showBookmarks = (bookmarks) =>{
// console.log(bookmarks)
bookmarkContainer.innerHTML = ''

bookmarks.forEach(bookmark =>{

  bookmarkContainer.innerHTML += `
  <div class="border my-2 p-1">
  <h1>${bookmark.title}</h1>
  <button onclick = "handleDeleteBookmark('${bookmark.id}')" class="btn btn-sm">Delete </button>
  </div>
  `;
});

}

const handleDeleteBookmark = (bookmarkId) =>{
  console.log(bookmarkId)
}

loadCategory();
loadNewsByCategory("bangladesh");

// const loadCategoryAsync = async () => {
//   try {
//     const res = await fetch("https://news-api-fs.vercel.app/api/popular");
//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };
