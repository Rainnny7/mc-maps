export type ActionError = {
    error: string;
};
export type ServerActionResponse<T = NonNullable<any>> =
    | T
    | undefined
    | ActionError;

export const isActionError = (error: any): error is ActionError =>
    error && "error" in error && error.error;
