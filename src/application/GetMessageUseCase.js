class GetMessageUseCase {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
  }

  execute() {
    const message = this.messageRepository.getMessage();

    return message.getText();
  }
}
