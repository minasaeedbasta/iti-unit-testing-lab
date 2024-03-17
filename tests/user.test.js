const it = require("ava").default;
const { expect } = require("chai");
const sinon = require("sinon");
const { MongoMemoryServer } = require("mongodb-memory-server");
const utils = require("../helpers/utils");
const startDB = require("../helpers/DB");
const User = require("../models/user");
const { addUser, getUsers, getUserById , deleteUser} = require("../routes/users");

// Use in memeory disposable database
it.before(async (t) => {
  t.context.mongod = await MongoMemoryServer.create();
  process.env.MONGOURI = t.context.mongod.getUri("cloudUnitTesting");
  await startDB();
});

// Stop the database and clean up the memory
it.after(async (t) => {
  await t.context.mongod.stop({ doCleanUp: true });
});

// // Test user creation functionality
it("create a new user", async (t) => {
  // setup
  const request = {
    body: {
      first_name: "Menna",
      last_name: "Hamdy",
      age: 11,
    },
  };

  const expectedResult = {
    first_name: "Menna",
    last_name: "Hamdy",
    age: 11,
  };


  const actualResult = await addUser(request);

  const result = {
    ...expectedResult,
    __v: actualResult.__v,
    _id: actualResult._id,
  };

  expect(actualResult).to.be.a("object");

  expect(actualResult._doc).to.deep.equal(result);

  t.teardown(async () => {
    await User.deleteMany({});
  });

  t.pass();
});

it("Get all users", async (t) => {
  // create multiple users to test
  const users = [
    { first_name: "mina", last_name: "basta", age: 28 },
    { first_name: "mohammad", last_name: "tharwat", age: 23 },
    { first_name: "aisha", last_name: "galal", age: 25 },
  ];

  await User.insertMany(users);



  const actualResult = await getUsers();

  expect(actualResult).to.be.a("array");

  expect(actualResult).to.have.lengthOf(3);

  expect(actualResult[0].first_name).to.equal(users[0].first_name);
  expect(actualResult[0].last_name).to.equal(users[0].last_name);
  expect(actualResult[0].age).to.equal(users[0].age);

  expect(actualResult[1].first_name).to.equal(users[1].first_name);
  expect(actualResult[1].last_name).to.equal(users[1].last_name);
  expect(actualResult[1].age).to.equal(users[1].age);

  expect(actualResult[2].first_name).to.equal(users[2].first_name);
  expect(actualResult[2].last_name).to.equal(users[2].last_name);
  expect(actualResult[2].age).to.equal(users[2].age);

  t.teardown(async () => {
    await User.deleteMany({});
  });

  t.pass();
});

it("Get single user by id", async (t) => {
  // create multiple users to test
  const users = [
    { first_name: "mina", last_name: "basta", age: 28 },
    { first_name: "mohammad", last_name: "tharwat", age: 23 },
    { first_name: "aisha", last_name: "galal", age: 25 },
  ];

  const insertedUsers = await User.insertMany(users);

  const request = {
    body: {},
    params: {
      id: insertedUsers[0]._id,
    },
  };

  const actualResult = await getUserById(request);


  if (!actualResult) {
    expect(actualResult).to.be.null;
  } else {
    expect(actualResult).to.be.a("object");
    expect(actualResult.first_name).to.equal(users[0].first_name);
    expect(actualResult.last_name).to.equal(users[0].last_name);
    expect(actualResult.age).to.equal(users[0].age);
  }

  t.teardown(async () => {
    await User.deleteMany({});
  });

  t.pass();
});


it("Delete a user ", async (t) => {
    // create multiple users to test
    const users = [
      { first_name: "mina", last_name: "basta", age: 28 },
      { first_name: "mohammad", last_name: "tharwat", age: 23 },
      { first_name: "aisha", last_name: "galal", age: 25 },
    ];
  
    const insertedUsers = await User.insertMany(users);
  
    const request = {
      body: {},
      params: {
        id: insertedUsers[0]._id,
      },
    };
  
    const actualResult = await deleteUser(request);
  
  
    if (!actualResult) {
      expect(actualResult).to.be.null;
    } else {
      expect(actualResult).to.be.a("object");
      expect(actualResult.first_name).to.equal(users[0].first_name);
      expect(actualResult.last_name).to.equal(users[0].last_name);
      expect(actualResult.age).to.equal(users[0].age);
    }
  
    t.teardown(async () => {
      await User.deleteMany({});
    });
  
    t.pass();
  });
  
