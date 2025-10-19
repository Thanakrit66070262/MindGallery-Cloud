import { createHmac } from "crypto";

function secretHash(username) {
  return createHmac("sha256", process.env.COGNITO_CLIENT_SECRET)
    .update(username + process.env.COGNITO_CLIENT_ID)
    .digest("base64");
}

export { secretHash };
