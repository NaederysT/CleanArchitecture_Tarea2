class MessageController {
  constructor(getMessageUseCase) {
    this.getMessageUseCase = getMessageUseCase;
  }

  showMessage() {
    const message = this.getMessageUseCase.execute();

    console.log(message);
  }
}

export default MessageController;