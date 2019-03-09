import { User, SentMessage, ReceivedMessage } from "../models";

const Users = {
  create(req, res) {
    if (!req.body.name || !req.body.phoneNumber) {
      return res
        .status(400)
        .json({ message: "Please fill out all required fields" });
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

  getOne(req, res) {
    User.findOne({
      where: {
        id: req.params.id
      },
      include: [{ all: true, nested: true }]
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "user not found" });
        }
        res.status(200).send({ user });
      })
      .catch(err => res.status(400).send(err));
  },

  getAll(req, res) {
    User.findAll({ include: [{ all: true, nested: true }] })
      .then(users => {
        res.status(200).send({ users });
      })
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "user not found" });
        }
        return user
          .update({
            phoneNumber: req.body.phoneNumber || user.phoneNumber,
            name: req.body.name || user.name
          })
          .then(updatedUser =>
            res.status(200).send({ message: "Update Successful", updatedUser })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(err => res.status(400).send(err));
  },

  delete(req, res) {
    return User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "user not found" });
        }
        return user
          .destroy()
          .then(() => res.status(204).send({}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
export default Users;
