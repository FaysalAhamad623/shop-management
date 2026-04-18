import { useParams, useNavigate } from "react-router-dom";
import { getOrders, cancelOrder } from "../store/orderStore";
import OrderTimeline from "../components/OrderTimeline";
import { useRef } from "react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import logo from "../images/download.jpg";

export default function OrderDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const invoiceRef = useRef();

  const orders = getOrders();
  const order = orders.find((o) => o.id.toString() === id);

  if (!order) return <p className="p-6">Order not found ❌</p>;

  // 🔥 DOWNLOAD PDF (FINAL FIXED)
const downloadInvoice = () => {
  try {
    const pdf = new jsPDF();

    // 📏 layout helpers
    const startX = 10;
    let y = 15;
    const lineGap = 8;

    // 🔷 HEADER BOX
    pdf.setDrawColor(0);
    pdf.rect(10, 10, 190, 25); // outer header box

    // 🔷 TITLE
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(0, 102, 204);
    pdf.setFontSize(18);
    pdf.text("ShopX Invoice", 12, 20);

    // 🔷 ORDER INFO (right side)
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.setFont("helvetica", "normal");

    pdf.text(`Order ID: ${order.id}`, 140, 18);
    pdf.text(`Date: ${order.date}`, 140, 24);
    pdf.text(`Status: ${order.status}`, 140, 30);

    y = 45;

    // 🔷 CUSTOMER BOX
    pdf.rect(10, y, 190, 20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Customer Info", 12, y + 6);

    pdf.setFont("helvetica", "normal");
    pdf.text(`Name: ${order.name}`, 12, y + 12);
    pdf.text(`Phone: ${order.phone}`, 12, y + 18);

    y += 30;

    // 🔷 TABLE HEADER
    pdf.setFont("helvetica", "bold");
    pdf.setFillColor(240, 240, 240);
    pdf.rect(10, y, 190, 10, "F"); // header background

    pdf.text("Item", 12, y + 7);
    pdf.text("Qty", 110, y + 7);
    pdf.text("Price", 160, y + 7);

    y += 10;

    // 🔷 TABLE BODY
    pdf.setFont("helvetica", "normal");

    order.items.forEach((item, index) => {

      // row border
      pdf.rect(10, y, 190, 10);

      pdf.text(item.name, 12, y + 7);
      pdf.text(String(item.quantity), 110, y + 7);
      pdf.text(`$${item.price * item.quantity}`, 160, y + 7);

      y += 10;

      // 🔥 page break
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }
    });

    // 🔷 TOTAL BOX
    y += 5;
    pdf.setFont("helvetica", "bold");
    pdf.rect(120, y, 80, 12);

    pdf.text(`Total: $${order.total}`, 130, y + 8);

    // 🔷 FOOTER
    y += 20;
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text("Thank you for shopping with ShopX 💚", 10, y);

    // 🔥 SAVE
    pdf.save(`Invoice-${order.id}.pdf`);

    console.log("PRO PDF DONE ✅");

  } catch (err) {
    console.log("PDF ERROR:", err);
  }
};

  return (
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", padding: "24px" }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>📦 Order Details</h1>

        <button
          onClick={downloadInvoice}
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "6px",
          }}
        >
          Download Invoice
        </button>
      </div>

      {/* INVOICE */}
      <div
        ref={invoiceRef}
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          position: "relative",
          overflow: "hidden",
        }}
      >

        {/* WATERMARK */}
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "60px",
            color: "rgba(0,0,0,0.05)",
            fontWeight: "bold",
          }}
        >
          ShopX
        </div>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={logo} alt="logo" style={{ width: "40px" }} />
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>ShopX</h2>
              <p style={{ fontSize: "12px", color: "#555" }}>shopx@email.com</p>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p><b>Order ID:</b> #{order.id}</p>
            <p><b>Date:</b> {order.date}</p>

            <span
              style={{
                backgroundColor:
                  order.status === "Delivered"
                    ? "#d1fae5"
                    : order.status === "Processing"
                      ? "#dbeafe"
                      : "#fef3c7",
                color: "#000",
                padding: "4px 8px",
                borderRadius: "6px",
              }}
            >
              {order.status}
            </span>
          </div>

        </div>

        <hr />

        {/* CUSTOMER */}
        <div style={{ marginTop: "10px" }}>
          <p><b>Customer:</b> {order.name}</p>
          <p><b>Phone:</b> {order.phone}</p>
        </div>

        {/* ITEMS */}
        <div style={{ marginTop: "20px" }}>

          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
            <span>Item</span>
            <span>Qty</span>
            <span>Price</span>
          </div>

          <hr />

          {order.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "6px",
              }}
            >
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}

        </div>

        {/* TOTAL */}
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
            Total: ${order.total}
          </h3>
        </div>

        {/* TIMELINE */}
        <div style={{ marginTop: "20px" }}>
          <OrderTimeline status={order.status} />
        </div>

      </div>

      {/* CANCEL */}
      {order.status === "Pending" && (
        <button
          onClick={() => {
            cancelOrder(order.id);
            alert("Order Cancelled ❌");
            navigate("/my-orders");
          }}
          style={{
            marginTop: "16px",
            background: "#ef4444",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "6px",
          }}
        >
          Cancel Order
        </button>
      )}

    </div>
  );
}