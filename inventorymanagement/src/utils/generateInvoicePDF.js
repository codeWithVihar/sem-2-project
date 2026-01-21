import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateInvoicePDF = (sale) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("INVOICE", 105, 15, { align: "center" });

  doc.setFontSize(11);
  doc.text(`Invoice No: ${sale.invoiceNumber}`, 14, 30);
  doc.text(
    `Date: ${new Date(sale.createdAt).toLocaleDateString()}`,
    14,
    36
  );

  doc.text(`Customer: ${sale.party?.name || "Customer"}`, 14, 46);

  // Table
  autoTable(doc, {
    startY: 55,
    head: [["Product", "Qty", "Rate", "Total"]],
    body: sale.items.map((item) => [
      item.product.name,
      item.quantity,
      `₹${item.price}`,
      `₹${item.total}`
    ])
  });

  const y = doc.lastAutoTable.finalY || 70;

  doc.text(`Sub Total: ₹${sale.subTotal || 0}`, 14, y + 10);
  doc.text(`GST: ₹${sale.gstTotal || 0}`, 14, y + 16);
  doc.text(`Grand Total: ₹${sale.grandTotal || 0}`, 14, y + 22);

  doc.text(`Payment Type: ${sale.paymentType}`, 14, y + 32);
  doc.text(`Paid Amount: ₹${sale.paidAmount}`, 14, y + 38);
  doc.text(`Balance Amount: ₹${sale.balanceAmount || 0}`, 14, y + 44);

  doc.save(`Invoice_${sale.invoiceNumber}.pdf`);
};

export default generateInvoicePDF;
