// Require the User Model
const User = require("../models/user");

const getUsers = async (request, reply) => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (request, reply) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      return null;
    } else {
      return user;
    }
  } catch (err) {
    throw err;
  }
};

const addUser = async (request, reply) => {
  try {
    const user = new User(request.body);
    await user.save();
    return user;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (request, reply) => {
  try {
    const user = await User.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    if (!user) {
      reply.status(404).send({ error: "User not found" });
    } else {
      reply.send(user);
    }
  } catch (err) {
    reply.status(400).send({ error: "Bad Request" });
  }
};

const deleteUser = async (request, reply) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) {
      return null
      // reply.status(404).send({ error: "User not found" });
    } else {
      // reply.send({ message: "User deleted successfully" });
      return user
    }
  } catch (err) {
    // reply.status(500).send({ error: "Internal Server Error" });
    throw err
  }
};

const userRoutes = function (fastify, opts, done) {
  // Get all users
  fastify.get("/users", getUsers);

  // Get a user by id
  fastify.get("/users/:id", getUserById);

  // Add a new user
  fastify.post("/users", addUser);

  // Update an existing user
  fastify.put("/users/:id", updateUser);

  // Delete a user
  fastify.delete("/users/:id", deleteUser);

  done();
}


module.exports = {userRoutes, getUsers, getUserById, addUser, updateUser, deleteUser };
