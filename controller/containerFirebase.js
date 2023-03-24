import admin from "firebase-admin";
import { collectionMessages } from "../config/constans.js";

class ContainerFirebase {
  addMessage = async (messageToAdd) => {
    const db = admin.firestore();
    const query = db.collection(collectionMessages);

    await query.doc(messageToAdd.id.toString()).set(messageToAdd);
  };

  getMessages = async () => {
    const db = admin.firestore();
    const query = db.collection(collectionMessages);

    const querySnapshot = await query.get();

    const messages = {
      id: "1",
      messages: [],
    };

    querySnapshot.forEach((doc) => {
      messages.messages.push({
        id: doc.data().id,
        author: doc.data().author,
        date: doc.data().date,
        text: doc.data().text,
      });
    });

    return messages;
  };
}

const containerFirebase = new ContainerFirebase();

export default containerFirebase;
