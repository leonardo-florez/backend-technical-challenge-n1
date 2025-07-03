export class Logger {
    constructor(private readonly context: string) { }

    info(message: string) {
        const timestamp = new Date().toISOString();
        console.info(`[${timestamp}] [INFO] [${this.context}] ${message}`);
    }

    error(message: string, ...args: any[]) {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] [ERROR] [${this.context}] ${message}`, { errors: args });
    }
}