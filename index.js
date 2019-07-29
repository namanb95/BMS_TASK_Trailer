let GLOBAL_trailerData = {};

fetchTrailerData().then(response => trailerCardIterator(response));

setWindowResizeEvent();


/**
 * Markup for the trailer card
 * @param {Object} trailerData 
 */
const movieTrailerCard = trailerData => {
  const { EventCode, EventTitle, TrailerURL, ratings, ShowDate } = trailerData;
  const { wtsCount: totalCount, wtsPerc: percentage } = ratings;

  const [date, month, year] = ShowDate.split(" ");
  const updatedMonth = month.split(",")[0];

  return `
  <div class="trailerCardWrapper inline-flex-column">
  <div class="video-section-${EventCode} flex-row video-section"></div>
  <div class="trailerPosterWrapper">
    <img src="${GET_END_POINT(EventCode)}" />
    <div class="deatilsWrapper flex-column justify-content-center ">
      <div
        class="releaseDateSection flex-row justify-content-end align-items-center"
      >
        <div
          class="date flex-column justify-content-center align-items-center"
        >
          <strong>${updatedMonth}</strong> ${year}
        </div>
      </div>
      <div
        class="playBtn flex-1 flex-row justify-content-center align-items-center"
      >
        <a href="javascript:;" onClick="openVideoSection(event)" event-id="${EventCode}"> <i class="far fa-play-circle"></i></a>
      </div>
      <div
        class="ratingSection flex-column align-items-end justify-content-center"
      >
        <div class="percentage flex-row">
          <i class="fas fa-thumbs-up"></i>
          <div>${percentage} %</div>
        </div>
        <div class="votes">
          ${totalCount} votes
        </div>
      </div>
    </div>
  </div>
  <div class="trailerName">${EventTitle}</div>
</div>
  `;
};

/**
 * Video Section Markup
 * @param {Object} param0 
 */
const trailerVideoMarkup = ({ TrailerURL, EventCode, EventTitle }) => {
  const uTubeUrl = TrailerURL.replace("/watch?v=", "/embed/");
  return `
  <div class="flex-row video-wrapper">
      <div class="iframe-section flex-3">
        <iframe frameborder="0" src="${uTubeUrl}"></iframe>
      </div>
      <div class="video-detail-panel flex-column flex-2">
        <h3>${EventTitle}</h3>
        <div class="flex-row trailer-details flex-1 align-items-start">
          <div class="flex-row align-items-center ">
            <div>
              <i class="fas fa-thumbs-up"></i>
            </div>
            <div class="flex-column">
              <div class="percent">100%</div>
              <div class="votes">9999 votes</div>
            </div>
          </div>
          <div class="flex-row align-items-center">
            <div>
              <i class="far fa-calendar-alt"></i>
            </div>
            <div class="flex-column">
              <div class="percent">100%</div>
              <div class="votes">9999 votes</div>
            </div>
          </div>
        </div>
        <div class="flex-row align-items-center">
          <div class="feelings flex-1 flex-column align-items-center">
            <button class="circle">
              <i class="fas fa-thumbs-up"></i>
            </button>
            <span>WILL WATCH</span>
            <span class="count">(909090)</span>
          </div>
          <div class="feelings flex-1 flex-column align-items-center">
            <button class="circle">
              <i class="fas fa-thumbs-up"></i>
            </button>
            <span>WILL WATCH</span>
            <span class="count">(909090)</span>
          </div>
          <div class="feelings flex-1 flex-column align-items-center">
            <button class="circle">
              <i class="fas fa-thumbs-up"></i>
            </button>
            <span>WILL WATCH</span>
            <span class="count">(909090)</span>
          </div>
          
        </div>
      </div>
    </div>
  `;
};


/**
 * Removes the previously selected video.
 */
const removeSelectedVideoSection = () => {
  const lastSelectedSection = document.getElementsByClassName("selected")[0];
  if (lastSelectedSection) {
    lastSelectedSection.classList.remove("selected");
    lastSelectedSection.innerHTML = "";
  }
};

/**
 * Sets up the eveny listner to the window object for resize event
 * @param {Object} e 
 */
function setWindowResizeEvent(e) {
  window.addEventListener("resize", e => {
    const selectedSection = document.getElementsByClassName("selected")[0];
    manupilateSelectedVideoStyling(selectedSection);
  });
}

/**
 * Inserts the new video selected video section in the DOM.
 * @param {Object} e 
 */
function openVideoSection(e) {
  const selectedTrailerID = e.currentTarget.getAttribute("event-id");
  const data = GLOBAL_trailerData[selectedTrailerID];
  const markup = trailerVideoMarkup(data);
  const selectedVideoSection = document.getElementsByClassName(
    `video-section-${selectedTrailerID}`
  )[0];
  removeSelectedVideoSection();
  selectedVideoSection.innerHTML = markup;
  manupilateSelectedVideoStyling(selectedVideoSection);
  debugger;
}

/**
 * Manupilates the selected cards video section.
 * @param {Object} selectedSectionScope 
 */
function manupilateSelectedVideoStyling(selectedSectionScope) {
  if (selectedSectionScope) {
    selectedSectionScope.classList.add("selected");
    selectedSectionScope.style.left = ``;
    selectedSectionScope.style.left = `-${selectedSectionScope.offsetLeft}px`;
  }
}

/**
 * Iterates the trailer cards and renders to DOM.
 * @param {Array} data 
 */
function trailerCardIterator(data) {
  const trailerData = data[1];
  GLOBAL_trailerData = data[1];
  let trailerMarkUp = "";
  for (trailer in trailerData) {
    trailerMarkUp += movieTrailerCard(trailerData[trailer]);
  }
  document.getElementById("main-content-wrapper").innerHTML = trailerMarkUp;
}

/**
 * Makes API calls.
 */
function fetchTrailerData() {
  return fetch("/data.json")
    .then(res => res.json())
    .catch(err => console.log(err));
}
