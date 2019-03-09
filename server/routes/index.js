import Users from "../controllers/user";
import Messages from "../controllers/message";

module.exports = app => {
  /**
   * @swagger
   * definition:
   *   users:
   *     properties:
   *       name:
   *         type: string
   *       phoneNumber:
   *         type: string
   */
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the SMS MAnagement API"
    })
  );

  /**
   * @swagger
   * /api/v1/users:
   *   post:
   *     tags:
   *       - users
   *     description: Creates a new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user object
   *         description: parameters required to create a user
   *         in: body
   *         required: false
   *         schema:
   *           $ref: '#/definitions/users'
   *     responses:
   *       200:
   *         description: Successfully created
   */
  app.post("/api/v1/users", Users.create);

  /**
   * @swagger
   * /api/v1/users:
   *   get:
   *     tags:
   *       - users
   *     description: Returns all users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of users
   *         schema:
   *           $ref: '#/definitions/users'
   */
  app.get("/api/v1/users", Users.getAll);

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   get:
   *     tags:
   *       - users
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
   *           $ref: '#/definitions/users'
   */
  app.get("/api/v1/users/:id", Users.getOne);

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   put:
   *     tags:
   *       - users
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
   *           $ref: '#/definitions/users'
   *     responses:
   *       200:
   *         description: An object of user
   *         schema:
   *           $ref: '#/definitions/users'
   */
  app.put("/api/v1/users/:id", Users.update);

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     tags:
   *       - users
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
  app.delete("/api/v1/users/:id", Users.delete);

  // Message routes
  app.post("/api/v1/messages", Messages.create);
};
