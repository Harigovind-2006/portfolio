document.getElementById("downloadCV").addEventListener("click", function () {
  const link = document.createElement("a");
  link.href = "harigovind.pdf"; // your CV file name
  link.download = "harigovind.pdf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});