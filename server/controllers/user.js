import { User, SentMessage, ReceivedMessage } from "../models";

const Users = {
  create(req, res) {
    if (!req.body.name || !req.body.phoneNumber) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }
    User.findOne({
      where: {
        phoneNumber: req.body.phoneNumber
      }
    }).then(existingNumber => {
      if (existingNumber !== null) {
        return res
          .status(409)
          .send({ message: "A user with this phone number already exists!" });
      }
      return User.create({
        phoneNumber: req.body.phoneNumber,
        name: req.body.name
      })
        .then(user => res.status(201).send({ message: "User created", user }))
        .catch(err => res.status(400).send(err));
    });
  },

  getall(req, res) {
    User.findAll({ include: [{ all: true, nested: true }] })
      .then(document => {
        const response = {
          document
        };
        res.status(200).send(response);
      })
      .catch(err => res.status(400).send(err));
  }
};
export default Users;
