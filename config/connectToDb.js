import mongoose from "mongoose";
import MongoDAO from "../DAOs/mongoDAOs.js";
import admin from "firebase-admin";
import serviceAccount from "./credentials.json" assert { type: "json" };
import FirebaseDAO from "../DAOs/firebaseDAOs.js";
import ArchivoDAO from "../DAOs/archivoDAOs.js";
import { firebaseConnection, mongoConnection } from "./enviroment.js";

let isConnected;
let dbDAO;
const db = "mongo";

const connectToFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: firebaseConnection,
  });
};

const connectToDb = async (db) => {
  if (!isConnected) {
    try {
      switch (db) {
        case "mongo":
          await mongoose.connect(mongoConnection);
          dbDAO = new MongoDAO();
          break;
        case "firebase":
          connectToFirebase();
          dbDAO = new FirebaseDAO();
          break;
        case "archivo":
          dbDAO = new ArchivoDAO();
          break;
      }

      isConnected = true;
      return;
    } catch (e) {
      console.log(e.message);
    }
  }

  return;
};

connectToDb(db);
export { dbDAO };
