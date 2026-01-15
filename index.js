const categorySelect = document.getElementById("categories");
const items = document.querySelectorAll(".item");
const receiptBox = document.getElementById("receipt");

const customerNameInput = document.getElementById("customerName");
const customerPhoneInput = document.getElementById("customerPhone");

const categoryMap = {
  meals: "Fresh Meals",
  snacks: "Snacks & Beverages",
  catering: "Catering Services",
  special: "Special Menus"
};

const orderState = {
  category: "Not selected",
  item: "Not selected",
  customerName: "",
  customerPhone: "",
  time: "",
  payment: "PENDING"
};

function updateTime() {
  orderState.time = new Date().toLocaleString();
  updateReceipt();
}
setInterval(updateTime, 1000);

function updateReceipt() {
  receiptBox.style.display = "block";
  receiptBox.innerHTML = `
    <div id="receiptContent" style="max-width:360px;margin:auto;border:1px solid #ccc;padding:15px;font-family:Arial;">
      <h2 style="text-align:center;margin:0;">REKIES KITCHEN</h2>
      <p style="text-align:center;font-size:12px;">LIVE ORDER RECEIPT</p>
      <hr>

      <p><strong>Date & Time:</strong> ${orderState.time}</p>

      <hr>
      <p><strong>Customer Name:</strong> ${orderState.customerName || "—"}</p>
      <p><strong>Phone:</strong> ${orderState.customerPhone || "—"}</p>

      <hr>
      <p><strong>Category Selected:</strong> ${orderState.category}</p>
      <p><strong>Item Selected:</strong> ${orderState.item}</p>

      <hr>
      <p><strong>Payment Status:</strong>
        <span style="color:orange;font-weight:bold;">
          ${orderState.payment}
        </span>
      </p>

      <p style="font-size:11px;text-align:center;margin-top:10px;"><b>
        This receipt updates in real time and makes sure you send the receipt to our whatsapp so we can start processing your order</b>
      </p>
    </div>
  `;
}

customerNameInput.addEventListener("input", () => {
  orderState.customerName = customerNameInput.value;
  updateReceipt();
});

customerPhoneInput.addEventListener("input", () => {
  orderState.customerPhone = customerPhoneInput.value;
  updateReceipt();
});

categorySelect.addEventListener("change", () => {
  const selected = categorySelect.value;

  orderState.category =
    selected === "all" ? "All Categories" : categoryMap[selected];

  items.forEach(item => {
    item.style.display =
      selected === "all" || item.classList.contains(selected)
        ? "block"
        : "none";
  });

  updateReceipt();
});

items.forEach(item => {
  item.addEventListener("click", () => {
    const key = Object.keys(categoryMap)
      .find(cat => item.classList.contains(cat));

    orderState.category = categoryMap[key];
    orderState.item = item.textContent.trim();

    updateReceipt();
  });
});

updateTime();


function downloadReceipt() {
  const printWindow = window.open("", "", "width=400,height=600");
  printWindow.document.write(`
    <html>
      <head>
        <title>Receipt</title>
      </head>
      <body>
        ${document.getElementById("receiptContent").outerHTML}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}


function shareReceipt() {
  const receiptText = `
REKIES KITCHEN
LIVE ORDER RECEIPT

Date & Time: ${orderState.time}

Customer Name: ${orderState.customerName || "—"}
Phone: ${orderState.customerPhone || "—"}

Category: ${orderState.category}
Item: ${orderState.item}

Payment Status: ${orderState.payment}
`;

  const encodedText = encodeURIComponent(receiptText);
  window.open(`https://wa.me/?text=${encodedText}`, "_blank");
}

const contactSelect = document.getElementById("contact");

contactSelect.addEventListener("change", () => {
  const choice = contact.value;

  if (choice === "whatsapp") {
    const phoneNumber = "2348012345678"; 
    window.open(`https://wa.me/${9021388925}`, "_blank");
  }

  if (choice === "facebook") {

    window.open("https://facebook.com/RukayatOlaitan Yusuf-lawal", "_blank");
  }
  contact.value = "";
});
