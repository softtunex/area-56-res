const routes = [
  "/dashboard",
  "/orders",
  "/user-management",
  "/roles-permission",
  "/inventory",
];

export const isValidRoute = (path: string) => routes.includes(path);

export default routes;
