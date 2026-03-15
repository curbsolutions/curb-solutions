import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the notifyOwner function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("booking.submit", () => {
  it("successfully submits a booking request with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.booking.submit({
      firstName: "John",
      lastName: "Doe",
      phone: "5551234567",
      message: "I would like to book a bin wash service for my home.",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("Thank you");
  });

  it("rejects booking request with missing first name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.booking.submit({
        firstName: "",
        lastName: "Doe",
        phone: "5551234567",
        message: "I would like to book a bin wash service.",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("First name is required");
    }
  });

  it("rejects booking request with missing last name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.booking.submit({
        firstName: "John",
        lastName: "",
        phone: "5551234567",
        message: "I would like to book a bin wash service.",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Last name is required");
    }
  });

  it("rejects booking request with invalid phone number", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.booking.submit({
        firstName: "John",
        lastName: "Doe",
        phone: "123",
        message: "I would like to book a bin wash service.",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Valid phone number required");
    }
  });

  it("rejects booking request with message too short", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.booking.submit({
        firstName: "John",
        lastName: "Doe",
        phone: "5551234567",
        message: "Short",
      });
      expect.fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.message).toContain("Message must be at least 10 characters");
    }
  });

  it("successfully handles booking request with all valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.booking.submit({
      firstName: "Sarah",
      lastName: "Johnson",
      phone: "5559876543",
      message: "I need a monthly subscription for my property with 3 bins. Can you help?",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("booking request has been received");
  });
});
