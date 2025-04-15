import express from 'express';
import createClickHouseClient from "../utils/clickhouseClient.js";

const router = express.Router();


// Connect to ClickHouse and test connection
router.post('/connect', async (req, res) => {
  try {
    const { host, port, protocol, database, username, password, jwt } = req.body;

    const client = createClickHouseClient({
      host,
      port,
      protocol,
      database,
      username,
      password,
      jwt
    });

    // Test connection
    const result = await client.query({
      query: 'SELECT 1',
      format: 'JSONEachRow'
    });
    const rows = await result.json();

    if (rows.length > 0) {
      return res.status(200).json({
        success: true,
        message: 'Successfully connected to ClickHouse'
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Connection failed'
      });
    }
  } catch (error) {
    console.error('ClickHouse connection error:', error);
    return res.status(500).json({
      success: false,
      message: `Connection failed: ${error.message}`
    });
  }
});

// Get list of tables from ClickHouse
router.post('/tables', async (req, res) => {
  try {
    const { host, port, protocol, database, username, password, jwt } = req.body;

    const client = createClickHouseClient({
      host,
      port,
      protocol,
      database,
      username,
      password,
      jwt
    });

    const query = `
        SELECT name
        FROM system.tables
        WHERE database = '${database}'
        ORDER BY name
      `;

    const result = await client.query({
      query,
      format: 'JSONEachRow'
    });

    const tables = await result.json();

    return res.status(200).json({
      success: true,
      tables: tables.map(table => table.name)
    });
  } catch (error) {
    console.error('Error getting tables:', error);
    return res.status(500).json({
      success: false,
      message: `Failed to get tables: ${error.message}`
    });
  }
});

export default router;