export class ValidationError extends Error {
  constructor(public msgstring: string, public type: string) {
    super(msgstring);
    this.name = "ValidationError";
  }
}

export class HTTPValidationError extends Error {
  constructor(public detail: ValidationError[]) {
    super("HTTP validation error");
    this.name = "HTTPValidationError";
  }
}
