import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();
try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error(error);
}

export default admin;
