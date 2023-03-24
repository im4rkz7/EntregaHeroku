import fs from "fs";
import { fileMessages } from "../config/constans.js";

class ContainerArchivo {
  constructor(fileMessages) {
    this.fileMessages = fileMessages;
  }

  addMessage = (messages) => {
    fs.promises.writeFile(this.fileMessages, messages);
  };

  getMessages = () => {
    return fs.promises
      .readFile("./messages.json", "utf-8")
      .then((value) => value)
      .catch((e) => console.log(e.message));
  };
}

const containerArchivo = new ContainerArchivo(fileMessages);

export default containerArchivo;
