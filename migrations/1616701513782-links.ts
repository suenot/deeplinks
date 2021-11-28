import { HasuraApi } from '@deep-foundation/hasura/api';
import { sql } from '@deep-foundation/hasura/sql';
import Debug from 'debug';
import { GLOBAL_ID_TABLE_VALUE } from '../imports/global-ids';

const debug = Debug('deeplinks:migrations:links');

export const api = new HasuraApi({
  path: process.env.MIGRATIONS_HASURA_PATH,
  ssl: !!+process.env.MIGRATIONS_HASURA_SSL,
  secret: process.env.MIGRATIONS_HASURA_SECRET,
});

export const SCHEMA = 'public';
export const TABLE_NAME = 'links';

export const up = async () => {
  debug('up');
  await api.sql(sql`
    CREATE TABLE ${SCHEMA}."${TABLE_NAME}" (id bigint PRIMARY KEY, from_id bigint DEFAULT 0, to_id bigint DEFAULT 0, type_id bigint NOT NULL);
    CREATE SEQUENCE ${TABLE_NAME}_id_seq
    AS bigint START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE ${TABLE_NAME}_id_seq OWNED BY ${SCHEMA}."${TABLE_NAME}".id;
    ALTER TABLE ONLY ${SCHEMA}."${TABLE_NAME}" ALTER COLUMN id SET DEFAULT nextval('${TABLE_NAME}_id_seq'::regclass);
    CREATE INDEX IF NOT EXISTS ${TABLE_NAME}__id_hash ON ${TABLE_NAME} USING hash (id);
    CREATE INDEX IF NOT EXISTS ${TABLE_NAME}__from_id_hash ON ${TABLE_NAME} USING hash (from_id);
    CREATE INDEX IF NOT EXISTS ${TABLE_NAME}__from_id_btree ON ${TABLE_NAME} USING btree (from_id);
    CREATE INDEX IF NOT EXISTS ${TABLE_NAME}__to_id_hash ON ${TABLE_NAME} USING hash (to_id);
    CREATE INDEX IF NOT EXISTS ${TABLE_NAME}__to_id_btree ON ${TABLE_NAME} USING btree (to_id);
    CREATE INDEX IF NOT EXISTS ${TABLE_NAME}__type_id_hash ON ${TABLE_NAME} USING hash (type_id);
    CREATE INDEX IF NOT EXISTS ${TABLE_NAME}__type_id_btree ON ${TABLE_NAME} USING btree (type_id);
  `);
  await api.sql(sql`
    CREATE TABLE ${SCHEMA}."${TABLE_NAME}__tables" (id bigint PRIMARY KEY, name TEXT);
    CREATE SEQUENCE ${TABLE_NAME}__tables_id_seq
    AS bigint START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
    ALTER SEQUENCE ${TABLE_NAME}__tables_id_seq OWNED BY ${SCHEMA}."${TABLE_NAME}__tables".id;
    ALTER TABLE ONLY ${SCHEMA}."${TABLE_NAME}__tables" ALTER COLUMN id SET DEFAULT nextval('${TABLE_NAME}__tables_id_seq'::regclass);
    CREATE INDEX IF NOT EXISTS ${TABLE_NAME}__tables__id_hash ON ${TABLE_NAME}__tables USING hash (id);
    CREATE INDEX IF NOT EXISTS ${TABLE_NAME}__tables__name_hash ON ${TABLE_NAME}__tables USING hash (name);
    CREATE INDEX IF NOT EXISTS ${TABLE_NAME}__tables__name_btree ON ${TABLE_NAME}__tables USING btree (name);
  `);
  await api.query({
    type: 'track_table',
    args: {
      schema: SCHEMA,
      name: `${TABLE_NAME}__tables`,
    },
  });
  await api.sql(sql`CREATE OR REPLACE FUNCTION ${TABLE_NAME}__value__function(link ${TABLE_NAME}) RETURNS jsonb STABLE AS $function$ DECLARE tableId bigint; exists int; result json; BEGIN
    SELECT from_id FROM "${TABLE_NAME}" INTO tableId WHERE "type_id"=${GLOBAL_ID_TABLE_VALUE} AND "to_id"=link."type_id";
    SELECT COUNT(id) FROM "links__tables" INTO exists WHERE name='table' || tableId || '';
    IF (tableId IS NOT NULL AND exists = 1) THEN
        EXECUTE 'SELECT json_agg(t) as t FROM ' || quote_ident('table' || tableId) || ' as t WHERE link_id=' || link."id" || ' LIMIT 1' INTO result;
        RETURN result->0;
    END IF;
    RETURN NULL;
  END; $function$ LANGUAGE plpgsql;`);
  await api.query({
    type: 'track_table',
    args: {
      schema: SCHEMA,
      name: TABLE_NAME,
    },
  });
  await api.query({
    type: 'add_computed_field',
    args: {
      table: TABLE_NAME,
      source: 'default',
      name: 'value',
      definition:{
        function:{
            name: `${TABLE_NAME}__value__function`,
            schema: 'public',
        },
        table_argument: 'link',
      }
    },
  });
  await api.query({
    type: 'create_event_trigger',
    args: {
      name: TABLE_NAME,
      table: TABLE_NAME,
      webhook: `${process.env.DEEPLINKS_URL}/api/links`,
      insert: {
        columns: "*",
        payload: '*',
      },
      update: {
        columns: '*',
        payload: '*',
      },
      delete: {
        columns: '*'
      },
      replace: false,
    },
  });
  await api.query({
    type: 'create_object_relationship',
    args: {
      table: TABLE_NAME,
      name: 'from',
      using: {
        manual_configuration: {
          remote_table: {
            schema: SCHEMA,
            name: TABLE_NAME,
          },
          column_mapping: {
            from_id: 'id',
          },
        },
      },
    },
  });
  await api.query({
    type: 'create_object_relationship',
    args: {
      table: TABLE_NAME,
      name: 'to',
      using: {
        manual_configuration: {
          remote_table: {
            schema: SCHEMA,
            name: TABLE_NAME,
          },
          column_mapping: {
            to_id: 'id',
          },
        },
      },
    },
  });
  await api.query({
    type: 'create_object_relationship',
    args: {
      table: TABLE_NAME,
      name: 'type',
      using: {
        manual_configuration: {
          remote_table: {
            schema: SCHEMA,
            name: TABLE_NAME,
          },
          column_mapping: {
            type_id: 'id',
          },
        },
      },
    },
  });
  await api.query({
    type: 'create_array_relationship',
    args: {
      table: TABLE_NAME,
      name: 'in',
      using: {
        manual_configuration: {
          remote_table: {
            schema: SCHEMA,
            name: TABLE_NAME,
          },
          column_mapping: {
            id: 'to_id',
          },
        },
      },
    },
  });
  await api.query({
    type: 'create_array_relationship',
    args: {
      table: TABLE_NAME,
      name: 'out',
      using: {
        manual_configuration: {
          remote_table: {
            schema: SCHEMA,
            name: TABLE_NAME,
          },
          column_mapping: {
            id: 'from_id',
          },
        },
      },
    },
  });
  await api.query({
    type: 'create_array_relationship',
    args: {
      table: TABLE_NAME,
      name: 'typed',
      using: {
        manual_configuration: {
          remote_table: {
            schema: SCHEMA,
            name: TABLE_NAME,
          },
          column_mapping: {
            id: 'type_id',
          },
        },
      },
    },
  });
};

