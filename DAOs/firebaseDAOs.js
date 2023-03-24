import containerFirebase from "../controller/containerFirebase.js";

class FirebaseDAO {
  addMessage = async (messageToAdd) => {
    try {
      const messages = await this.getMessages();

      const id = messages ? messages.messages.length : 0;

      await containerFirebase.addMessage({
        ...messageToAdd,
        id: id.toString(),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  getMessages = async () => {
    try {
      const messages = (await containerFirebase.getMessages()) || [];

      return messages;
    } catch (e) {
      console.log(e.message);
    }
  };
}

export default FirebaseDAO;
