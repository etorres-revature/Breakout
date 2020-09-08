const rulesBtn = document.querySelector("#rules-btn");
const closeBtn = document.querySelector("#close-btn");
const rulesEl = document.querySelector("#rules");

//rules and close event handlers
rulesBtn.addEventListener("click", () => rulesEl.classList.add("show"));
closeBtn.addEventListener("click", () => rulesEl.classList.remove("show"));
