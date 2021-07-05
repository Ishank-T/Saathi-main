const router = require("express").Router();
const msal = require("@azure/msal-node");
const axios = require("axios");
let accesstoken;
const config = {
  auth: {
    clientId: "f2ce5625-c559-4d5f-af3c-d6ac8a07c7d3",
    authority: "https://login.microsoftonline.com/common",
    clientSecret: "-vRAb112mX_n~0LC2EA63.32hXbooY.K8M",
    postlogoutRedirectUri: "https://localhost:3000/logout",
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {},
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.error,
    },
  },
};

const cca = new msal.ConfidentialClientApplication(config);
router.get("/", (req, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read", "Mail.read"],
    redirectUri: "http://localhost:3000/redirect",
  };

  cca
    .getAuthCodeUrl(authCodeUrlParameters)
    .then((response) => {
      res.redirect(response);
    })
    .catch((error) => console.log(JSON.stringify(error)));
});

router.get("/redirect", (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    scopes: ["user.read", "mail.read"],
    redirectUri: "http://localhost:3000/redirect",
  };

  cca
    .acquireTokenByCode(tokenRequest)
    .then((response) => {
      accesstoken = response.accessToken;
      res.redirect("/data");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

router.get("/data", (req, res) => {
  console.log(`Bearer ${accesstoken}`);
  const response = axios("https://graph.microsoft.com/v1.0/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${accesstoken}` },
  })
    .then(async (data) => {
      console.log(data.data);
      res.redirect("/project");
    })
    .catch((err) => {
      res.send("Error : Unauthorized " + err);
    });
});

module.exports = router;
