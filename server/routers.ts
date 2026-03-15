import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  booking: router({
    submit: publicProcedure
      .input(
        z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          phone: z.string().min(10, "Valid phone number required"),
          message: z.string().min(10, "Message must be at least 10 characters"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Send notification to owner with booking details
          await notifyOwner({
            title: "New Booking Request from C.U.R.B. Solutions Website",
            content: `New booking request received!\n\nName: ${input.firstName} ${input.lastName}\nPhone: ${input.phone}\nMessage: ${input.message}`,
          });

          return {
            success: true,
            message: "Thank you! Your booking request has been received. We'll contact you shortly.",
          };
        } catch (error) {
          console.error("[Booking] Failed to process submission:", error);
          return {
            success: false,
            message: "There was an issue processing your request. Please try again.",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
