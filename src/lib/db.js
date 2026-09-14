// Re-export the shared MongoDB db instance from the auth module.
// All API routes should import db from here so we share a single connection.
export { db } from './auth'
