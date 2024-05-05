import { AccessControlProvider } from "@refinedev/core";
import { authProvider } from "./auth-provider";


export const accessControlProvider: AccessControlProvider = {
    can: async ({ resource, action, params }) => {
        if (!authProvider || typeof authProvider.getPermissions !== 'function') {
            return {
                can: false,
                reason: 'AuthProvider or getPermissions is undefined',
            }
        }
        const permissions = await authProvider.getPermissions() as string[];
        
        if (permissions && permissions.includes('Basic') && resource === 'dashboard') {
            return { can: true }
        }

        if (permissions && permissions.includes('SuperAdmin') && resource === 'products' && ['list', 'create', 'edit', 'show','create-range'].includes(action)) {
            return { can: true }
        }

        return {
            can: false,
            reason: "Unauthorized",
        };
    },
};