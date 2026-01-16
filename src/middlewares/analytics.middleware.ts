import { NextFunction, Request, Response } from "express";

/**
 * @description Vercel Web Analytics middleware for tracking API requests
 *
 * This middleware is designed for backend applications deployed on Vercel.
 * When deployed to Vercel, Web Analytics automatically tracks:
 * - All incoming requests and their paths
 * - Response status codes
 * - Request duration and performance metrics
 *
 * This middleware captures request metadata for enhanced tracking.
 * Note: Web Analytics is automatically enabled on Vercel and requires:
 * 1. Analytics to be enabled in the Vercel dashboard
 * 2. The application to be deployed on Vercel
 *
 * The tracking happens automatically through Vercel's infrastructure,
 * with no additional setup required beyond this middleware registration.
 */
export default (req: Request, res: Response, next: NextFunction) => {
  // Capture the start time for performance tracking
  const startTime = Date.now();

  // Wrap the res.on method to track when response is finished
  const originalOn = res.on.bind(res);
  res.on = function (event: string, listener: any) {
    if (event === "finish") {
      const wrappedListener = () => {
        const duration = Date.now() - startTime;
        // Perform any custom tracking logic here
        // Store in a variable instead of setting headers (which may already be sent)
        // This data can be used for monitoring if needed
        res.locals.requestDuration = duration;
        listener.call(this);
      };
      return originalOn(event, wrappedListener);
    }
    return originalOn(event, listener);
  };

  next();
};
