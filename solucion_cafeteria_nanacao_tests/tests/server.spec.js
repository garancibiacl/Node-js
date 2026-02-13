const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  // 1) GET /cafes -> 200 y array con al menos 1 objeto
  it("GET /cafes devuelve 200 y un arreglo con al menos 1 objeto", async () => {
    const res = await request(server).get("/cafes");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(typeof res.body[0]).toBe("object");
  });

  // 2) DELETE /cafes/:id inexistente -> 404
  it("DELETE /cafes/:id con un id que no existe devuelve 404", async () => {
    const idInexistente = 999999;
    const res = await request(server)
      .delete(`/cafes/${idInexistente}`)
      // Esta API exige token; cualquiera sirve para pasar la validación de cabecera.
      .set("Authorization", "token-de-prueba");

    expect(res.status).toBe(404);
  });

  // 3) POST /cafes agrega un café -> 201
  it("POST /cafes agrega un nuevo café y devuelve 201", async () => {
    const nuevoCafe = { id: 999998, nombre: "Flat White" };

    const res = await request(server)
      .post("/cafes")
      .send(nuevoCafe);

    expect(res.status).toBe(201);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining(nuevoCafe)]));

    // Limpieza: lo eliminamos para no ensuciar otros tests
    await request(server)
      .delete(`/cafes/${nuevoCafe.id}`)
      .set("Authorization", "token-de-prueba");
  });

  // 4) PUT /cafes/:id id param != payload -> 400
  it("PUT /cafes/:id devuelve 400 si el id del parámetro no coincide con el del payload", async () => {
    const res = await request(server)
      .put("/cafes/2")
      .send({ id: 1, nombre: "Cortado (editado)" });

    expect(res.status).toBe(400);
  });
});
