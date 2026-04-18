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

      // 🔥 HEADER
      pdf.setFontSize(18);
      pdf.text("ShopX Invoice", 10, 15);

      pdf.setFontSize(12);
      pdf.text(`Order ID: ${order.id}`, 10, 30);
      pdf.text(`Date: ${order.date}`, 10, 38);
      pdf.text(`Status: ${order.status}`, 10, 46);

      // 🔥 CUSTOMER
      pdf.text(`Customer: ${order.name}`, 10, 60);
      pdf.text(`Phone: ${order.phone}`, 10, 68);

      // 🔥 ITEMS HEADER
      pdf.text("Item", 10, 85);
      pdf.text("Qty", 100, 85);
      pdf.text("Price", 150, 85);

      let y = 95;

      // 🔥 ITEMS LOOP
      order.items.forEach((item) => {
        pdf.text(item.name, 10, y);
        pdf.text(String(item.quantity), 100, y);
        pdf.text(`$${item.price * item.quantity}`, 150, y);
        y += 10;
      });

      // 🔥 TOTAL
      pdf.setFontSize(14);
      pdf.text(`Total: $${order.total}`, 10, y + 10);

      pdf.save(`Invoice-${order.id}.pdf`);

      console.log("PDF SUCCESS ✅");

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