import { generateApolloClient } from '@deep-foundation/hasura/client';
import Debug from 'debug';
import { up as upTable, down as downTable } from '@deep-foundation/materialized-path/table';
import { up as upRels, down as downRels } from '@deep-foundation/materialized-path/relationships';
import { Trigger } from '@deep-foundation/materialized-path/trigger';
import { api, SCHEMA, TABLE_NAME as LINKS_TABLE_NAME } from './1616701513782-links';
import { permissions } from '../imports/permission';
import { sql } from '@deep-foundation/hasura/sql';
import { DeepClient } from '../imports/client';
import { promiseTriggersUp, promiseTriggersDown } from '../imports/type-table';

const debug = Debug('deeplinks:migrations:promises');

const client = generateApolloClient({
  path: `${process.env.MIGRATIONS_HASURA_PATH}/v1/graphql`,
  ssl: !!+process.env.MIGRATIONS_HASURA_SSL,
  secret: process.env.MIGRATIONS_HASURA_SECRET,
});

const deep = new DeepClient({
  apolloClient: client,
})

export const up = async () => {
  debug('up');

  const promiseTypeId = await deep.id('@deep-foundation/core', 'Promise');
  const thenTypeId = await deep.id('@deep-foundation/core', 'Then');
  const handleInsertTypeId = await deep.id('@deep-foundation/core', 'HandleInsert');
  const handleScheduleTypeId = await deep.id('@deep-foundation/core', 'HandleSchedule');
  const handleSelectorTypeId = await deep.id('@deep-foundation/core', 'HandleSelector');
  const selectionTypeId = await deep.id('@deep-foundation/core', 'Include');

  await api.sql(sql`CREATE OR REPLACE FUNCTION create_promises_for_inserted_link(link "links") RETURNS boolean AS $function$ 
  DECLARE 
    PROMISE bigint;
    PROMISES bigint;
  BEGIN
    IF (
        EXISTS(
          SELECT 1
          FROM links
          WHERE from_id = link."type_id"
          AND type_id = ${handleInsertTypeId}
        )
      --OR
      --  EXISTS(
      --    SELECT 1
      --    FROM
      --      links as selection,
      --      links as handleInsert
      --    WHERE 
      --          selection.to_id = link."id"
      --      AND type_id = ${selectionTypeId}
      --      AND selection.from_id = handleInsert.from_id
      --      AND handleInsert.type_id = ${handleInsertTypeId}
      --  )
    ) THEN
    INSERT INTO links ("type_id") VALUES (${promiseTypeId}) RETURNING id INTO PROMISE;
    INSERT INTO links ("type_id","from_id","to_id") VALUES (${thenTypeId},link."id",PROMISE);
    END IF;
    IF (
      link."type_id" = ${handleScheduleTypeId}
    ) THEN
    INSERT INTO links ("type_id") VALUES (${promiseTypeId}) RETURNING id INTO PROMISE;
    INSERT INTO links ("type_id","from_id","to_id") VALUES (${thenTypeId},link.from_id,PROMISE);
    END IF;
    SELECT COUNT(*) INTO PROMISES FROM (
        SELECT DISTINCT s.selector_id, h.id
        FROM selectors s, links h
        WHERE
            s.item_id = link."id"
        AND s.selector_id = h.from_id
        AND h.type_id = ${handleSelectorTypeId}
    ) AS distict_selectors;

    IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_tables 
      WHERE 
        schemaname = 'public' AND 
        tablename  = 'debug_output'
      ) THEN
      CREATE TABLE public.debug_output (promises bigint, new_id bigint);
    END IF;
    INSERT INTO debug_output ("promises", "new_id") VALUES (PROMISES, link."id");
    IF (PROMISES > 0) THEN
      -- FOR i IN 1..PROMISES LOOP
        INSERT INTO links ("type_id") VALUES (${promiseTypeId}) RETURNING id INTO PROMISE;
        INSERT INTO links ("type_id","from_id","to_id") VALUES (${thenTypeId},link."id",PROMISE);
      -- END LOOP;
    END IF;
    RETURN TRUE;
  END; $function$ LANGUAGE plpgsql;`);
  
  await api.sql(sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__promise__insert__function() RETURNS TRIGGER AS $trigger$ 
  DECLARE 
  BEGIN
    PERFORM create_promises_for_inserted_link(NEW);
    RETURN NEW;
  END; $trigger$ LANGUAGE plpgsql;`);
  await api.sql(sql`CREATE TRIGGER z_${LINKS_TABLE_NAME}__promise__insert__trigger AFTER INSERT ON "links" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__promise__insert__function();`);

  const handleDeleteTypeId = await deep.id('@deep-foundation/core', 'HandleDelete');

  await api.sql(sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__promise__delete__function() RETURNS TRIGGER AS $trigger$ DECLARE PROMISE bigint; 
  BEGIN
    IF (
        EXISTS(
          SELECT 1
          FROM links
          WHERE from_id = OLD."type_id"
          AND type_id = ${handleDeleteTypeId}
        )
      --OR
      --  EXISTS(
      --    SELECT 1
      --    FROM
      --      links as selection,
      --      links as handleInsert
      --    WHERE 
      --          selection.to_id = OLD."id"
      --      AND type_id = ${selectionTypeId}
      --      AND selection.from_id = handleInsert.from_id
      --      AND handleInsert.type_id = ${handleDeleteTypeId}
      --  )
    ) THEN
    INSERT INTO links ("type_id") VALUES (${promiseTypeId}) RETURNING id INTO PROMISE;
    INSERT INTO links ("type_id","from_id","to_id") VALUES (${thenTypeId},OLD."id",PROMISE);
    END IF;
    RETURN OLD;
  END; $trigger$ LANGUAGE plpgsql;`);
  await api.sql(sql`CREATE TRIGGER ${LINKS_TABLE_NAME}__promise__delete__trigger BEFORE DELETE ON "links" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__promise__delete__function();`);

  await (promiseTriggersUp({
    schemaName: 'public',
    tableName: 'strings',
    valueType: 'TEXT',
    customColumnsSql: 'value text',
    linkRelation: 'string',
    linksTableName: 'links',
    api,
    deep,
  })());
  await (promiseTriggersUp({
    schemaName: 'public',
    tableName: 'numbers',
    valueType: 'float8',
    customColumnsSql: 'value bigint',
    linkRelation: 'number',
    linksTableName: 'links',
    api,
    deep,
  })());
  await (promiseTriggersUp({
    schemaName: 'public',
    tableName: 'objects',
    valueType: 'jsonb',
    customColumnsSql: 'value jsonb',
    linkRelation: 'object',
    linksTableName: 'links',
    api,
    deep,
  })());
};

