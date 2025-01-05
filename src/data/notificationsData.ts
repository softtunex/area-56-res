export const notifications = [
  {
    time: "12:30PM",
    message:
      "New order received for RW4. Please confirm items and estimated preparation time.",
    buttonLabel: "View Orders",
    buttonAction: () => console.log("Navigating to View Orders"),
    category: "Orders",
  },
  {
    time: "09:30AM",
    message:
      "Item [specific dish/drink] is out of stock. Suggest alternatives to guests.",
    buttonLabel: "View Inventory",
    buttonAction: () => console.log("Navigating to View Inventory"),
    category: "Inventory",
  },
  {
    time: "12:30PM",
    message:
      "Your table RW4 has a guest! Please welcome them and guide them through the menu.",
    buttonLabel: "View Inventory",
    buttonAction: () => console.log("Navigating to View Inventory"),
    category: "Inventory",
  },
  {
    time: "12:30PM",
    message:
      "Payment for RW4 has been successfully processed. Confirm with the guest.",
    buttonLabel: "View Customer Order",
    buttonAction: () => console.log("Navigating to Customer Order"),
    category: "Customer Orders",
  },
  {
    time: "12:30PM",
    message:
      "Order for RW4 is being prepared. Notify the guest about an estimated time.",
    buttonLabel: "View Orders",
    buttonAction: () => console.log("Navigating to View Orders"),
    category: "Orders",
  },
  {
    time: "Yesterday 12:30PM",
    message: "Order for RW4 is ready to be served. Please deliver promptly!",
    buttonLabel: "View Orders",
    buttonAction: () => console.log("Navigating to View Orders"),
    category: "Orders",
  },
];
