import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const converPDF = (component) => {
  
    const input = component.current;


    html2canvas(input, { scale: 1 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();

      const xOffset = 10;
      const yOffset = 10;
      // const imgWidth = pdf.internal.pageSize.getWidth() - 20;
      // const imgHeight = pdf.internal.pageSize.getHeight() - 20;

    //   pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);  
      pdf.addImage(imgData, "PNG", xOffset, yOffset);  
      pdf.save("boleta.pdf");
    });
  };
  