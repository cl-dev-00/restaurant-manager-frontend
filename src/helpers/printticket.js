import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export function print(cliente, empleado, mesa, subtotal, impuestos, total, items) {
    var body = [];
    Object.keys(items).forEach(i => {
        let cantidad = items[i].cantidad;
        let nombre = items[i].nombre_item;
        let importe = parseFloat(items[i].importe).toFixed(2);
        //  console.log("Item: " + cantidad + " | " + nombre + " | " + importe);
        body.push({
            cant: cantidad,
            nom: nombre,
            imp: importe
        });
    });
    let espacio = Object.keys(body).length; 
    const doc = new jsPDF("p", "mm", [80, 100+(espacio*9)]);
    var fila = 0;
    doc.setFont("courier", "bold");
    doc.setFontSize(14);
    doc.text(17, fila += 10, "POS Restaurante");
    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    doc.text(3, fila += 7, "Alameda Roosevelt, Centro Comercial ");
    doc.text(8, fila += 4, "Granada S.S RBD SALVADOR MUNDO");
    doc.text(24, fila += 4, "Tel: 1234-5678");
    doc.text(3, fila += 8, "Cliente: " + cliente);
    doc.text(3, fila += 4, "Atendido por: " + empleado);
    doc.text(3, fila += 4, "Mesa: " + mesa);
    doc.text(3, fila += 5, "----------------------------------");
    doc.autoTable({
        theme: 'plain',
        styles: { font: 'courier' },
        rowPageBreak: 'auto',
        margin: { top: 5, right: 3, left: 3, bottom: 10},
        startY: 45,
        head: [{ cant: 'Cant.', nom:'Item', imp:'Importe'},],
        body: body,
    }); 
    fila += (espacio+1)*9; 
    doc.text(3, fila += 2, "----------------------------------");
    doc.text(3, fila += 8, "Sub Total:               $" + parseFloat(subtotal).toFixed(2));
    doc.text(3, fila += 4, "Impuestos:               $" + parseFloat(impuestos).toFixed(2));
    doc.setFont("courier", "bold");
    doc.text(3, fila += 4, "Total:                   $" + parseFloat(total).toFixed(2));
    doc.setFont("courier", "normal");
    doc.text(3, fila += 10, " ***  Gracias por su visita   ***");  
    setTimeout(()=>{
        window.open(URL.createObjectURL(doc.output("blob"))); 
    }, 2000);
   
}; 

export function printCard(cliente, empleado, mesa, subtotal, impuestos, total, items) {
    var body = [];
    Object.keys(items).forEach(i => {
        let cantidad = items[i].cantidad;
        let nombre = items[i].menu_item.nombre_item;
        let importe = parseFloat(items[i].importe).toFixed(2);
        //  console.log("Item: " + cantidad + " | " + nombre + " | " + importe);
        body.push({
            cant: cantidad,
            nom: nombre,
            imp: importe
        });
    });
    let espacio = Object.keys(body).length; 
    const doc = new jsPDF("p", "mm", [80, 100+(espacio*9)]);
    var fila = 0;
    doc.setFont("courier", "bold");
    doc.setFontSize(14);
    doc.text(17, fila += 10, "POS Restaurante");
    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    doc.text(3, fila += 7, "Alameda Roosevelt, Centro Comercial ");
    doc.text(8, fila += 4, "Granada S.S RBD SALVADOR MUNDO");
    doc.text(24, fila += 4, "Tel: 1234-5678");
    doc.text(3, fila += 8, "Cliente: " + cliente);
    doc.text(3, fila += 4, "Atendido por: " + empleado);
    doc.text(3, fila += 4, "Mesa: " + mesa);
    doc.text(3, fila += 5, "----------------------------------");
    doc.autoTable({
        theme: 'plain',
        styles: { font: 'courier' },
        rowPageBreak: 'auto',
        margin: { top: 5, right: 3, left: 3, bottom: 10},
        startY: 45,
        head: [{ cant: 'Cant.', nom:'Item', imp:'Importe'},],
        body: body,
    }); 
    fila += (espacio+1)*9; 
    doc.text(3, fila += 2, "----------------------------------");
    doc.text(3, fila += 8, "Sub Total:               $" + parseFloat(subtotal).toFixed(2));
    doc.text(3, fila += 4, "Impuestos:               $" + parseFloat(impuestos).toFixed(2));
    doc.setFont("courier", "bold");
    doc.text(3, fila += 4, "Total:                   $" + parseFloat(total).toFixed(2));
    doc.setFont("courier", "normal");
    doc.text(3, fila += 10, " ***  Gracias por su visita   ***");  
    setTimeout(()=>{
        window.open(URL.createObjectURL(doc.output("blob"))); 
    }, 2000);
};


