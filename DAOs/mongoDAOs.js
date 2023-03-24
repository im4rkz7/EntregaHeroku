import containerMongoDb, {
  usersMongoDb,
} from "../controller/containerMongoDb.js";

class MongoDAO {
  addMessage = async (messageToAdd) => {
    try {
      await containerMongoDb.addMessage(messageToAdd);
    } catch (e) {
      console.log(e.message);
    }
  };

  getMessages = async () => {
    try {
      return (await containerMongoDb.getMessages()) || [];
    } catch (e) {
      console.log(e.message);
    }
  };
}

class Users {
  addUser = async (userToAdd) => {
    try {
      await usersMongoDb.addUser(userToAdd);
    } catch (e) {
      console.log(e.message);
    }
  };

  getUsers = async () => {
    try {
      return (await usersMongoDb.getUsers()) || [];
    } catch (e) {
      console.log(e.message);
    }
  };
}

export const usersDAO = new Users();

export default MongoDAO;
