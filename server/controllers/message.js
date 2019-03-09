import { Message, ReceivedMessage, SentMessage } from "../models";

const createNewSentMessageRecord = (senderId, messageId) => {
  try {
    SentMessage.create({
      senderId,
      messageId
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
const createReceivedMessageRecords = receipients => {
  try {
    ReceivedMessage.bulkCreate(receipients);
  } catch (error) {
    throw new Error(error.message);
  }
};

const Messages = {
  async create(req, res) {
    try {
      const message = await Message.create({
        message: req.body.message,
        status: "pending"
      });
      await createNewSentMessageRecord(req.body.senderId, message.id);

      const messageReceipients = [];
      req.body.receipients.forEach(receipient => {
        messageReceipients.push({
          receiverId: receipient,
          messageId: message.id
        });
      });
      await createReceivedMessageRecords(messageReceipients);
      res.status(201).send({ message: "message created", message });
    } catch (error) {
      res
        .status(400)
        .send({ message: "error creeating message", error: error.message });
    }
  }
};
export default Messages;