export const down = async () => {
  debug('down');
  await (promiseTriggersDown({
    schemaName: 'public',
    tableName: 'strings',
    valueType: 'TEXT',
    customColumnsSql: 'value text',
    linkRelation: 'string',
    linksTableName: 'links',
    api,
    deep,
  })());
  await (promiseTriggersDown({
    schemaName: 'public',
    tableName: 'numbers',
    valueType: 'float8',
    customColumnsSql: 'value bigint',
    linkRelation: 'number',
    linksTableName: 'links',
    api,
    deep,
  })());
  await (promiseTriggersDown({
    schemaName: 'public',
    tableName: 'objects',
    valueType: 'jsonb',
    customColumnsSql: 'value jsonb',
    linkRelation: 'object',
    linksTableName: 'links',
    api,
    deep,
  })());

  await api.sql(sql`DROP TRIGGER IF EXISTS z_${LINKS_TABLE_NAME}__promise__insert__trigger ON "${LINKS_TABLE_NAME}";`);
  await api.sql(sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__promise__insert__function CASCADE;`);
  await api.sql(sql`DROP TRIGGER IF EXISTS ${LINKS_TABLE_NAME}__promise__delete__trigger ON "${LINKS_TABLE_NAME}";`);
  await api.sql(sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__promise__delete__function CASCADE;`);

  await api.sql(sql`DROP FUNCTION IF EXISTS create_promises_for_inserted_link CASCADE;`);
  await api.sql(sql`DROP TABLE IF EXISTS debug_output CASCADE;`);
};
