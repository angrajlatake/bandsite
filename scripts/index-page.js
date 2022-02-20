const link = "https://project-1-api.herokuapp.com/comments";
const apiKey = "?api_key=3e76ec52-db2a-4564-99d4-11b55158c9e7";

function displayComment(comment){
        const commentLi = document.createElement("li");
      commentLi.classList.add("item");
      commentsList.appendChild(commentLi);

      const itemImg = document.createElement("img");
      itemImg.classList.add("item__img");
      itemImg.setAttribute("src", " ");
      commentLi.appendChild(itemImg);

      const itemSection = document.createElement("div");
      itemSection.classList.add("item__section");
      commentLi.appendChild(itemSection);

      const itemHeader = document.createElement("div");
      itemHeader.classList.add("item__title");
      itemSection.appendChild(itemHeader);

      const itemName = document.createElement("p");
      itemName.classList.add("item__name");
      itemName.innerHTML = comment.name;
      itemHeader.appendChild(itemName);

      const itemDate = document.createElement("p");
      itemDate.classList.add("item__date");
      itemDate.innerText = new Date(comment.timestamp).toLocaleDateString(
        "en-US"
      );
      itemHeader.appendChild(itemDate);

      const itemBody = document.createElement("div");
      itemBody.classList.add("item__body");
      itemSection.appendChild(itemBody);

      const bodyCopy = document.createElement("p");
      bodyCopy.innerText = comment.comment;
      itemBody.appendChild(bodyCopy);

      const itemFooter = document.createElement("div");
      itemFooter.classList.add("item__footer");
      itemSection.appendChild(itemFooter);

      const likeImgLink = document.createElement("a");
      likeImgLink.classList.add("item__actions", "item__actions--like");
      likeImgLink.setAttribute("data-id", comment.id);
      // likeImgLink.setAttribute("onclick", "liked(this)");
      likeImgLink.setAttribute("value", "like");
      itemFooter.appendChild(likeImgLink);

      const likeImg = document.createElement("img");
      likeImg.classList.add("like-img");
      likeImg.setAttribute("src", "./assets/Icons/SVG/icon-like.svg");
      likeImg.setAttribute("data-id", comment.id);
      likeImg.setAttribute("value", "like");
      likeImgLink.appendChild(likeImg);

      const likeCounter = document.createElement("p");
      likeImg.classList.add("like-counter");
      likeCounter.innerText = comment.likes;
      likeImgLink.appendChild(likeCounter);

      const deleteLink = document.createElement("a");
      deleteLink.classList.add("item__actions", "item__actions--delete");
      deleteLink.setAttribute("data-id", comment.id);
      deleteLink.innerText = "Delete";
      // deleteLink.setAttribute("onclick", "deleteComment(this)");
      deleteLink.setAttribute("value", "delete");
      itemFooter.appendChild(deleteLink);
}

function showComments() {
  const getComments = axios.get(link + apiKey);
  getComments.then((res) => {
    const commentsData = res.data;
    const commentsArrey = commentsData.sort(
      (a, b) => b.timestamp - a.timestamp
    );
    commentsList.innerHTML = "";
    commentsArrey.forEach((comment) => {
      displayComment(comment);

    });
  });
}

const form = document.querySelector(".form");
const commentsList = document.querySelector(".comments__list");
showComments();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const submittedName = event.target.formName;
  const submittedComment = event.target.formComment;
  const postedComment = {
    name: submittedName.value,
    comment: submittedComment.value,
  };
  const addComment = axios.post(link + apiKey, postedComment);
  addComment.then((res) => {
    event.target.reset();
    showComments();
  });
});


const itemActions = document.querySelector(".comments__list");

itemActions.addEventListener("click", (event) => {

  if (event.target.getAttribute("data-id")) {
    const userId = event.target.getAttribute("data-id");
    if (event.target.getAttribute("value") === "like") {
      const addLike = axios.put(link + "/" + userId + "/like" + apiKey);
      addLike.then((res) => {
        showComments();
      });
    } else {
      const delComment = axios.delete(link + "/" + userId + apiKey);
      delComment.then((res) => {
        displayComments();
      });
    }
  }
});
