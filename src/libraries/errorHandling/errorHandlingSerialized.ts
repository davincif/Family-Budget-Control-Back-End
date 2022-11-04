export interface ErrorHandlingSerialized {
  identifier: string;
  origin: number;
  msg: string;
  error?: unknown;
}
