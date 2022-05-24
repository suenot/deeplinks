import { generateApolloClient } from "@deep-foundation/hasura/client";
import { DeepClient } from "../imports/client";
import { assert } from 'chai';

const apolloClient = generateApolloClient({
  path: `${process.env.DEEPLINKS_HASURA_PATH}/v1/graphql`,
  ssl: !!+process.env.DEEPLINKS_HASURA_SSL,
  secret: process.env.DEEPLINKS_HASURA_SECRET,
});

const deepClient = new DeepClient({ apolloClient });

describe('serialize', () => {
  it.skip(`{ id: 5 }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ id: 5 }), { id: { _eq: 5 } });
  });
  it.skip(`{ id: { _eq: 5 } }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ id: { _eq: 5 } }), { id: { _eq: 5 } });
  });
  it.skip(`{ value: 5 }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ value: 5 }), { number: { value: { _eq: 5 } } });
  });
  it.skip(`{ value: 'a' }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ value: 'a' }), { string: { value: { _eq: 'a' } } });
  });
  it.skip(`{ number: 5 }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ number: 5 }), { number: { value: { _eq: 5 } } });
  });
  it.skip(`{ string: 'a' }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ string: 'a' }), { string: { value: { _eq: 'a' } } });
  });
  it.skip(`{ number: { value: { _eq: 5 } } }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ number: { value: { _eq: 5 } } }), { number: { value: { _eq: 5 } } });
  });
  it.skip(`{ string: { value: { _eq: 'a' } } }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ string: { value: { _eq: 'a' } } }), { string: { value: { _eq: 'a' } } });
  });
  it.skip(`{ object: { value: { _contains: { a: 'b' } } } }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ object: { value: { _contains: { a: 'b' } } } }), { object: { value: { _contains: { a: 'b' } } } });
  });
  it.skip(`{ from: { value: 5 } }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ from: { value: 5 } }), { from: { number: { value: { _eq: 5 } } } });
  });
  it.skip(`{ out: { type_id: Contain, value: item, from: where } }`, async () => {
    assert.deepEqual(deepClient.serializeWhere(
      {
        out: {
          type_id: await deepClient.id('@deep-foundation/core', 'Contain'),
          value: 'b',
          from: {
            type_id: await deepClient.id('@deep-foundation/core', 'Package'),
            value: 'a',
          },
        },
      }
    ), {
      out: {
        type_id: { _eq: await deepClient.id('@deep-foundation/core', 'Contain') },
        string: { value: { _eq: 'b' } },
        from: {
          type_id: { _eq: await deepClient.id('@deep-foundation/core', 'Package') },
          string: { value: { _eq: 'a' } },
        },
      }
    });
  });
  it.skip(`{ value: 5, link: { type_id: 7 } }`, () => {
    assert.deepEqual(deepClient.serializeWhere(
      { value: 5, link: { type_id: 7 } },
      'value'
    ), {
      value: { _eq: 5 },
      link: {
        type_id: { _eq: 7 }
      },
    });
  });
  it.skip(`{ type: ['@deep-foundation/core', 'Value'] }`, () => {
    assert.deepEqual(
      deepClient.serializeWhere({
        type: ["@deep-foundation/core", "Value"],
      }),
      {
        type: {
          in: {
            from: {
              string: { value: { _eq: "@deep-foundation/core" } },
              type_id: { _eq: 2 },
            },
            string: { value: { _eq: "Value" } },
            type_id: { _eq: 3 },
          },
        },
      },
    );
  });
  it.skip(`{ type: ['@deep-foundation/core', 'Value'] }`, () => {
    assert.deepEqual(
      deepClient.serializeWhere({
        _or: [{
          type: ["@deep-foundation/core", "Value"],
        }, {
          type: ["@deep-foundation/core", "User"],
        }]
      }),
      {
        _or: [{
          type: {
            in: {
              from: {
                string: { value: { _eq: "@deep-foundation/core" } },
                type_id: { _eq: 2 },
              },
              string: { value: { _eq: "Value" } },
              type_id: { _eq: 3 },
            },
          },
        },{
          type: {
            in: {
              from: {
                string: { value: { _eq: "@deep-foundation/core" } },
                type_id: { _eq: 2 },
              },
              string: { value: { _eq: "User" } },
              type_id: { _eq: 3 },
            },
          },
        }]
      },
    );
  });
  it.skip(`id(packageName,contain)`, async () => {
    const id = await deepClient.id('@deep-foundation/core', 'Value');
    assert.equal(id, 4);
  });
  it(`{ type_id: { _type_of: 25 } }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ type_id: { _type_of: 25 } }), { type: { _by_item: { path_item_id: { _eq: 25 }, group_id: { _eq: 0 } } } });
  });
  it(`{ from_id: { _type_of: 25 } }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ from_id: { _type_of: 25 } }), { from: { _by_item: { path_item_id: { _eq: 25 }, group_id: { _eq: 0 } } } });
  });
  it(`{ to_id: { _type_of: 25 } }`, () => {
    assert.deepEqual(deepClient.serializeWhere({ to_id: { _type_of: 25 } }), { to: { _by_item: { path_item_id: { _eq: 25 }, group_id: { _eq: 0 } } } });
  });
});