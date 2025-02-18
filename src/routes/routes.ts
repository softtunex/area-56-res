const routes = [
  "/dashboard",
  "/orders",
  "/orders/:orderId",
  "/user-management",
  "/roles-permission",
  "/inventory",
  "/profile",
  "/notifications",
  "/login",
  "/unauthorized",
  "/not-found",
];

export const isValidRoute = (path: string) => routes.includes(path);

export default routes;
