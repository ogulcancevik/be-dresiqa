import { getAuth, requireAuth } from "@clerk/express";
import { Router } from "express";

export const meRouter = Router();

meRouter.get("/", requireAuth(), (req, res) => {
  const auth = getAuth(req);
  res.json({
    userId: auth.userId,
    sessionId: auth.sessionId,
    organizationId: auth.orgId ?? null
  });
});