export const down = async () => {
  debug('down');
  await api.query({
    type: 'drop_computed_field',
    args: {
      table: TABLE_NAME,
      source: 'default',
      name: 'value',
      cascade: true,
    },
  });
  await api.sql(sql`DROP FUNCTION IF EXISTS ${TABLE_NAME}__value__function CASCADE;`);
  await api.query({
    type: 'untrack_table',
    args: {
      table: {
        schema: SCHEMA,
        name: TABLE_NAME,
      },
      cascade: true,
    },
  });
  await api.sql(sql`
    DROP TABLE ${SCHEMA}."${TABLE_NAME}" CASCADE;
  `);
  const tables = ((await api.sql(sql`
    SELECT * FROM ${TABLE_NAME}__tables;
  `))?.data?.result || [])?.slice(1);
  await api.query({
    type: 'untrack_table',
    args: {
      table: {
        schema: SCHEMA,
        name: `${TABLE_NAME}__tables`,
      },
      cascade: true,
    },
  });
  if (!!tables.length) await api.sql(sql`
    ${tables.map(table => `DROP TABLE IF EXISTS ${table[1]} CASCADE;`).join('')}
  `);
  await api.sql(sql`
    DROP TABLE ${TABLE_NAME}__tables CASCADE;
  `);
};
