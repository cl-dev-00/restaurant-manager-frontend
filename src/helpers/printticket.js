import { jsPDF } from "jspdf";

export function print(empleado, mesa) {
        
  const doc = new jsPDF("p", "mm", [80, 130]);

  doc.setFont("courier", "bold");
  doc.setFontSize(14);
  doc.text(17, 10, "POS Restaurante");

  doc.setFont("courier", "normal");
  doc.setFontSize(10);
  doc.text(3, 17, "Alameda Roosevelt, Centro Comercial ");
  doc.text(8, 21, "Granada S.S RBD SALVADOR MUNDO");
  doc.text(24, 25, "Tel: 1234-5678");
  
  doc.text(3, 33, "Atendido por: "+ empleado);
  doc.text(3, 37, "Mesa: "+ mesa);

  doc.text(3, 43, "----------------------------------");
  doc.text(3, 46, "Cant. | Item              | Prec.");
  doc.text(3, 49, "----------------------------------");
  doc.text(3, 51, "Cant. | Item              | Prec.");
  doc.text(3, 54, "Cant. | Item              | Prec.");
  doc.text(3, 57, "Cant. | Item              | Prec.");
  doc.text(3, 60, "----------------------------------");
  doc.text(3, 66, "Sub Total:                 $100.00");
  doc.text(3, 70, "Impuestos:                 $13.00 ");
  doc.setFont("courier", "bold");
  doc.text(3, 74, "Total:                     $113.00");
  doc.setFont("courier", "normal");

  
  doc.text(3, 90, " ***  Gracias por su visita   ***");

  window.open(URL.createObjectURL(doc.output("blob")))



 //doc.output('/ticket');
 // doc.save("a5.pdf");
  
}
