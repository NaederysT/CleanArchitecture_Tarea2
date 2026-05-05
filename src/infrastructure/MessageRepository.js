import Message from "../../domain/entities/Message.js";

class MessageRepository {
  getMessage() {
    return new Message("Hola mundo desde Clean Architecture");
  }
}

export default MessageRepository;