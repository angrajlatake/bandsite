// const commentsArrey = [
//   {
//     name: "Connor Walton",
//     dateCreated: 1613538000000,
//     quote:
//       "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
//   },
//   {
//     name: "Emilie Beach",
//     dateCreated: 1610168400000,
//     quote:
//       "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
//   },
//   {
//     name: "Miles Acosta",
//     dateCreated: 1608440400000,
//     quote:
//       "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
//   },
// ];
const link ="https://project-1-api.herokuapp.com/comments"
const apiKey ="?api_key=3e76ec52-db2a-4564-99d4-11b55158c9e7"



const form = document.querySelector(".form");
const commentsList = document.querySelector(".comments__list");
displayComments();

function displayComments() {
  const getComments = axios.get(link+apiKey)
  getComments.then(res =>{
    const commentsArrey = res.data;
    console.log(commentsArrey);
    commentsList.innerHTML = "";
    commentsArrey.forEach((comment) => {
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
      itemFooter.classList.add("item__footer")
      itemSection.appendChild(itemFooter);

      const likeImgLink = document.createElement("a");
      likeImgLink.classList.add("item__actions","item__actions--like")
      itemFooter.appendChild(likeImgLink);

      const likeImg = document.createElement("img");
      likeImg.classList.add('like-img');
      likeImg.setAttribute("src", "./assets/Icons/SVG/icon-like.svg");
      likeImgLink.appendChild(likeImg);

      const likeCounter = document.createElement("p");
      likeImg.classList.add('like-counter');
      likeCounter.innerText = comment.likes;
      likeImgLink.appendChild(likeCounter);

      const deleteLink = document.createElement("a");
      likeImgLink.classList.add("item__actions","item__actions--delete")
      itemFooter.appendChild(deleteLink);

      const deleteBtn = document.createElement("p");
      deleteBtn.innerText = "Delete";
      deleteLink.appendChild(deleteBtn);
    });
  })

}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const submittedName = event.target.formName;
  const submittedComment = event.target.formComment;
  const postedComment = {
    name: submittedName.value,
    comment: submittedComment.value
  };

  const addComment = axios.post(link+apiKey, postedComment)
  addComment.then(res =>{
    console.log(res);

  });
  event.target.reset();
  displayComments();
});
