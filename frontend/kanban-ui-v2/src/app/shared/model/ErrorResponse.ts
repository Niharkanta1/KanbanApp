export class ErrorResponse {
    message: string;
    details: string[] = [];
    constructor(message: string, details: string[]) {
        this.message = message;
        this.details = details;
    }

    addErrorDetail(detail: string): void {
        this.details.push(detail);
    }

    getAllDetails(): string {
        return this.details.toString();
    }
}
