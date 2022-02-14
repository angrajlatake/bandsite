const commentsArrey = [
  {
    name: "Connor Walton",
    dateCreated: 1613538000000,
    quote:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Emilie Beach",
    dateCreated: 1610168400000,
    quote:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Miles Acosta",
    dateCreated: 1608440400000,
    quote:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];
const form = document.querySelector(".form");
const commentsList = document.querySelector(".comments__list");

displayComments();

function displayComments() {
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
    itemDate.innerText = new Date(comment.dateCreated).toLocaleDateString(
      "en-US"
    );
    itemHeader.appendChild(itemDate);

    const itemBody = document.createElement("div");
    itemBody.classList.add("item__body");
    itemSection.appendChild(itemBody);

    const bodyCopy = document.createElement("p");
    bodyCopy.innerText = comment.quote;
    itemBody.appendChild(bodyCopy);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const submittedName = event.target.formName;
  const submittedComment = event.target.formComment;
  commentsArrey.unshift({
    name: submittedName.value,
    dateCreated: Date.now(),
    quote: submittedComment.value,
  });
  event.target.reset();
  displayComments();
});
