const request = require("supertest");
// const { redisClient } = require("../../services/redis");
const Redis = require("ioredis-mock");

const { app } = require("../../app");

describe("test login service", () => {
  const mockUser = {
    username: "af",
    password: "12345",
  };

  let server = null;
  beforeAll((done) => {
    server = app.listen(4000, done);
  });

  // afterEach((done) => {
  //   new Redis().flushall().then(() => done());
  // });

  afterAll((done) => {
    //   redisClient.quit();
    server.close(done);
    //   done();
  });

  it("should respond with token object", (done) => {
    request(server)
      .post("/login")
      .send(mockUser)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ token: expect.any(String) })
        );
        return done();
      });
  });

  it("home should respond with 404 status code", (done) => {
    request(server).get("/").expect(404, done);
  });
  it("nothing should respond with 404 status code", (done) => {
    request(server).get("/nothing").expect(404, done);
  });
  it("walo should respond with 404 status code", (done) => {
    request(server).get("/walo").expect(404, done);
  });
});
