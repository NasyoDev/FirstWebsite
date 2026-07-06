let timeoutId;
let intervalId;
let counter = 0;

  document.getElementById("showAfter3").onclick = function () {
    setTimeout(function () {
        document.getElementById("message").textContent = "Message shown after 3 seconds";
      }, 3000);
    };

  document.getElementById("startTimeout").onclick = function () {
    timeoutId = setTimeout(function () {
        document.getElementById("message").textContent = "Message shown after 5 seconds";
      }, 5000);
    };

  document.getElementById("cancelTimeout").onclick = function () {
   clearTimeout(timeoutId);
      document.getElementById("message").textContent = "Timeout cancelled";
    };

  document.getElementById("startCounter").onclick = function () {
    clearInterval(intervalId);

      intervalId = setInterval(function () {
        counter++;
        document.getElementById("count").textContent = counter;
      }, 1000);
    };

  document.getElementById("stopCounter").onclick = function () {
      clearInterval(intervalId);
    };