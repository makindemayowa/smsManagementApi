import { Contact } from "../models";

const Contacts = {
  create(req, res) {
    if (!req.body.name || !req.body.phoneNumber) {
      return res
        .status(400)
        .json({ message: "Please fill out all required fields" });
    }
    Contact.findOne({
      where: {
        phoneNumber: req.body.phoneNumber
      }
    }).then(existingNumber => {
      if (existingNumber !== null) {
        return res
          .status(409)
          .send({
            message: "A contact with this phone number already exists!"
          });
      }
      return Contact.create({
        phoneNumber: req.body.phoneNumber,
        name: req.body.name
      })
        .then(contact =>
          res.status(201).send({ message: "Contact created", contact })
        )
        .catch(err => res.status(400).send(err));
    });
  },

  getOne(req, res) {
    Contact.findOne({
      where: {
        id: req.params.id
      },
      include: [{ all: true, nested: true }]
    })
      .then(contact => {
        if (!contact) {
          return res.status(404).send({ message: "contact not found" });
        }
        res.status(200).send({ contact });
      })
      .catch(err => res.status(400).send(err));
  },

  getAll(req, res) {
    Contact.findAll({ include: [{ all: true, nested: true }] })
      .then(contacts => {
        res.status(200).send({ contacts });
      })
      .catch(err => res.status(400).send(err));
  },

  update(req, res) {
    Contact.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(contact => {
        if (!contact) {
          return res.status(404).send({ message: "contact not found" });
        }
        return contact
          .update({
            phoneNumber: req.body.phoneNumber || contact.phoneNumber,
            name: req.body.name || contact.name
          })
          .then(updatedContact =>
            res
              .status(200)
              .send({ message: "Update Successful", updatedContact })
          )
          .catch(error => res.status(400).send(error));
      })
      .catch(err => res.status(400).send(err));
  },

  delete(req, res) {
    return Contact.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(contact => {
        if (!contact) {
          return res.status(404).send({ message: "contact not found" });
        }
        return contact
          .destroy()
          .then(() => res.status(204).send({}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
export default Contacts;
