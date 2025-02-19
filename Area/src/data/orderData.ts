export interface OrderRecord {
  id: string;
  tableNo: string;
  time: string;
  status: string;
  customer: string;
  items: string;
  itemCount: number;
  paymentStatus: string;
  amount: string;
}

export const orderData: Record<string, OrderRecord[]> = {
  "Active Orders": [
    {
      id: "2130",
      tableNo: "RW 42",
      time: "10:05 AM",
      status: "Incoming",
      customer: "Emeka John",
      items:
        "1 Red wine, 5 Casamigos(Shots), 2 Jollof rice, 2 BBQ chicken, 1 Large pizza",
      itemCount: 10,
      paymentStatus: "Paid",
      amount: "₦60,000",
    },
    {
      id: "2131",
      tableNo: "RW 43",
      time: "10:10 AM",
      status: "Preparing",
      customer: "Jane Doe",
      items:
        "1 Red wine, 5 Casamigos(Shots), 2 Jollof rice, 2 BBQ chicken, 1 Large pizza",
      itemCount: 10,
      paymentStatus: "Paid",
      amount: "₦60,000",
    },
    {
      id: "2132",
      tableNo: "RW 44",
      time: "10:20 AM",
      status: "Ready",
      customer: "Blessing Daniels",
      items:
        "1 Red wine, 5 Casamigos(Shots), 2 Jollof rice, 2 BBQ chicken, 1 Large pizza",
      itemCount: 10,
      paymentStatus: "Pending",
      amount: "₦60,000",
    },
  ],
  Served: [
    {
      id: "2133",
      tableNo: "RW 45",
      time: "10:30 AM",
      status: "Served",
      customer: "John Smith",
      items: "2 Large Pizzas, 3 Sodas, 1 Bottle of Wine",
      itemCount: 7,
      paymentStatus: "Paid",
      amount: "₦45,000",
    },
    {
      id: "2134",
      tableNo: "RW 46",
      time: "10:35 AM",
      status: "Served",
      customer: "Anna Green",
      items: "1 Pasta, 1 Salad, 2 Sodas",
      itemCount: 4,
      paymentStatus: "Paid",
      amount: "₦30,000",
    },
    {
      id: "2135",
      tableNo: "RW 47",
      time: "10:40 AM",
      status: "Served",
      customer: "James Brown",
      items: "1 Pizza, 1 Soda",
      itemCount: 2,
      paymentStatus: "Paid",
      amount: "₦15,000",
    },
  ],
  Canceled: [
    {
      id: "2136",
      tableNo: "RW 48",
      time: "11:00 AM",
      status: "Canceled",
      customer: "Grace Adams",
      items: "3 BBQ Chicken, 2 Large Pizzas",
      itemCount: 5,
      paymentStatus: "Refunded",
      amount: "₦40,000",
    },
    {
      id: "2137",
      tableNo: "RW 49",
      time: "11:15 AM",
      status: "Canceled",
      customer: "Michael Johnson",
      items: "1 Salad, 1 Soda",
      itemCount: 2,
      paymentStatus: "Refunded",
      amount: "₦5,000",
    },
  ],
  Completed: [
    {
      id: "2138",
      tableNo: "RW 50",
      time: "11:30 AM",
      status: "Completed",
      customer: "Sarah Wilson",
      items: "2 Pasta, 2 Sodas",
      itemCount: 4,
      paymentStatus: "Paid",
      amount: "₦25,000",
    },
    {
      id: "2139",
      tableNo: "RW 51",
      time: "11:45 AM",
      status: "Completed",
      customer: "David Green",
      items: "1 BBQ Chicken, 1 Large Pizza",
      itemCount: 2,
      paymentStatus: "Paid",
      amount: "₦35,000",
    },
  ],
  "Unconfirmed Payment": [
    {
      id: "2140",
      tableNo: "RW 52",
      time: "12:00 PM",
      status: "Unconfirmed Payment",
      customer: "Peter Parker",
      items: "1 Large Pizza, 2 Sodas",
      itemCount: 3,
      paymentStatus: "Pending",
      amount: "₦20,000",
    },
    {
      id: "2141",
      tableNo: "RW 53",
      time: "12:15 PM",
      status: "Unconfirmed Payment",
      customer: "Tony Stark",
      items: "5 Casamigos(Shots), 2 Jollof rice",
      itemCount: 7,
      paymentStatus: "Pending",
      amount: "₦60,000",
    },
  ],
};
