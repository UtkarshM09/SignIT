const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const fontPicker = document.getElementById("fontPicker");
const canvas = document.getElementById("myCanvas");
const retrieveButton = document.getElementById("retrieveButton");

const ctx = canvas.getContext("2d");

var is_drawing = false;
let lastX;
let lastY;

colorPicker.addEventListener("change", (e) => {
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
  console.log("Mouse change");
});

canvas.addEventListener("mousedown", (e) => {
  is_drawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
  console.log("Mouse Moving Dowm");
});

canvas.addEventListener("mousemove", (e) => {
  if (is_drawing) {
    console.log("Mouse Moving");
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener("mouseup", (e) => {
  is_drawing = false;
});

canvasColor.addEventListener("change", (e) => {
  ctx.fillStyle = e.target.value;
  ctx.fillRect(0, 0, 800, 500);
});

fontPicker.addEventListener("change", (e) => {
  ctx.lineWidth = e.target.value;
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener("click", () => {
  localStorage.setItem("canvasContents", canvas.toDataURL());

  let link = document.createElement("c");

  link.download = "my-canvas.png";
  link.href = canvas.toDataURL();
  link.click();
});

retrieveButton.addEventListener("click", () => {
  let savedCanvas = localStorage.getItem("canvasContents");
  if (savedCanvas) {
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img, 0, 0);
  }
});
