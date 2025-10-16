import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";

const validateMiddleware =
  (schema: ZodSchema) =>
  async (req: NextRequest, res: NextResponse, next: Function) => {
    try {
      const body = await req.json(); // Parse the request body
      schema.parse(body); // Validate the body against the schema
      next(); // Proceed if validation succeeds
    } catch (error) {
      return NextResponse.json(
        { message: "Validation failed", error },
        { status: 400 }
      );
    }
  };

export default validateMiddleware;
