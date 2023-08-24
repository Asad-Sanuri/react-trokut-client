import html2pdf from "html2pdf.js";

const generatePDF = (triangle) => {
  const triangleElement = document.createElement("div");
  const svg = `<svg width="350" height="350">
                <polygon points="${triangle.vertex1.x},${triangle.vertex1.y} ${triangle.vertex2.x}, ${triangle.vertex2.y} ${triangle.vertex3.x},${triangle.vertex3.y}"
                fill="lightblue" stroke="black" />
              </svg>`;
  triangleElement.innerHTML = svg;

  const options = {
    margin: 10,
    filename: "triangle.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  html2pdf().from(triangleElement).set(options).save(); // Use the save function
};

export default generatePDF;
