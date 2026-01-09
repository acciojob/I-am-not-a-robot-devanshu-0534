//your code here
const imgContainer = document.getElementById("img-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

let selectedImages = [];

/* ---------- Utility ---------- */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/* ---------- Setup Images ---------- */
function loadImages() {
  imgContainer.innerHTML = "";
  selectedImages = [];
  result.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";

  message.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";

  const images = ["img1", "img2", "img3", "img4", "img5"];

  // pick one random image to duplicate
  const duplicate = images[Math.floor(Math.random() * images.length)];
  images.push(duplicate);

  shuffle(images);

  images.forEach((imgClass) => {
    const img = document.createElement("img");
    img.classList.add(imgClass);
    img.dataset.type = imgClass;

    img.addEventListener("click", () => handleImageClick(img));
    imgContainer.appendChild(img);
  });
}

/* ---------- Image Click ---------- */
function handleImageClick(img) {
  // prevent selecting same image twice
  if (img.classList.contains("selected")) return;
  if (selectedImages.length === 2) return;

  img.classList.add("selected");
  selectedImages.push(img);

  resetBtn.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

/* ---------- Reset ---------- */
resetBtn.addEventListener("click", () => {
  loadImages();
});

/* ---------- Verify ---------- */
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  const [img1, img2] = selectedImages;

  if (img1.dataset.type === img2.dataset.type) {
    result.textContent = "You are a human. Congratulations!";
  } else {
    result.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

/* ---------- Init ---------- */
loadImages();
