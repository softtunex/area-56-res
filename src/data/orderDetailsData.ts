export const orderDetailsData = {
  id: "12345", // Default order ID, replace dynamically if needed
  date: "09-10-2024",
  time: "01:34 PM",
  status: "Incoming",
  statusColor: "bg-blue-100 text-blue-500", // Default status color
  items: [
    {
      id: 1,
      name: "Red Wine",
      quantity: 1,
      vendor: "The BAR",
      amount: "₦60,000",
    },
    {
      id: 2,
      name: "Casamigos(Shots)",
      quantity: 5,
      vendor: "The BAR",
      amount: "₦60,000",
    },
    {
      id: 3,
      name: "Jollof Rice",
      quantity: 2,
      vendor: "Kilimangaro",
      amount: "₦60,000",
    },
    {
      id: 4,
      name: "Large Jumbo Pizza",
      quantity: 1,
      vendor: "Pizza Jungle",
      amount: "₦60,000",
    },
  ],
  customer: {
    name: "Emeka John",
    email: "emekajohn@gmail.com",
    phone: "08028173391",
  },
  payment: {
    subtotal: "₦60,000",
    method: "Online transfer",
    pending: "₦0",
    totalPaid: "₦60,000",
  },
  message:
    "Please add salt to the rim of the glass of the shots. I would also call extra cheese on the pizza and less pepper.",
};
