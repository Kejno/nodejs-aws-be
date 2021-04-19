import { Pool } from 'pg';
import { dbOptions } from './db-options';

export const client = new Pool(dbOptions);