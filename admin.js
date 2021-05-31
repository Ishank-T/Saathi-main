const express = require("express");
let router = express.Router();
let configure_db = require("./db");
const session = require("./middlewares/express-mongo-store");
const models = require("./models");
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");

BASE_URL = process.env.BASE_URL || "project";

const configureAdmin = () => {
  const connection = configure_db();
  AdminBro.registerAdapter(AdminBroMongoose);
  const adminBro = new AdminBro({
    databases: [connection],
    rootPath: `/${BASE_URL}/admin`,
    loginPath: `/${BASE_URL}/admin/login`,
    logoutPath: `/${BASE_URL}/admin/logout`,
  });

  router = AdminBroExpress.buildAuthenticatedRouter(
    adminBro,
    {
      authenticate: async (email, pass) => {
        try {
          let admin;
          if (true) {
            admin = {
              username: "admin",
              email: process.env.PROJECT_ADMIN,
            };
          } else {
            admin = await models.User.findByCredentials(
              email,
              pass,
              (isAdmin = true)
            );
          }
          return admin;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
      cookiePassword: process.env.ADMIN_COOKIE_SECRET,
    },
    router,
    {
      secret: process.env.SESSION_SECRET,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      store: session.store,
      resave: true,
      saveUninitialized: true,
    }
  );
  router = AdminBroExpress.buildRouter(adminBro, router);
  return router;
};

module.exports = configureAdmin;