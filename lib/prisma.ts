import { PrismaClient } from '@prisma/client';

// Avoid creating multiple instances in dev / hot-reload
// and surface clearer error if client not generated.
declare global {
	// Cached Prisma client in dev to avoid exhausting connections on hot reload.
	var __prisma__: PrismaClient | undefined;
}

function getPrismaClient() {
	if (global.__prisma__) return global.__prisma__;
	const client = new PrismaClient();
	if (process.env.NODE_ENV !== 'production') global.__prisma__ = client;
	return client;
}

const prisma = getPrismaClient();
export default prisma;
