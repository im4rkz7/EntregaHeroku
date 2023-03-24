import { Message, User } from "../model/index.js";

class ContainerMongoDb {
  addMessage = async (messageToAdd) => {
    const message = new Message(messageToAdd);

    await message.save();
  };

  getMessages = async () => {
    const array = {
      id: "1",
      messages: [],
    };

    const messages = await Message.find({});

    messages.forEach((message) => {
      array.messages.push(message);
    });
    return array;
  };
}

class UsersMongoDb {
  addUser = async (userToAdd) => {
    const user = new User(userToAdd);

    await user.save();
  };

  getUsers = async () => await User.find({});
}

const containerMongoDb = new ContainerMongoDb();
export const usersMongoDb = new UsersMongoDb();

export default containerMongoDb;
