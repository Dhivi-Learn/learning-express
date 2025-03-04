import request from "supertest";
import app from "../server.js";
import mongoose from "mongoose";

//connect DB
jest.setTimeout(20000); // Increase the timeout to 20 seconds

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
})

afterAll(async () => {
    await mongoose.connection.close();
});

describe("GET /",()=>{
    //test suits
    it("should return 200", async () => {
        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello Express | Node!");
    })
})




