import containerArchivo from "../controller/containerArchivo.js";

class ArchivoDAO {
  addMessage = async (messageToAdd) => {
    const messages = await this.getMessages();

    if (!messages) {
      const messagesArray = {
        id: "1",
        messages: [],
      };

      messagesArray.messages.push({ ...messageToAdd, id: "0" });
      await containerArchivo.addMessage([
        JSON.stringify(messagesArray, null, 2),
      ]);
      return;
    }

    messageToAdd.id = messages.messages.length.toString();
    messages.messages.push(messageToAdd);

    await containerArchivo.addMessage(JSON.stringify(messages, null, 2));
  };

  getMessages = async () => {
    let messages = await containerArchivo.getMessages();

    if (messages.length > 0) {
      messages = JSON.parse(messages);
    }

    return messages;
  };
}

export default ArchivoDAO;
