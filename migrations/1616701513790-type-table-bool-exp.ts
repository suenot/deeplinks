import Debug from 'debug';
import { generateDown, generateUp } from '../imports/type-table';
import { api, SCHEMA, TABLE_NAME as LINKS_TABLE_NAME } from './1616701513782-links';

const debug = Debug('deeplinks:migrations:type-table-bool-exp');

export const TABLE_NAME = 'bool_exp';

export const up = async () => {
  debug('up');
  await (generateUp({
    schemaName: SCHEMA,
    tableName: TABLE_NAME,
    customColumnsSql: 'gql text, sql text',
    linkRelation: 'bool_exp',
    linksTableName: LINKS_TABLE_NAME,
    api,
  })());
  await api.query({
    type: 'create_event_trigger',
    args: {
      name: 'bool_exp',
      table: TABLE_NAME,
      webhook: `${process.env.MIGRATIONS_DEEPLINKS_URL}/api/bool_exp`,
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
};

export const down = async () => {
  debug('down');
  await api.query({
    type: 'delete_event_trigger',
    args: {
      name: 'bool_exp',
    },
  });
  await (generateDown({
    schemaName: SCHEMA,
    tableName: TABLE_NAME,
    customColumnsSql: 'gql text, sql text',
    linkRelation: 'bool_exp',
    linksTableName: LINKS_TABLE_NAME,
    api,
  })());
};