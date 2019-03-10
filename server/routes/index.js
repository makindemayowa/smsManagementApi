import Contacts from "../controllers/contact";
import Messages from "../controllers/message";

module.exports = app => {
  /**
   * @swagger
   * definition:
   *   contacts:
   *     properties:
   *       name:
   *         type: string
   *       phoneNumber:
   *         type: string
   *   new-message:
   *     properties:
   *       message:
   *         type: string
   *       recipients:
   *         type: array
   *       senderId:
   *         type: integer
   */
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the SMS MAnagement API"
    })
  );

  /**
   * @swagger
   * /api/v1/contacts:
   *   post:
   *     tags:
   *       - contacts
   *     description: Creates a new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user object
   *         description: parameters required to create a user
   *         in: body
   *         required: false
   *         schema:
   *           $ref: '#/definitions/contacts'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  app.post("/api/v1/contacts", Contacts.create);

  /**
   * @swagger
   * /api/v1/contacts:
   *   get:
   *     tags:
   *       - contacts
   *     description: Returns all contacts
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of contacts
   *         schema:
   *           $ref: '#/definitions/contacts'
   */
  app.get("/api/v1/contacts", Contacts.getAll);

  /**
   * @swagger
   * /api/v1/contacts/{id}:
   *   get:
   *     tags:
   *       - contacts
   *     description: Returns user by id
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: user's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: An object of user
   *         schema:
   *           $ref: '#/definitions/contacts'
   */
  app.get("/api/v1/contacts/:id", Contacts.getOne);

  /**
   * @swagger
   * /api/v1/contacts/{id}:
   *   put:
   *     tags:
   *       - contacts
   *     description: Updates a single User
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: user's id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: user object
   *         description: specific parameters to update
   *         in: body
   *         required: false
   *         schema:
   *           $ref: '#/definitions/contacts'
   *     responses:
   *       200:
   *         description: An object of user
   *         schema:
   *           $ref: '#/definitions/contacts'
   */
  app.put("/api/v1/contacts/:id", Contacts.update);

  /**
   * @swagger
   * /api/v1/contacts/{id}:
   *   delete:
   *     tags:
   *       - contacts
   *     description: Deletes a single user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: user's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       204:
   *         description: No content
   */
  app.delete("/api/v1/contacts/:id", Contacts.delete);

  /**
   * @swagger
   * /api/v1/messages:
   *   post:
   *     tags:
   *       - messages
   *     description: Creates a new message
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: message
   *         description: parameters required to create a message
   *         in: body
   *         required: false
   *         schema:
   *           $ref: '#/definitions/new-message'
   *     responses:
   *       201:
   *         description: Successfully created
   */
  app.post("/api/v1/messages", Messages.create);

  /**
   * @swagger
   * /api/v1/messages/{id}:
   *   put:
   *     tags:
   *       - messages
   *     description: Updates the status of a single message
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: message id
   *         in: path
   *         required: true
   *         type: integer
   *       - name: status
   *         description: message status
   *         in: body
   *         schema:
   *           $ref: '#/definitions/new-message'
   *     responses:
   *       200:
   *         description: Successfully updated
   */
  app.put("/api/v1/messages/:id", Messages.update);
};
