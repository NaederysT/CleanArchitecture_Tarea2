import MessageRepository from "../infrastructure/repositories/MessageRepository.js";
import GetMessageUseCase from "../application/use-cases/GetMessageUseCase.js";
import MessageController from "../interfaces/controllers/MessageController.js";

const messageRepository = new MessageRepository();

const getMessageUseCase = new GetMessageUseCase(messageRepository);

const messageController = new MessageController(getMessageUseCase);

messageController.showMessage();