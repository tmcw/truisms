module.exports = function render(
  canvas,
  truism,
  colors,
  { innerWidth, innerHeight }
) {
  canvas.width = innerWidth * 2;
  canvas.height = innerHeight * 2;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, innerWidth * 2, innerHeight * 2);
  ctx.fillStyle = colors[1];
  ctx.font = "70px Futura";
  // wrapping text
  let words = truism.split(/\s+/);
  let lines = [];
  let line = [];
  for (let word of words) {
    let newWidth = ctx.measureText(line.concat(word).join(" ")).width;
    if (newWidth > innerWidth) {
      lines.push(line);
      line = [word];
    } else {
      line.push(word);
    }
  }
  ctx.translate(0, innerHeight / 1.35);
  lines.push(line);
  lines.forEach((line, i) => {
    let joinedLine = line.join(" ").toUpperCase();
    let leftOffset = (innerWidth * 2 - ctx.measureText(joinedLine).width) / 2;
    ctx.fillText(joinedLine, leftOffset, i * 90);
  });
};
