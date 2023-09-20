import mongoose from "mongoose";

import app from "./app.js";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      const listRoutes = () => {
        const routes = [];
        app._router.stack.forEach((middleware) => {
          if (middleware.route) {
            routes.push(
              `${Object.keys(middleware.route.methods)} - ${
                middleware.route.path
              }`
            );
          }
        });
        console.log(routes);
        return routes;
      };
      listRoutes();
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
