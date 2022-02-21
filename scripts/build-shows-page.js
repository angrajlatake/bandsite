// const showsArrey = [
//   {
//     date: 1630900800000,
//     venue: "Ronald Lane ",
//     location: "San Francisco, CA",
//   },
//   {
//     date: 1632196800000,
//     venue: "Pier 3 East ",
//     location: "San Francisco, CA",
//   },
//   {
//     date: 1634270400000,
//     venue: "View Lounge",
//     location: "San Francisco, CA",
//   },
//   {
//     date: 1636171200000,
//     venue: "Hyatt Agency",
//     location: "San Francisco, CA",
//   },
//   {
//     date: 1637902800000,
//     venue: "Moscow Center",
//     location: "San Francisco, CA",
//   },
//   {
//     date: 1639544400000,
//     venue: "Press Club",
//     location: "San Francisco, CA",
//   },
// ];
const link = "https://project-1-api.herokuapp.com/showdates";
const apiKey = "?api_key=3e76ec52-db2a-4564-99d4-11b55158c9e7";

const tableBody = document.querySelector(".table__body");

showTable();

function showTable() {
  const getShows = axios.get(link + apiKey);
  getShows.then((res) => {
    const showsArrey = res.data;
    tableBody.innerHTML = "";
    showsArrey.forEach((show) => {
      const tableRow = document.createElement("div");
      tableRow.classList.add("table__row");
      tableBody.appendChild(tableRow);

      const tableDate = document.createElement("span");
      tableDate.classList.add("table__date");
      tableDate.classList.add("cell")
      tableDate.setAttribute("data-label", "date");

      tableDate.innerHTML = new Date(Number(show.date)).toDateString(
      );
      tableRow.appendChild(tableDate);

      const tableVenue = document.createElement("span");
      tableVenue.setAttribute("data-label", "venue");
      tableVenue.classList.add("cell")
      tableVenue.innerHTML = show.place;
      tableRow.appendChild(tableVenue);

      const tableCity = document.createElement("span");
      tableCity.setAttribute("data-label", "city");
      tableCity.classList.add("cell")
      tableCity.innerHTML = show.location;
      tableRow.appendChild(tableCity);

      const btnCell = document.createElement("span");
      btnCell.classList.add("cell")
      tableRow.appendChild(btnCell);

      const tableBtn = document.createElement("button");
      tableBtn.classList.add("btn");
      tableBtn.innerHTML = "buy tickets";
      btnCell.appendChild(tableBtn);
    });
  });
}

tableBody.addEventListener("click", (event) => {
  const selectedRow = event.target.parentElement;
  const allRows = document.querySelectorAll(".table__row");
  allRows.forEach((row)=>{
    row.classList.remove("table__row--selected");
  })
  selectedRow.classList.add("table__row--selected");
});
