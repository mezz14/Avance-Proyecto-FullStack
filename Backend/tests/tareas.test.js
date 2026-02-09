const request = require("supertest");
const app = require("../server");


describe("API /api/tareas", () => {
    test("GET /api/tareas responde con 200", async () => {
        const res = await request(app).get("/api/tareas");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
