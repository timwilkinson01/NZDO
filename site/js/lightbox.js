// Minimal lightbox for .gallery links. Without JS the links simply open the image.
(function () {
  const links = [...document.querySelectorAll(".gallery a")];
  if (!links.length) return;

  const box = document.createElement("dialog");
  box.className = "lightbox";
  box.innerHTML =
    '<img alt="">' +
    '<button class="lb-prev" aria-label="Previous">‹</button>' +
    '<button class="lb-next" aria-label="Next">›</button>' +
    '<button class="lb-close" aria-label="Close">×</button>';
  document.body.append(box);
  const img = box.querySelector("img");
  let i = 0;

  const show = (n) => {
    i = (n + links.length) % links.length;
    img.src = links[i].href;
    img.alt = links[i].querySelector("img")?.alt || "";
  };

  links.forEach((a, n) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      show(n);
      box.showModal();
    })
  );

  box.querySelector(".lb-prev").onclick = () => show(i - 1);
  box.querySelector(".lb-next").onclick = () => show(i + 1);
  box.querySelector(".lb-close").onclick = () => box.close();
  box.addEventListener("click", (e) => { if (e.target === box) box.close(); });
  box.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(i - 1);
    if (e.key === "ArrowRight") show(i + 1);
  });
})();
