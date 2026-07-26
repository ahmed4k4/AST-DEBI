const image = document.getElementById("mapImage");
const canvas = document.getElementById("debugCanvas");
const ctx = canvas.getContext("2d");
const checkbox = document.getElementById("checkbox");

let DEBUG = checkbox.checked;

function updateDebugMode() {
  if (DEBUG) {
    canvas.style.display = "block";
    drawAreas();
  } else {
    canvas.style.display = "none";
  }
}
checkbox.addEventListener("change", () => {
  DEBUG = checkbox.checked;
  updateDebugMode();
});

image.onload = () => {
  canvas.width = image.width;
  canvas.height = image.height;

  updateDebugMode();
};

function drawAreas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const areas = document.querySelectorAll("area");

  areas.forEach((area) => {
    const coords = area.coords.split(",").map(Number);

    ctx.strokeStyle = "rgb(26, 200, 206)";

    ctx.fillStyle = "rgba(40, 228, 81, 0.34)";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(coords[0], coords[1]);

    for (let i = 2; i < coords.length; i += 2) {
      ctx.lineTo(coords[i], coords[i + 1]);
    }

    ctx.closePath();

    ctx.fill();
    ctx.stroke();
    const textX = (coords[0] + coords[4]) / 2;
    drawText(area.title, textX, coords[3]);
  });
}

function drawText(text, x, y) {
  ctx.font = "16px Arial";

  ctx.fillStyle = "black";
  ctx.textAlign = "center";

  ctx.fillText(text, x, y - 5);
}

function anywhere() {
  alert("do not click anywhere");
}
