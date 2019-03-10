import { Message, ReceivedMessage, SentMessage, Contact } from "../models";

const contactsExist = async ids => {
  const contacts = await Contact.findAll({
    where: {
      id: { $in: ids }
    }
  });
  if (contacts.length === ids.length) {
    return true;
  }
  return false;
};

const Messages = {
  async create(req, res) {
    const sender = req.body.senderId;
    const recipients = req.body.recipients;
    const contacts = await contactsExist([...recipients, sender]);
    if (contacts) {
      try {
        // create message
        const message = await Message.create({
          message: req.body.message,
          status: "pending"
        });

        // add message to contacts sent messages record
        await SentMessage.create({
          senderId: sender,
          messageId: message.id
        });

        // add message to recipients received list record
        const messageReceipients = [];
        req.body.recipients.forEach(recipient => {
          messageReceipients.push({
            receiverId: recipient,
            messageId: message.id
          });
        });
        await ReceivedMessage.bulkCreate(messageReceipients);

        return res
          .status(201)
          .send({ message: "Successfully created", message });
      } catch (error) {
        return res
          .status(400)
          .send({ message: "error creating message", error: error.message });
      }
    }
    return res
      .status(404)
      .send({ message: "sender or receiver id could not be found" });
  },

  update(req, res) {
    Message.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(message => {
        if (!message) {
          return res.status(404).send({ message: "message not found" });
        }
        return message
          .update({
            status: req.body.status || message.status
          })
          .then(updatedMessage =>
            res
              .status(200)
              .send({ message: "Update Successful", updatedMessage })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(err => res.status(400).send(err));
  }
};
export default Messages;
