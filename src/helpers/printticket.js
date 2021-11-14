import { jsPDF } from "jspdf";
import 'jspdf-autotable';


export function printTicket(empleado, mesa, subtotal, impuestos, total, items, comercial) {

    const body = items.map(({ menu_item, importe, ...props }) => ({
        ...props,
        nombre: menu_item.nombre_item,
        importe: importe.toFixed(2)
    }));

    const espacio = body.length;

    const doc = new jsPDF("p", "mm", [80, 100 + (espacio * 9)]);

    let fila = 0;
    doc.setFont("courier", "bold");
    doc.setFontSize(14);
    doc.text(17, fila += 10, "POS Restaurante");

    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    doc.text(3, fila += 7, comercial.nombre);
    doc.text(8, fila += 4, comercial.ubicacion);
    doc.text(24, fila += 4, "Tel: " + comercial.telefono);

    doc.text(3, fila += 8, "Atendido por: " + empleado);
    doc.text(3, fila += 4, "Mesa: " + mesa);

    doc.text(3, fila += 5, "----------------------------------");

    doc.autoTable({
        theme: 'plain',
        styles: { font: 'courier' },
        rowPageBreak: 'auto',
        margin: { top: 5, right: 3, left: 3, bottom: 10 },
        startY: 42,
        head: [{ cantidad: 'Cant.', nombre: 'Item', importe: 'Importe' },],
        body,
    });

    fila += (espacio + 1) * 9;

    doc.text(3, fila += 4, "----------------------------------");
    doc.text(3, fila += 8, "Sub Total:               $" + parseFloat(subtotal).toFixed(2));
    doc.text(3, fila += 4, "Impuestos:               $" + parseFloat(impuestos).toFixed(2));
    doc.setFont("courier", "bold");
    doc.text(3, fila += 4, "Total:                   $" + parseFloat(total).toFixed(2));
    doc.setFont("courier", "normal");


    doc.text(3, fila += 10, " ***  Gracias por su visita   ***");

    return doc.output('bloburl');
}
