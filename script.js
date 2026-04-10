(function () {
  const card = document.getElementById("card");
  const toast = document.getElementById("toast");

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  document.querySelectorAll(".copy-btn[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      if (!text || !navigator.clipboard) {
        showToast("이 브라우저에서는 복사를 지원하지 않습니다.");
        return;
      }
      navigator.clipboard.writeText(text).then(function () {
        showToast("복사했습니다: " + text);
      }).catch(function () {
        showToast("복사에 실패했습니다.");
      });
    });
  });

  if (!card) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  card.addEventListener("mousemove", function (e) {
    var rect = card.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    var rotX = (y * -6).toFixed(2);
    var rotY = (x * 8).toFixed(2);
    card.style.transform =
      "perspective(900px) rotateX(" + rotX + "deg) rotateY(" + rotY + "deg)";
  });

  card.addEventListener("mouseleave", function () {
    card.style.transform = "";
  });
})();
