import {authMiddleware} from "../../middlewares/authorize.js";

describe("Auth Middleware",()=>{
    it("should allow access with correct API key", async () => {
        const req = { headers: { "x-api-key": "secret-key" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        await authMiddleware(req, res, next);
        expect(next).toHaveBeenCalled(); //next should be called
    });

    it("should deny access with incorrect API key", async () => {
        const req = { headers: { "x-api-key": "wrong-key" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        await authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    });
})