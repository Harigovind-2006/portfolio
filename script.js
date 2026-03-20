document.getElementById("downloadCV").addEventListener("click", function () {
  const link = document.createElement("a");
  link.href = "Harigovind_Resume.pdf"; // your CV file name
  link.download = "Harigovind_Resume.pdf";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});