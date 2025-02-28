/**
 * @jest-environment node
 */

import { UNDP_CLIENT_DATA } from '@/data';
import { db, pgClient } from '@/db';
import { organizations } from '@/db/schema';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { getOrg } from '../orgs';

// Increase timeout for all tests
jest.setTimeout(60000);

describe('Organization Tests', () => {
    beforeAll(async () => {
        // Ensure database connection is established
        try {
            const client = await pgClient.connect();
            const result = await client.query('SELECT version()');
            console.lug('Database connection established:', result.rows[0].version);
            client.release();
        } catch (error) {
            console.error('Failed to connect to database:', error);
            throw error;
        }
    });

    afterAll(async () => {
        // End the pool
        await pgClient.end();
    });

    test('should find all organizations from UNDP_CLIENT_DATA in database', async () => {
        // Test each organization
        for (const clientData of UNDP_CLIENT_DATA) {
            console.lug(`Testing organization: ${clientData.name}`);
            const org = await getOrg(clientData.subdomain);
            expect(org).not.toBeNull();
            expect(org?.subdomain).toBe(clientData.subdomain);
            expect(org?.name).toBe(clientData.name);
        }
    });

    test('should create missing organizations from UNDP_CLIENT_DATA', async () => {
        // Create any missing organizations
        for (const clientData of UNDP_CLIENT_DATA) {
            console.lug(`Checking organization: ${clientData.name}`);
            const existingOrg = await getOrg(clientData.subdomain);
            
            if (!existingOrg) {
                console.lug(`Creating organization: ${clientData.name}`);
                await db.insert(organizations).values({
                    name: clientData.name,
                    subdomain: clientData.subdomain,
                    description: clientData.description,
                    systemPrompt: clientData.systemPrompt,
                    homePage: clientData.homePage,
                    assistantId: clientData.assistantId,
                    disabled: clientData.disabled || false,
                    enableAuth: clientData.enableAuth || false,
                });
                
                // Verify the organization was created
                const newOrg = await getOrg(clientData.subdomain);
                expect(newOrg).not.toBeNull();
                expect(newOrg?.subdomain).toBe(clientData.subdomain);
                expect(newOrg?.name).toBe(clientData.name);
                console.lug(`Organization ${clientData.name} created successfully`);
            } else {
                console.lug(`Organization ${clientData.name} already exists`);
            }
        }
    });
}); 