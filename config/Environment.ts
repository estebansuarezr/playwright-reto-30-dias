export class Environment {
    static readonly ADMIN_USERNAME: string = Environment.gerRequired('ADMIN_USERNAME');
    static readonly ADMIN_PASSWORD: string = Environment.gerRequired('ADMIN_PASSWORD');
    static readonly EMPLOYEE_USERNAME: string = Environment.gerRequired('EMPLOYEE_USERNAME');
    static readonly EMPLOYEE_PASSWORD: string = Environment.gerRequired('EMPLOYEE_PASSWORD');

    private static gerRequired(key: string): string {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Environment variable ${key} is required but not set.`);
        }
        return value;
    }

}