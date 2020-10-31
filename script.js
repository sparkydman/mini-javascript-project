const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector(".seat-count");
const totalPrice = document.querySelector(".total-price");
const movie = document.getElementById("movie");

// populateUI();

let moviePrice = +movie.value;

const storeMovieData = (index) => {
  localStorage.setItem("movieIndex", index);
};

const updateCountandPrice = () => {
  const getSelectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatCount = +getSelectedSeats.length;

  const selectedSeatsIndexes = [...getSelectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndexes));

  count.innerText = selectedSeatCount;
  totalPrice.innerText = moviePrice * selectedSeatCount;
};

const populateUI = () => {
  const selectedSeatIndex = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeatIndex !== null && selectedSeatIndex.length > 0) {
    seats.forEach((seat, i) => {
      if (selectedSeatIndex.indexOf(i) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("movieIndex");
  if (selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex;
  }
};

// add click event on the container
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateCountandPrice();
  }
});

movie.addEventListener("change", (e) => {
  moviePrice = +e.target.value;
  storeMovieData(e.target.selectedIndex);
  updateCountandPrice();
});

populateUI();
updateCountandPrice();
