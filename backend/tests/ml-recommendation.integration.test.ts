import request from "supertest";
import app from "../src/app";

describe("ML Recommendation Routes", () => {
  it("should save recommendation and feedback event", async () => {
    const authCookie = "token=dummy-token";
    const transactionId = "txn_dummy_001";
    const categoryA = { id: "cat_dummy_a" };
    const categoryB = { id: "cat_dummy_b" };
    const categoryC = { id: "cat_dummy_c" };

    const res = await request(app)
      .post("/api/v1/ml-recommendations/feedback")
      .set("Cookie", authCookie)
      .send({
        transactionId,
        suggestedTop3: [categoryA.id, categoryB.id, categoryC.id],
        chosenCategoryId: categoryB.id,
        inputLatencyMs: 3800,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
