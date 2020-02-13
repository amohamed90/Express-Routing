process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let fruit = {
  name: "apple",
  price: '1.50'
};

beforeEach(function () {
  items.push(fruit);
});

afterEach(function () {
  items.length = 0;
});

describe("GET /items", function () {
  it("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({
      items: [fruit]
    });
  });
});

describe("POST /item", function () {
  it("Creates a new item", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "mango",
        price: 2.50
      });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      added: {
        name: "mango",
        price: 2.50
      }
    });
    expect(items.length).toEqual(2);
  });


});


