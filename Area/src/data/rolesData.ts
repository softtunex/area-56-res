export const rolesData = [
  {
    name: "Location Admin",
    color: "red",
    permissionGroups: [
      {
        title: "Access permission",
        description:
          "Controls general access to the system and dashboard visibility based on roles.",
        permissions: [
          {
            name: "Login access",
            description: "Login to the platform",
            enabled: false,
          },
          {
            name: "Dashboard access(Location Admin)",
            description: "Access admin dashboard",
            enabled: false,
          },
          {
            name: "Dashboard access(Super-Admin)",
            description: "Access super admin dashboard",
            enabled: false,
          },
          {
            name: "Dashboard access(Waiter)",
            description: "Access waiter dashboard",
            enabled: false,
          },
        ],
      },
      {
        title: "Shift management permission",
        description:
          "Manages access to shift-related features and notifications.",
        permissions: [
          {
            name: "View shift schedule",
            description: "View schedule details",
            enabled: false,
          },
          {
            name: "Receive shift notification",
            description: "Receive notifications related to shifts",
            enabled: false,
          },
        ],
      },
      {
        title: "Table management permission",
        description:
          "Manages access to table assignments and real-time table statuses.",
        permissions: [
          {
            name: "View assigned table",
            description: "Enables viewing of assigned tables",
            enabled: false,
          },
          {
            name: "Receive table notification",
            description: "Receive notifications for table updates",
            enabled: false,
          },
        ],
      },
      {
        title: "Order management permission",
        description:
          "Grants access to order creation, modification, status updates, and notifications.",
        permissions: [
          {
            name: "Place order",
            description: "Create a new order",
            enabled: false,
          },
          {
            name: "Modify order",
            description: "Edit an existing order",
            enabled: false,
          },
          {
            name: "Update order status",
            description: "Change the status of an order",
            enabled: false,
          },
          {
            name: "View order details",
            description: "See detailed order information",
            enabled: false,
          },
          {
            name: "Cancel order",
            description: "Cancel an existing order",
            enabled: false,
          },
          {
            name: "Receive order notification",
            description: "Receive notifications for order updates",
            enabled: false,
          },
        ],
      },
      {
        title: "Inventory management permission",
        description: "Manages access to the inventory management page.",
        permissions: [
          {
            name: "View active products table",
            description: "View a list of active products",
            enabled: false,
          },
          {
            name: "Create new products",
            description: "Add new products to the inventory",
            enabled: false,
          },
          {
            name: "Update active product table",
            description: "Edit existing product details",
            enabled: false,
          },
          {
            name: "Delete product",
            description: "Remove products from the inventory",
            enabled: false,
          },
        ],
      },
    ],
  },

  {
    name: "Waiter",
    color: "green",
    permissionGroups: [
      {
        title: "Access permission",
        description:
          "Controls general access to the system and dashboard visibility based on roles.",
        permissions: [
          {
            name: "Login access",
            description: "Login to the platform",
            enabled: false,
          },
          {
            name: "Dashboard access(Location Admin)",
            description: "Access admin dashboard",
            enabled: false,
          },
          {
            name: "Dashboard access(Super-Admin)",
            description: "Access super admin dashboard",
            enabled: false,
          },
          {
            name: "Dashboard access(Waiter)",
            description: "Access waiter dashboard",
            enabled: false,
          },
        ],
      },
      {
        title: "Shift management permission",
        description:
          "Manages access to shift-related features and notifications.",
        permissions: [
          {
            name: "View shift schedule",
            description: "View schedule details",
            enabled: false,
          },
          {
            name: "Receive shift notification",
            description: "Receive notifications related to shifts",
            enabled: false,
          },
        ],
      },
      {
        title: "Table management permission",
        description:
          "Manages access to table assignments and real-time table statuses.",
        permissions: [
          {
            name: "View assigned table",
            description: "Enables viewing of assigned tables",
            enabled: false,
          },
          {
            name: "Receive table notification",
            description: "Receive notifications for table updates",
            enabled: false,
          },
          {
            name: "Enables viewing status of each assigned table",
            description: "Allows viewing real-time status of tables",
            enabled: false,
          },
        ],
      },
      {
        title: "Order management permission",
        description:
          "Grants access to order creation, modification, status updates, and notifications.",
        permissions: [
          {
            name: "Place order",
            description: "Create a new order",
            enabled: false,
          },
          {
            name: "Modify order",
            description: "Edit an existing order",
            enabled: false,
          },
          {
            name: "Update order status",
            description: "Change the status of an order",
            enabled: false,
          },
          {
            name: "View order details",
            description: "See detailed order information",
            enabled: false,
          },
          {
            name: "Cancel order",
            description: "Cancel an existing order",
            enabled: false,
          },
          {
            name: "Receive order notification",
            description: "Receive notifications for order updates",
            enabled: false,
          },
        ],
      },
      {
        title: "Inventory management permission",
        description: "Manages access to the inventory management page.",
        permissions: [
          {
            name: "View active products table",
            description: "View a list of active products",
            enabled: false,
          },
          {
            name: "Create new products",
            description: "Add new products to the inventory",
            enabled: false,
          },
          {
            name: "Update active product table",
            description: "Edit existing product details",
            enabled: false,
          },
          {
            name: "Delete product",
            description: "Remove products from the inventory",
            enabled: false,
          },
        ],
      },
    ],
  },
  {
    name: "Vendor",
    color: "red",
    permissionGroups: [
      {
        title: "Access permission",
        description:
          "Controls general access to the system and dashboard visibility based on roles.",
        permissions: [
          {
            name: "Login access",
            description: "Login to the platform",
            enabled: false,
          },
          {
            name: "Dashboard access(Location Admin)",
            description: "Access admin dashboard",
            enabled: false,
          },
          {
            name: "Dashboard access(Super-Admin)",
            description: "Access super admin dashboard",
            enabled: false,
          },
          {
            name: "Dashboard access(Waiter)",
            description: "Access waiter dashboard",
            enabled: false,
          },
        ],
      },
      {
        title: "Shift management permission",
        description:
          "Manages access to shift-related features and notifications.",
        permissions: [
          {
            name: "View shift schedule",
            description: "View schedule details",
            enabled: false,
          },
          {
            name: "Receive shift notification",
            description: "Receive notifications related to shifts",
            enabled: false,
          },
        ],
      },
      {
        title: "Table management permission",
        description:
          "Manages access to table assignments and real-time table statuses.",
        permissions: [
          {
            name: "View assigned table",
            description: "Enables viewing of assigned tables",
            enabled: false,
          },
          {
            name: "Receive table notification",
            description: "Receive notifications for table updates",
            enabled: false,
          },
          {
            name: "Enables viewing status of each assigned table",
            description: "Allows viewing real-time status of tables",
            enabled: false,
          },
        ],
      },
      {
        title: "Order management permission",
        description:
          "Grants access to order creation, modification, status updates, and notifications.",
        permissions: [
          {
            name: "Place order",
            description: "Create a new order",
            enabled: false,
          },
          {
            name: "Modify order",
            description: "Edit an existing order",
            enabled: false,
          },
          {
            name: "Update order status",
            description: "Change the status of an order",
            enabled: false,
          },
          {
            name: "View order details",
            description: "See detailed order information",
            enabled: false,
          },
          {
            name: "Cancel order",
            description: "Cancel an existing order",
            enabled: false,
          },
          {
            name: "Receive order notification",
            description: "Receive notifications for order updates",
            enabled: false,
          },
        ],
      },
      {
        title: "Inventory management permission",
        description: "Manages access to the inventory management page.",
        permissions: [
          {
            name: "View active products table",
            description: "View a list of active products",
            enabled: false,
          },
          {
            name: "Create new products",
            description: "Add new products to the inventory",
            enabled: false,
          },
          {
            name: "Update active product table",
            description: "Edit existing product details",
            enabled: false,
          },
          {
            name: "Delete product",
            description: "Remove products from the inventory",
            enabled: false,
          },
        ],
      },
    ],
  },
];
