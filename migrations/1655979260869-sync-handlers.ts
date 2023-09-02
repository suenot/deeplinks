import Debug from 'debug';
import { generateApolloClient } from '@deep-foundation/hasura/client.js';
import { DeepClient } from '../imports/client.js';;
import { api, TABLE_NAME as LINKS_TABLE_NAME } from '../migrations/1616701513782-links.js';
import { sql } from '@deep-foundation/hasura/sql.js';
import { _ids } from '../imports/client.js';

const debug = Debug('deeplinks:migrations:plv8');
const log = debug.extend('log');
const error = debug.extend('error');

const client = generateApolloClient({
  path: `${process.env.MIGRATIONS_HASURA_PATH}/v1/graphql`,
  ssl: !!+process.env.MIGRATIONS_HASURA_SSL,
  secret: process.env.MIGRATIONS_HASURA_SECRET,
});

const deep = new DeepClient({
  apolloClient: client,
})

// main debug tool, create error and read in apollo. plv8.elog(ERROR, JSON.stringify(Number(link.id))); 

const handleInsertId = _ids?.['@deep-foundation/core']?.HandleInsert; // await deep.id('@deep-foundation/core', 'HandleInsert');
const handleUpdateId = _ids?.['@deep-foundation/core']?.HandleUpdate; // await deep.id('@deep-foundation/core', 'HandleUpdate');
const handleDeleteId = _ids?.['@deep-foundation/core']?.HandleDelete; // await deep.id('@deep-foundation/core', 'HandleDelete');
const userTypeId = _ids?.['@deep-foundation/core']?.User // await deep.id('@deep-foundation/core', 'User');
const anyTypeId = _ids?.['@deep-foundation/core']?.Any // await deep.id('@deep-foundation/core', 'User');
const thenTypeId = _ids?.['@deep-foundation/core']?.Then // await deep.id('@deep-foundation/core', 'Then');
const promiseTypeId = _ids?.['@deep-foundation/core']?.Promise // await deep.id('@deep-foundation/core', 'Promise');
const resolvedTypeId = _ids?.['@deep-foundation/core']?.Resolved // await deep.id('@deep-foundation/core', 'Resolved');
const rejectedTypeId = _ids?.['@deep-foundation/core']?.Rejected // await deep.id('@deep-foundation/core', 'Rejected');
const promiseResultTypeId = _ids?.['@deep-foundation/core']?.PromiseResult // await deep.id('@deep-foundation/core', 'PromiseResult');
const packageTypeId = _ids?.['@deep-foundation/core']?.Package // await deep.id('@deep-foundation/core', 'Package');
const containTypeId = _ids?.['@deep-foundation/core']?.Contain // await deep.id('@deep-foundation/core', 'Contain');
const plv8SupportsJsTypeId = _ids?.['@deep-foundation/core']?.plv8SupportsJs // await deep.id('@deep-foundation/core', 'plv8SupportsJs');
const HandlerTypeId = _ids?.['@deep-foundation/core']?.Handler // await deep.id('@deep-foundation/core', 'Handler');
const SelectorTypeId = _ids?.['@deep-foundation/core']?.Selector // await deep.id('@deep-foundation/core', 'SelectorType');
const AllowSelectTypeId = _ids?.['@deep-foundation/core']?.AllowSelectType // await deep.id('@deep-foundation/core', 'AllowSelectType');
const AllowSelectId = _ids?.['@deep-foundation/core']?.AllowSelect // await deep.id('@deep-foundation/core', 'AllowSelect');
const AllowAdminId = _ids?.['@deep-foundation/core']?.AllowAdmin // await deep.id('@deep-foundation/core', 'AllowAdmin');
const AllowInsertTypeId = _ids?.['@deep-foundation/core']?.AllowInsertType // await deep.id('@deep-foundation/core', 'AllowInsertType')
const AllowUpdateTypeId = _ids?.['@deep-foundation/core']?.AllowUpdateType // await deep.id('@deep-foundation/core', 'AllowUpdateType')
const AllowDeleteTypeId = _ids?.['@deep-foundation/core']?.AllowDeleteType // await deep.id('@deep-foundation/core', 'AllowDeleteType')
const AllowDeleteId = _ids?.['@deep-foundation/core']?.AllowDelete // await deep.id('@deep-foundation/core', 'AllowDelete');
const AllowUpdateId = _ids?.['@deep-foundation/core']?.AllowUpdate // await deep.id('@deep-foundation/core', 'AllowUpdate');

const decodeBase64urlCode = `select decode(rpad(translate($1, '-_', '+/'),4*((length($1)+3)/4),'='),'base64');`;

const parseJwtCode = `
DECLARE parts varchar array := string_to_array($1, '.'); BEGIN RETURN concat('{ "headers":',convert_from(${LINKS_TABLE_NAME}__decode__base64url(parts[1]), 'utf-8'),', "payload":',convert_from(${LINKS_TABLE_NAME}__decode__base64url(parts[2]), 'utf-8'),'}'); END;`;

const newSelectCode = `\`SELECT links.id as id, links.to_id as to_id FROM links, strings WHERE links.type_id=${containTypeId} AND strings.link_id=links.id AND strings.value='\${item}' AND links.from_id=\${query_id}\``;
const insertLinkStringCode = `\`INSERT INTO links (type_id\${id ? ', id' : ''}\${from_id ? ', from_id' : ''}\${to_id ? ', to_id' : ''}) \``;

const insertValueStringCode = `\`INSERT INTO \${checkedNumber ? 'number' : checkedString ? 'string' : checkedObject ? 'object' : ''}s ( link_id, value ) VALUES (\$1 , \$2) RETURNING ID\``;
const updateValueStringCode = `\`UPDATE \${table} SET \${set} WHERE \${where} RETURNING id;\``;

const deleteStringCode = `\`DELETE FROM links WHERE id=$1::bigint RETURNING ID\``;
const deleteStringTableCode = `\`DELETE FROM \${table} WHERE link_id=$1::bigint RETURNING ID\``;

const typeHandlersCode = `\`SELECT 
  coalesce(
    json_agg("root"), 
    '[]'
  ) AS "root" 
FROM 
  (
    SELECT 
      row_to_json(
        (
          SELECT 
            "_5_e" 
          FROM 
            (
              SELECT 
                "_4_root.base"."id" AS "id", 
                "public"."links__value__function"("link" => "_4_root.base") AS "valuseResult", 
                "handler"."id" as "handler"
            ) AS "_5_e"
        )
      ) AS "root" 
    FROM 
      (
        SELECT 
          * 
        FROM 
          "public"."links" AS "codeLink" 
        WHERE 
          (
            (
              EXISTS (
                SELECT 
                  1 
                FROM 
                  "public"."links" AS "handler" 
                WHERE 
                  (
                    (
                      (
                        ("handler"."to_id") = ("codeLink"."id")
                      )
                    ) 
                    AND (
                      (
                        (
                          (
                            EXISTS (
                              SELECT 
                                1 
                              FROM 
                                "public"."links" AS "supports" 
                              WHERE 
                                (
                                  (
                                    (
                                      ("supports"."id") = ("handler"."from_id")
                                    )
                                  ) 
                                  AND (
                                    (
                                      (
                                        (
                                          (
                                            (
                                              ("supports"."id") = (
                                                ${plv8SupportsJsTypeId} :: bigint
                                              )
                                            )
                                          )
                                        )
                                      )
                                    )
                                  )
                                )
                            )
                          ) 
                          AND (
                            (
                              EXISTS (
                                SELECT 
                                  1 
                                FROM 
                                  "public"."links" AS "HandlerOperation" 
                                WHERE 
                                  (
                                    (
                                      (
                                        ("HandlerOperation"."to_id") = ("handler"."id")
                                      )
                                    ) 
                                    AND (
                                      (
                                        (
                                          (
                                            EXISTS (
                                              SELECT 
                                                1 
                                              FROM 
                                                "public"."links" AS "HandleTypeLink" 
                                              WHERE 
                                                (
                                                  (
                                                    (
                                                      ("HandleTypeLink"."id") = ("HandlerOperation"."from_id")
                                                    )
                                                    OR
                                                    (
                                                      ${anyTypeId} = ("HandlerOperation"."from_id")
                                                    )
                                                  ) 
                                                  AND (
                                                    (
                                                      (
                                                        (
                                                          (
                                                            ("HandleTypeLink"."id") = ($1 :: bigint)
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                            )
                                          ) 
                                          AND (
                                            (
                                              (
                                                ("HandlerOperation"."type_id") = ($2 :: bigint)
                                              ) 
                                              AND ('true')
                                            )
                                          )
                                        )
                                      )
                                    )
                                  )
                              )
                            ) 
                            AND (
                              (
                                (
                                  ("handler"."type_id") = (${HandlerTypeId} :: bigint)
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
              )
            )
          )
      ) AS "_4_root.base", 
      "public"."links" AS "handler" 
    WHERE 
      "handler"."to_id" = "_4_root.base"."id" 
      AND "handler"."type_id" = ${HandlerTypeId} :: bigint
  ) AS "_6_root
"\``;

const selectorHandlersCode = `\`SELECT coalesce(json_agg("root"),'[]') AS "root" FROM ( SELECT row_to_json( ( SELECT "_5_e" FROM ( SELECT "_4_root.base"."id" AS "id" ,"public"."links__value__function"("link" => "_4_root.base") AS "valuseResult" ,"handler"."id" AS "handler" ) AS "_5_e" ) ) AS "root" FROM ( SELECT * FROM "public"."links" AS "codeLink" WHERE ( ( EXISTS ( SELECT 1 FROM "public"."links" AS "handler" WHERE ( ( ( ("handler"."to_id") = ("codeLink"."id") ) ) AND ( ( ( ( EXISTS ( SELECT 1 FROM "public"."links" AS "supports" WHERE ( ( ( ("supports"."id") = ("handler"."from_id") ) ) AND ( ( ( ( ( (("supports"."id") = (${plv8SupportsJsTypeId} :: bigint)) ) ) ) ) ) ) ) ) AND ( ( EXISTS ( SELECT 1 FROM "public"."links" AS "HandlerOperation" WHERE ( ( ( ("HandlerOperation"."to_id") = ("handler"."id") ) ) AND ( ( ( ( EXISTS ( SELECT 1 FROM "public"."links" AS "selector" WHERE ( ( ( ("selector"."id") = ("HandlerOperation"."from_id") ) ) AND ( ( ( ( (("selector"."type_id") = (${SelectorTypeId} :: bigint)) ) AND ( ( ( ("selector"."id") = ANY($1 :: bigint array) ) ) ) ) ) ) ) ) ) AND ( ( (("HandlerOperation"."type_id") = ($2 :: bigint)) ) ) ) ) ) ) ) ) AND ( ( (("handler"."type_id") = (${HandlerTypeId} :: bigint)) ) ) ) ) ) ) ) ) ) ) ) AS "_4_root.base", "public"."links" AS "handler" WHERE "handler"."to_id" = "_4_root.base"."id" AND "handler"."type_id" = ${HandlerTypeId} :: bigint ) AS "_6_root"\``;

const pckgCode = `typeof(start) === 'string' ? \`SELECT links.id as id FROM links, strings WHERE links.type_id=${packageTypeId} AND strings.link_id=links.id AND strings.value='\${start}'\` : \`SELECT links.id as id FROM WHERE links.id=\${start}\``;

const selectWithPermissions = `\`SELECT "main".*\${valueTableSelect} FROM "public"."links" as "main"\${valueTableString}\ WHERE ( ( EXISTS ( SELECT 1 FROM "public"."links" AS "_0__be_0_links" WHERE ( ( ( ("_0__be_0_links"."id") = ("main"."type_id") ) ) AND ( ( ( ( EXISTS ( SELECT 1 FROM "public"."can" AS "_1__be_1_can" WHERE ( ( ( ("_1__be_1_can"."object_id") = ("_0__be_0_links"."id") ) ) AND ( ( ( ( (("_1__be_1_can"."action_id") = (${AllowSelectTypeId} :: bigint)) ) AND ( ( ( ("_1__be_1_can"."subject_id") = ($1 :: bigint) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) OR ( ( EXISTS ( SELECT 1 FROM "public"."can" AS "_2__be_2_can" WHERE ( ( ( ("_2__be_2_can"."object_id") = ("main"."id") ) ) AND ( ( ( ( (("_2__be_2_can"."action_id") = (${AllowSelectId} :: bigint)) ) AND ( ( ( ("_2__be_2_can"."subject_id") = ($1 :: bigint) ) ) ) ) ) ) ) ) ) ) OR ( EXISTS ( SELECT 1 FROM "public"."can" WHERE "object_id" = $1 :: bigint AND "action_id" = ${AllowAdminId} :: bigint AND "subject_id" = $1 :: bigint ) ) ) AND (\${where})\``;

const selectTreeWithPermissions = `\`SELECT "main".* FROM tree AS "main" WHERE \${where} AND exists( SELECT 1 FROM "public"."links" AS "main_1" WHERE ( ( EXISTS ( SELECT 1 FROM "public"."links" AS "_0__be_0_links" WHERE ( ( ( ("_0__be_0_links"."id") = ("main_1"."type_id") ) ) AND ( ( ( ( EXISTS ( SELECT 1 FROM "public"."can" AS "_1__be_1_can" WHERE ( ( ( ("_1__be_1_can"."object_id") = ("_0__be_0_links"."id") ) ) AND ( ( ( ( (("_1__be_1_can"."action_id") = (${AllowSelectTypeId} :: bigint)) ) AND ( ( ( ("_1__be_1_can"."subject_id") = ($1 :: bigint) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) OR ( ( EXISTS ( SELECT 1 FROM "public"."can" AS "_2__be_2_can" WHERE ( ( ( ("_2__be_2_can"."object_id") = ("main_1"."id") ) ) AND ( ( ( ( (("_2__be_2_can"."action_id") = (${AllowSelectId} :: bigint)) ) AND ( ( ( ("_2__be_2_can"."subject_id") = ($1 :: bigint) ) ) ) ) ) ) ) ) ) ) OR ( EXISTS ( SELECT 1 FROM "public"."can" AS "can_1" WHERE "object_id" = $1 :: bigint AND "action_id" = ${AllowAdminId} :: bigint AND "subject_id" = $1 :: bigint ) ) ) AND "main_1".id = "main".parent_id) AND exists( SELECT 1 FROM "public"."links" AS "main_2" WHERE ( ( EXISTS ( SELECT 1 FROM "public"."links" AS "_1__be_1_links" WHERE ( ( ( ("_1__be_1_links"."id") = ("main_2"."type_id") ) ) AND ( ( ( ( EXISTS ( SELECT 1 FROM "public"."can" AS "_3__be_3_can" WHERE ( ( ( ("_3__be_3_can"."object_id") = ("_1__be_1_links"."id") ) ) AND ( ( ( ( (("_3__be_3_can"."action_id") = (${AllowSelectTypeId} :: bigint)) ) AND ( ( ( ("_3__be_3_can"."subject_id") = ($1 :: bigint) ) ) ) ) ) ) ) ) ) ) ) ) ) ) ) OR ( ( EXISTS ( SELECT 1 FROM "public"."can" AS "_4__be_4_can" WHERE ( ( ( ("_4__be_4_can"."object_id") = ("main_2"."id") ) ) AND ( ( ( ( (("_4__be_4_can"."action_id") = (${AllowSelectId} :: bigint)) ) AND ( ( ( ("_4__be_4_can"."subject_id") = ($1 :: bigint) ) ) ) ) ) ) ) ) ) ) OR ( EXISTS ( SELECT 1 FROM "public"."can" AS "can_2" WHERE "object_id" = $1 :: bigint AND "action_id" = ${AllowAdminId} :: bigint AND "subject_id" = $1 :: bigint ) ) ) AND "main_2".id = "main".link_id)\``;

const selectCan = `\`SELECT * FROM can AS "main" WHERE \${where} \``;
const selectSelectors = `\`SELECT * FROM selectors AS "main" WHERE \${where} \``;

const mpUpCode = `\`SELECT coalesce(json_agg("root"),'[]') AS "root" FROM ( SELECT row_to_json( ( SELECT "_5_e" FROM ( SELECT "_1_root.base"."id" AS "id" ,"_4_root.or.path_item"."path_item" AS "path_item" ,"_1_root.base"."path_item_depth" AS "path_item_depth" ,"_1_root.base"."position_id" AS "position_id" ) AS "_5_e" ) ) AS "root" FROM ( SELECT * FROM "public"."mp" WHERE ( (("public"."mp"."item_id") = ($1 :: bigint)) AND ( EXISTS ( SELECT 1 FROM "public"."links" AS "_0__be_0_links" WHERE ( ( ( ("_0__be_0_links"."id") = ("public"."mp"."path_item_id") ) AND ('true') ) AND ( ('true') AND ( ( ( ( ("_0__be_0_links"."type_id") = ANY((ARRAY [$2, $3]) :: bigint array) ) AND ('true') ) AND ('true') ) AND ('true') ) ) ) ) ) ) ) AS "_1_root.base" LEFT OUTER JOIN LATERAL ( SELECT row_to_json( ( SELECT "_3_e" FROM ( SELECT "_2_root.or.path_item.base"."id" AS "id" ,"_2_root.or.path_item.base"."type_id" AS "type_id" ,"public"."links__value__function"("link" => "_2_root.or.path_item.base") AS "value" ) AS "_3_e" ) ) AS "path_item" FROM ( SELECT * FROM "public"."links" WHERE (("_1_root.base"."path_item_id") = ("id")) LIMIT 1 ) AS "_2_root.or.path_item.base" ) AS "_4_root.or.path_item" ON ('true') ) AS "_6_root"\``;

const mpMeCode = `\`SELECT coalesce(json_agg("root"), '[]') AS "root" FROM ( SELECT row_to_json( ( SELECT "_1_e" FROM ( SELECT "_0_root.base"."id" AS "id", "_0_root.base"."path_item_depth" AS "path_item_depth", "_0_root.base"."position_id" AS "position_id" ) AS "_1_e" ) ) AS "root" FROM ( SELECT * FROM "public"."mp" WHERE ( (("public"."mp"."item_id") = ($1 :: bigint)) AND ( ("public"."mp"."path_item_id") = ($1 :: bigint) ) ) ) AS "_0_root.base" ) AS "_2_root"\``;

const checkAdmin = `\`SELECT exists(SELECT 1 FROM "public"."can" WHERE "action_id" = ${AllowAdminId}::bigint AND "subject_id" = $1::bigint )\``;

const checkInsert = `\`SELECT exists(SELECT "linkForCheck"."id" FROM "public"."can" AS "can", "public"."links" AS "linkForCheck", "public"."links" AS "typeLink" WHERE ("can"."action_id") = (${AllowInsertTypeId} :: bigint) AND ("can"."subject_id") = ($2 :: bigint) AND ("can"."object_id") = ("typeLink"."id") AND ("typeLink"."id") = ("linkForCheck"."type_id") AND ("linkForCheck"."id") = ($1 :: bigint))\``

const checkUpdate = `\`SELECT exists( SELECT "linkForCheck"."id" FROM "public"."can" AS "can", "public"."links" AS "linkForCheck", "public"."links" AS "typeLink" WHERE ( ("can"."action_id") = (${AllowUpdateTypeId} :: bigint) OR ("can"."action_id") = (${AllowUpdateId} :: bigint) ) AND ("can"."subject_id") = ($2 :: bigint) AND ("can"."object_id") = ("typeLink"."id") AND ("typeLink"."id") = ("linkForCheck"."type_id") AND ("linkForCheck"."id") = ($1 :: bigint))\``

const checkDelete = `\`SELECT exists( SELECT "linkForCheck"."id" FROM "public"."can" AS "can", "public"."links" AS "linkForCheck", "public"."links" AS "typeLink" WHERE ( ("can"."action_id") = (${AllowDeleteTypeId} :: bigint) OR ("can"."action_id") = (${AllowDeleteId} :: bigint) ) AND ("can"."subject_id") = ($2 :: bigint) AND ("can"."object_id") = ("typeLink"."id") AND ("typeLink"."id") = ("linkForCheck"."type_id") AND ("linkForCheck"."id") = ($1 :: bigint))\``

const checkInserted = `\`SELECT id from links where id = \${linkid}\``

const checkInsertPermissionCode =  /*javascript*/`(linkid, userId) => {
  if (!Number(plv8.execute(${checkInserted})?.[0]?.id))plv8.elog(ERROR, 'Inserted by sql not found'); 
  if (plv8.execute(${checkAdmin}, [ userId ])?.[0]?.exists) return true;
  const result = plv8.execute(${checkInsert}, [ linkid, userId ]); 
  return !!result[0]?.exists;
}`

const checkUpdatePermissionCode =  /*javascript*/`(linkid, userId) => {
  if (plv8.execute(${checkAdmin}, [ userId ])?.[0]?.exists) return true;
  const result = plv8.execute(${checkUpdate}, [ linkid, userId ]); 
  return !!result[0]?.exists;
}`

const checkDeleteLinkPermissionCode = /*javascript*/`(linkid, userId) => {
  if (plv8.execute(${checkAdmin}, [ userId ])?.[0]?.exists) return true;
  const result = plv8.execute(${checkDelete}, [ linkid, userId ]);
  return !!result[0]?.exists;
}`;

const prepareFunction = /*javascript*/`

  const getOwner = (handlerId) => {
    const mpUp = plv8.execute(${mpUpCode}, [ handlerId, ${userTypeId}, ${packageTypeId} ])[0]?.root;
    const mpMe = plv8.execute(${mpMeCode}, [ handlerId ])[0]?.root;
    
    const possibleOwners = mpMe.map((me) => {
      const getDepthDifference = (depth) => me.path_item_depth - depth;
      const up = mpUp.filter((up) => up.position_id == me.position_id);
      const closestUp = up.sort((a, b) => getDepthDifference(a.path_item_depth) - getDepthDifference(b.path_item_depth))[0];;
      
      return closestUp?.path_item;
    }).filter(r => !!r);

    const ownerPackage = possibleOwners.find(r => r.type_id == ${packageTypeId});
    const ownerUser = possibleOwners.find(r => r.type_id == ${userTypeId});
    const ownerId = ownerPackage ? ownerPackage?.id : ownerUser ? ownerUser?.id : null;
    
    return ownerId;
  };

  const typeHandlers = plv8.execute(${typeHandlersCode}, [ link.type_id, handletypeid ])[0].root.map((textFile)=>{return {value: textFile?.valuseResult?.value, id: textFile?.handler}} );
  for (let i = 0; i < typeHandlers.length; i++){ typeHandlers[i].owner = Number(getOwner(typeHandlers[i].id)); }

  const selectors = plv8.execute( 'SELECT s.selector_id, h.id as handle_operation_id, s.query_id FROM selectors s, links h WHERE s.item_id = $1 AND s.selector_id = h.from_id AND h.type_id = $2', [ link.id, handletypeid ] );
  const testedSelectors = [];
  for (let i = 0; i < selectors.length; i++){ if (!selectors[i].query_id || plv8.execute('bool_exp_execute($1,$2,$3)', [link.id, selectors[i].query_id, user_id])) testedSelectors.push(selectors[i].selector_id); }
  
  const selectorHandlers = plv8.execute(${selectorHandlersCode}, [ testedSelectors, handletypeid ])[0].root.map((textFile)=>{return{value: textFile?.valuseResult?.value, id: textFile?.handler}});
  for (let i = 0; i < selectorHandlers.length; i++){ selectorHandlers[i].owner = Number(getOwner(selectorHandlers[i].id)); }

  const handlers = typeHandlers.concat(selectorHandlers);

  const sortById = ( a, b ) => {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
  }

  return handlers.sort(sortById);
`;

const selectValueTable = `\`SELECT * FROM \${table} WHERE link_id = \${linkId}\``;
const selectLinkByValue = `\`SELECT link_id as id FROM \${table} WHERE value = '\${value}'::\${table==='strings' ? 'text' : table==='objects' ? 'jsonb' : 'bigint'}\``;

const generateSelectWhereCode = /*javascript*/`(_where, shift = 0) => {
  const where = [];
  let values = [];
  let valueTable;
  const keys = Object.keys(_where);
  for (let i = 0; i < keys.length; i++ ){
    if (_where[keys[i]]) {
      if ( !_where[keys[i]]['_in'] ) {
        if (keys[i] !== 'object' && keys[i] !== 'string' && keys[i] !== 'number') {
          where.push('"main".'.concat(keys[i], ' = $',values.length+1+shift));
          values.push(_where[keys[i]]);
        } else {
          const valueKeys = Object.keys(_where[keys[i]]);
          where.push(keys[i].concat('s.link_id = "main".id'));
          valueTable = keys[i].concat('s');
          for (let j = 0; j < valueKeys.length; j++ ){
            if ( !_where[keys[i]][valueKeys[j]]['_in'] ) {
              where.push('"'.concat(keys[i].concat('s".'), valueKeys[j], ' = $', values.length+1+shift));
              values.push(_where[keys[i]][valueKeys[j]]);
            } else {
              const inLength = _where[keys[i]][valueKeys[j]]['_in'].length;
              let inValues = '$'.concat(values.length+1+shift);
              for (let l = values.length+2+shift; l < inLength+values.length+1+shift; l++ ) {
                inValues = inValues.concat(',$',l);
              }
              if(typeof _where[keys[i]][valueKeys[j]]['_in'][0] === 'number'){
                where.push('"'.concat(keys[i].concat('s".')).concat(valueKeys[j], ' IN ( ', inValues ,' )'));
                values = values.concat(_where[keys[i]][valueKeys[j]]['_in']);
              } else if(typeof _where[keys[i]][valueKeys[j]]['_in'][0] === 'string'){
                where.push('"'.concat(keys[i].concat('s".')).concat(valueKeys[j], ' IN ( ', inValues ,' )'));
                values = values.concat(_where[keys[i]][valueKeys[j]]['_in']);
              } else {
                let placeForValueCodeHere;
              }
            }
          }
        }
      } else {
        const inLength = _where[keys[i]]['_in'].length;
        let inValues = '$'.concat(values.length+1+shift);
        for (let l = values.length+2+shift; l < inLength+where.length+1+shift; l++ ) {
          inValues = inValues.concat(',$',l);
        }
        if(typeof _where[keys[i]]['_in'][0] === 'number'){
          where.push('"main".'.concat(keys[i], ' IN ( ', inValues ,' )'));
          values = values.concat(_where[keys[i]]['_in']);
        } else if(typeof _where[keys[i]]['_in'][0] === 'string'){
          where.push('"main".'.concat(keys[i], ' IN ( ', inValues ,' )'));
          values = values.concat(_where[keys[i]]['_in']);
        } else {
          let placeForValueCodeHere;
        }
      }
    }
  }
  return { where: where.join(' AND '), values, valueTable };
}`;

const fillValueByLinksCode = /*javascript*/`(links) => {
  let table;
  let linkId;
  if (!links.length) return links;
  for (let i = 0; i < links.length; i++){
    linkId = Number(links[i].id);
    if (!links[i].value){
      table = 'strings';
      const stringValue = plv8.execute(${selectValueTable})?.[0];
      table = 'objects';
      const objectValue = plv8.execute(${selectValueTable})?.[0];
      table = 'numbers';
      let numberValue = plv8.execute(${selectValueTable})?.[0];
      const value = stringValue || objectValue || numberValue;
      if (value) links[i].value = { id: Number(value?.id), link_id: Number(value?.link_id), value: numberValue ? Number(value.value) : value.value};
    }
  }
}`;

const filterLinksByValueCode = /*javascript*/`(links, _where) => {
  let table;
  let linkId;
  if (!links.length) return links;
  linksLoop: for (let i = 0; i < links.length; i++){
    if (_where.string){
      const stringKeys = _where?.string ? Object.keys(_where.string) : undefined;
      for (let j = 0; j < stringKeys.length; j++ ){
        if (_where.string[stringKeys[j]]['_in']){
          if (!_where.string[stringKeys[j]]['_in'].includes(links[i]?.value?.[stringKeys[j]])){
            links[i] = undefined;
            continue linksLoop;
          }
        } else {
          if (links[i]?.value?.[stringKeys[j]] != _where.string[stringKeys[j]]) {
            links[i] = undefined;
            continue linksLoop;
          }
        }
      }
    }
    if (_where.number){
      const numberKeys = _where?.number ? Object.keys(_where.number) : undefined;
      for (let j = 0; j < numberKeys.length; j++ ){
        if (_where.number[numberKeys[j]]['_in']){
          if (!_where.number[numberKeys[j]]['_in'].includes(links[i]?.value?.[numberKeys[j]])){
            links[i] = undefined;
            continue linksLoop;
          }
        } else {
          if (links[i]?.value?.[numberKeys[j]] != _where.number[numberKeys[j]]) {
            links[i] = undefined;
            continue linksLoop;
          }
        }
      }
    }
    if (_where.object){
      const objectKeys = _where?.object ? Object.keys(_where.object) : undefined;
      for (let j = 0; j < objectKeys.length; j++ ){
        if (_where.object[objectKeys[j]]['_in']){
          if (objectKeys[j] === 'value'){
            let founded = false;
            for (let l = 0; l < _where.object[objectKeys[j]]['_in'].length; l++ ){
              if (typeof links[i]?.value?.[objectKeys[j]] === 'object' && isDeepEqual(_where.object[objectKeys[j]]['_in'][l], links[i]?.value?.[objectKeys[j]])) founded = true;
            }
            if (!founded){
              links[i] = undefined;
              continue linksLoop;
            }
          } else {
            if (!_where.number[numberKeys[j]]['_in'].includes(links[i]?.value?.[numberKeys[j]])){
              links[i] = undefined;
              continue linksLoop;
            }
          }
        } else {
          if (objectKeys[j] === 'value' && typeof links[i]?.value?.value === 'object' && isDeepEqual(_where.object[objectKeys[j]], links[i]?.value?.[objectKeys[j]])) {
            founded = true;
          } else if (links[i]?.value?.[objectKeys[j]] != _where.object[objectKeys[j]]) {
            links[i] = undefined;
            continue linksLoop;
          }
        }
      }
    }
    if (_where.value){
      const valueKeys = _where?.value ? Object.keys(_where.value) : undefined;
      for (let j = 0; j < valueKeys.length; j++ ){
        if (_where.value?.[valueKeys[j]]['_in']){
          if (valueKeys[j] === 'value'){
            let founded = false;
            for (let l = 0; l < _where.value[valueKeys[j]]['_in'].length; l++ ){
              if (typeof _where.value[valueKeys[j]]['_in'][l] === 'object'){
                if (typeof links[i]?.value?.[valueKeys[j]] === 'object' && isDeepEqual(_where.value[valueKeys[j]]['_in'][l], links[i]?.value?.[valueKeys[j]])) founded = true;
              } else {
                if (_where.value[valueKeys[j]]['_in'][l] === links[i]?.value?.[valueKeys[j]]) founded = true;
              }
            }
            if (!founded){
              links[i] = undefined;
              continue linksLoop;
            }
          } else if (!_where.value?.[valueKeys[j]]['_in'].includes(links[i]?.value?.[valueKeys[j]])){
            links[i] = undefined;
            continue linksLoop;
          }
        } else {
          if (links[i]?.value?.[valueKeys[j]] != _where?.value[valueKeys[j]]) {
            links[i] = undefined;
            continue linksLoop;
          }
        }
      }
    }
  }
}`;

const isDeepEqualCode = /*javascript*/`(object1, object2) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (var key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = value1 != null && typeof value1 === "object" && value2 != null && typeof value2 === "object"

    if ((isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
}`;


const findLinkIdByValueCode = /*javascript*/`({ string, object, number, value }) => {
  let table;
  if (string) {
    table = 'strings';
    return { id: plv8.execute(${selectLinkByValue}) };
  }
  if (number) {
    if (isNaN(number)) plv8.elog(ERROR, 'number is NaN '.concat(number));
    table = 'numbers';
    return { id: plv8.execute(${selectLinkByValue}) };
  }
  if (object) {
    table = 'objects';
    try {
      JSON.parse(object);
      const idByObject = plv8.execute(${selectLinkByValue});
    } catch(e) {
      plv8.elog(ERROR, 'Error by parsing json object '.concat(object));
    }
    return { id: plv8.execute(${selectLinkByValue}) };
  }
  if (value) {
    table = 'strings';
    const idByString = plv8.execute(${selectLinkByValue})?.[0]?.id;
    table = 'numbers';
    let idByNumber;
    if (!isNaN(number)) idByNumber = plv8.execute(${selectLinkByValue})?.[0]?.id;
    table = 'objects';
    let idByObject;
    try {
      JSON.parse(value);
      const idByObject = plv8.execute(${selectLinkByValue})?.[0]?.id;
    } catch(e) {
    }
    return idByString || idByNumber || idByObject;
  }
}`;

const objectSet = `\`update objects set value = jsonb_set(value, $2, $3, true) where link_id = $1\``;

const deepFabric =  /*javascript*/`(ownerId, hasura_session) => {
  hasura_session['x-hasura-role'] = 'link';
  return {
    linkId: Number(ownerId),
    id: (start, ...path) => {
      plv8.execute('SELECT set_config($1, $2, $3)', [ 'hasura.user', JSON.stringify({...hasura_session, 'x-hasura-user-id': this.linkId}), true]);
      hasura_session['x-hasura-user-id'] = this.linkId;
      try {
        const pathToWhere = (start, path) => {
          const pckg = ${pckgCode};
          let query_id = plv8.execute(pckg)[0].id;
          for (let p = 0; p < path.length; p++) {
            const item = path[p]
            if (typeof(item) !== 'boolean') {
              const newSelect = plv8.execute(${newSelectCode})[0];
              query_id = p === path.length-1 ? newSelect.to_id : newSelect.id;
              if (!query_id) return undefined;
            }
          }
          return query_id;
        }
        const result = pathToWhere(start, path);
        if (!result && path[path.length - 1] !== true) {
          plv8.elog(ERROR, 'Id not found by '.concat(start, ' -> ', path.join(' -> ')));
        }
        return result;
      } catch (error) {
        plv8.elog(ERROR, 'Id not found by '.concat(start, ' -> ', path.join(' -> ')));
      }
    },
    objectSet: function(link_id, path, value) {
      plv8.execute('SELECT set_config($1, $2, $3)', [ 'hasura.user', JSON.stringify({...hasura_session, 'x-hasura-user-id': this.linkId}), true]);
      hasura_session['x-hasura-user-id'] = this.linkId;
      plv8.execute(${objectSet}, [link_id, path, value]);
    },
    select: function(_where, options) {
      if (options?.table && !['links', 'tree', 'can', 'selectors'].includes(options?.table)) plv8.elog(ERROR, 'select not from "links" not permitted');
      plv8.execute('SELECT set_config($1, $2, $3)', [ 'hasura.user', JSON.stringify({...hasura_session, 'x-hasura-user-id': this.linkId}), true]);
      hasura_session['x-hasura-user-id'] = this.linkId;
      if (_where.value) plv8.elog(ERROR, 'value is not supported yet');
      if (!options?.table || options?.table === 'links'){
        const { id, type_id, from_id, to_id, number, string, object, value } = _where;
        const generateSelectWhere = ${generateSelectWhereCode};
        const findLinkIdByValue = ${findLinkIdByValueCode};
        const fillValueByLinks = ${fillValueByLinksCode};
        const isDeepEqual = ${isDeepEqualCode};
        let generated = generateSelectWhere(_where, 1);
        const where = generated.where;
        let links = [];
        const valueTableString = generated.valueTable ? ', "'.concat(generated.valueTable, '"') : '';
        const valueTableSelect = generated.valueTable ? ', row_to_json("'.concat(generated.valueTable,'".*) as value') : '';
        if (options?.returning) return { data: links.map(link=>link[options?.returning]) };
        if (where) links = plv8.execute(${selectWithPermissions}, [ this.linkId, ...generated.values ]);
        fillValueByLinks(links);
        return { data: links };
      }
      if (options?.table === 'tree'){
        const { id, link_id, parent_id, depth, root_id, position_id, tree_id } = _where;
        const generateSelectWhere = ${generateSelectWhereCode};
        let generated = generateSelectWhere(_where, 1);
        const where = generated.where;
        let links = [];
        if (where) links = plv8.execute(${selectTreeWithPermissions}, [ this.linkId, ...generated.values ]);
        if (options?.returning) return { data: links.map(link=>link[options?.returning]) };
        return { data: links };
      }
      if (options?.table === 'can'){
        const { rule_id, subject_id, object_id, action_id } = _where;
        
        const generateSelectWhere = ${generateSelectWhereCode};
        let generated = generateSelectWhere(_where);
        const where = generated.where;
        let links = [];
        if (where) links = plv8.execute(${selectCan}, generated.values);
        if (options?.returning) return { data: links.map(link=>link[options?.returning]) };
        return { data: links };
      }
      if (options?.table === 'selectors'){
        const { item_id, selector_id, selector_include_id, query_id } = _where;
        const generateSelectWhere = ${generateSelectWhereCode};
        let generated = generateSelectWhere(_where);
        const where = generated.where;
        let links = [];
        if (where) links = plv8.execute(${selectSelectors}, generated.values);
        if (options?.returning) return { data: links.map(link=>link[options?.returning]) };
        return { data: links };
      }
    },
    insert: function(exp, options) {
      const { id, type_id, from_id, to_id, number, string, object } = exp;
      if (options?.table && !['links', 'strings', 'numbers', 'objects'].includes(options?.table)) plv8.elog(ERROR, 'insert to '.concat(options?.table, ' not permitted'));
      if (
        number && typeof number !== 'number' || number?.data?.value && typeof number?.data?.value !== 'number'  ||
        string && typeof string !== 'string' || string?.data?.value && typeof string?.data?.value !== 'string'  ||
        object && typeof object !== 'object' || object?.data?.value && typeof object?.data?.value !== 'object' 
        ) plv8.elog(ERROR, 'value type error');
      plv8.execute('SELECT set_config($1, $2, $3)', [ 'hasura.user', JSON.stringify({...hasura_session, 'x-hasura-user-id': this.linkId}), true]);
      hasura_session['x-hasura-user-id'] = this.linkId;
      const ids = {};
      const checkedNumber = number?.data?.value ? number?.data?.value : number;
      const checkedString = string?.data?.value ? string?.data?.value : string;
      const checkedObject = object?.data?.value ? object?.data?.value : object;
      let valueIterator = 2;
      let insertLinkString = ${insertLinkStringCode};
      let keysValue = 'VALUES ($1';
      const keys = [type_id];
      if (id) { keysValue = keysValue.concat(', $', valueIterator++); keys.push(id); }
      if (from_id) { keysValue = keysValue.concat(', $', valueIterator++); keys.push(from_id); }
      if (to_id) { keysValue = keysValue.concat(', $', valueIterator++); keys.push(to_id); }
      keysValue = keysValue.concat(') RETURNING id');
      const linkid = plv8.execute(insertLinkString.concat(keysValue), keys)[0]?.id;
      const linkCheck = checkInsertPermission(linkid, this.linkId);
      if (!linkCheck) plv8.elog(ERROR, 'Insert not permitted');
      const value = checkedNumber || checkedString || checkedObject;
      if (!value) return { data: [{ id: Number(linkid) }]};
      const insertValueString = ${insertValueStringCode};
      const valueId = plv8.execute(insertValueString, [ linkid, value ])[0]?.id;
      return { data: [{ id: Number(linkid) }]};
    },
    update: function(criteria, _set, options) {
      const exp = typeof criteria === 'object' ? criteria : typeof criteria === 'number' || typeof criteria ===  'bigint' ? { id: criteria } : null;
      const { id, link_id, value } = criteria || {};
      if (options?.table && !['strings', 'numbers', 'objects'].includes(options?.table)) plv8.elog(ERROR, 'update '.concat(options?.table, ' not permitted'));
      const { table } = options || {};
      plv8.execute('SELECT set_config($1, $2, $3)', [ 'hasura.user', JSON.stringify({...hasura_session, 'x-hasura-user-id': this.linkId}), true]);
      hasura_session['x-hasura-user-id'] = this.linkId;
      const linkCheck = checkUpdatePermission(link_id, this.linkId);
      if (!linkCheck) plv8.elog(ERROR, 'Update not permitted');
      
      const whereArr = [];
      const setArr = [];
      const whereFileds = Object.keys(exp).filter(key=>exp[key]);
      const variables = [];
      let counter = 1;
      for (let i = 0; i < whereFileds.length; i++, counter++ ){
        whereArr.push(whereFileds[i].concat(' = $', counter));
        variables.push(exp[whereFileds[i]]);
      }
      const setFileds = Object.keys(_set).filter(key=>_set[key]);
      for (let i = 0; i < setFileds.length; i++, counter++ ){
        setArr.push(setFileds[i].concat(' = $', counter));
        variables.push(_set[setFileds[i]]);
      }
      const where = whereArr.join(', ');
      const set = setArr.join(', ');
      const updateValueString = ${updateValueStringCode};
      const links = plv8.execute(updateValueString, variables);

      return { data: links};
    },
    delete: function(criteria, options) {
      const _where = typeof criteria === 'object' ? criteria : typeof criteria === 'number' || typeof criteria ===  'bigint' ? { id: criteria } : null;
      const { id } = _where || {};
      if (!id) throw new Error('No valid id to delete');
      const { table } = options || {};
      if (table && !['links', 'strings', 'numbers', 'objects'].includes(table)) plv8.elog(ERROR, 'delete from '.concat(table, ' not permitted'));
      plv8.execute('SELECT set_config($1, $2, $3)', [ 'hasura.user', JSON.stringify({...hasura_session, 'x-hasura-user-id': this.linkId}), true]);
      hasura_session['x-hasura-user-id'] = this.linkId;
      const linkCheck = checkDeleteLinkPermission(id, this.linkId, table);
      if (!linkCheck) plv8.elog(ERROR, 'Delete not permitted');
      const deleteString = ${deleteStringCode};
      let linkid;
      if (table) {
        const deleteStringTable = ${deleteStringTableCode};
        linkid = plv8.execute(deleteStringTable, [ id ])[0].id;
      } else {
        linkid = plv8.execute(deleteString, [ id ])[0].id;
      }
      return { data: [{ id: linkid }]};
    },
    login: function(options) {
      let { token, linkId } = options;
      if (!token && !linkId) plv8.elog(ERROR, 'No token and no linkId provided');
      if (token && typeof token !== 'string' || linkId && typeof linkId !== 'number') plv8.elog(ERROR, 'Options validation failed');
      if (token && !linkId) linkId = plv8.execute('SELECT ${LINKS_TABLE_NAME}__parse__jwt($1)', [token])[0]?.links__parse__jwt?.payload?.['https://hasura.io/jwt/claims']?.['x-hasura-user-id'];
      if (linkId) {
        this.linkId = linkId;
        hasura_session['x-hasura-user-id'] = linkId;
        return ({ linkId, token })
      }
      return ({ error: 'no link founded'});
    },
    new: function(options) {
      let { token, linkId } = options;
      if (!token && !linkId) plv8.elog(ERROR, 'No token and no linkId provided');
      if ( token && typeof token !== 'string' || linkId && typeof linkId !== 'number') plv8.elog(ERROR, 'Options validation failed');
      if (token && !linkId) linkId = plv8.execute('SELECT ${LINKS_TABLE_NAME}__parse__jwt($1)', [token])[0]?.links__parse__jwt?.payload?.['https://hasura.io/jwt/claims']?.['x-hasura-user-id'];
      return deepFabric(linkId, hasura_session);
    },
    can: function(objectIds, subjectIds, actionIds, userIds = this.linkId) {
      const where = {};
      if (objectIds) where.object_id = typeof(objectIds) === 'number' ? +objectIds : { in: objectIds };
      if (subjectIds) where.subject_id = typeof(subjectIds) === 'number' ? +objectIds : { in: subjectIds };
      if (actionIds) where.action_id = typeof(actionIds) === 'number' ? +objectIds : { in: actionIds };
      const result = this.select(where, { table: 'can', returning: 'rule_id' });
      return !!result?.data?.length;
    }
  }
}`;

const triggerFunctionFabric = (handleOperationTypeId, valueTrigger) => /*javascript*/`
  const checkInsertPermission = ${checkInsertPermissionCode};
  const checkUpdatePermission = ${checkUpdatePermissionCode};
  const checkDeleteLinkPermission = ${checkDeleteLinkPermissionCode};
  const fillValueByLinks = ${fillValueByLinksCode};
  const deepFabric = ${deepFabric};
  const prepare = plv8.find_function("${LINKS_TABLE_NAME}__sync__handlers__prepare__function");
  let data;
  let prepared;

  const hasura_session = JSON.parse(plv8.execute("select current_setting('hasura.user', 't')")[0].current_setting);
  const default_role = hasura_session['x-hasura-role'];
  const default_user_id = hasura_session['x-hasura-user-id'];
  
  if (${valueTrigger}){
    const linkId = NEW?.link_id || OLD?.link_id;
    const link = plv8.execute("select * from links where id = $1", [ linkId ])[0];
    prepared = link ? prepare(link, ${handleOperationTypeId}) : [];
    data = {
      triggeredByLinkId: Number(default_user_id),
      oldLink: { 
        id: Number(link?.id),
        from_id: Number(link?.from_id),
        to_id: Number(link?.to_id),
        type_id: Number(link?.type_id),
        value: OLD ? { id: Number(OLD.id), link_id: Number(OLD.link_id), value: typeof OLD.value === 'number' ? Number(OLD.value) : OLD.value } : undefined
      }, 
      newLink: { 
        id: Number(link?.id),
        from_id: Number(link?.from_id),
        to_id: Number(link?.to_id),
        type_id: Number(link?.type_id), 
        value: NEW ? { id: Number(NEW.id), link_id: Number(NEW.link_id), value: typeof NEW.value === 'number' ? Number(NEW.value) : NEW.value } : undefined
      }, 
    };
  } else {
    const link = { id: NEW?.id || OLD?.id };
    fillValueByLinks([link]);
    prepared = prepare(${handleOperationTypeId === handleDeleteId ? 'OLD' : 'NEW'}, ${handleOperationTypeId});
    data = {
      triggeredByLinkId: Number(default_user_id),
      oldLink: OLD ? {
        id: Number(OLD?.id),
        from_id: Number(OLD?.from_id),
        to_id: Number(OLD?.to_id),
        type_id: Number(OLD?.type_id),
        value: link?.value
      } : undefined, newLink: NEW ? {
        id: Number(NEW?.id),
        from_id: Number(NEW?.from_id),
        to_id: Number(NEW?.to_id),
        type_id: Number(NEW?.type_id),
        value: link?.value
      } : undefined,
    };
  }

  const require = (package) => {
    const packageFabric = plv8.find_function("${LINKS_TABLE_NAME}__sync__handlers__".concat(package, '__package'));
    return packageFabric();
  }
  for (let i = 0; i < prepared.length; i++) {
    (()=>{
        const deep = deepFabric(prepared[i].owner, hasura_session);
        const prepare = undefined;
        const fillValueByLinks = undefined;
        const checkSelectPermission = undefined;
        const checkInsertPermission = undefined;
        const checkUpdatePermission = undefined;
        const checkDeleteLinkPermission = undefined;
        const default_role = undefined;
        const default_user_id =  undefined;
        const func = eval(prepared[i].value);
        func({ deep, require, data });
    })()
  };

  if (hasura_session['x-hasura-role'] !== default_role || hasura_session['x-hasura-user-id'] !== default_user_id){
    if (default_role) hasura_session['x-hasura-role'] = default_role; 
    if (default_user_id) hasura_session['x-hasura-user-id'] = default_user_id;
    plv8.execute('SELECT set_config($1, $2, $3)', ['hasura.user', JSON.stringify(hasura_session), true]);
  }
  return NEW;
`;

const deepClientFunction = /*javascript*/`

const checkInsertPermission = ${checkInsertPermissionCode};
const checkUpdatePermission = ${checkUpdatePermissionCode};
const checkDeleteLinkPermission = ${checkDeleteLinkPermissionCode}; 
const hasura_session = JSON.parse(plv8.execute("select current_setting('hasura.user', 't')")[0].current_setting);
const default_role = hasura_session['x-hasura-role'];
const default_user_id = hasura_session['x-hasura-user-id'];

const deep = (${deepFabric})(Number(clientlinkid), hasura_session);
const result = operation === 'id' || operation === 'update' || operation === 'objectSet' ? deep[operation](...args) : deep[operation](args, options);
if (hasura_session['x-hasura-role'] !== default_role || hasura_session['x-hasura-user-id'] !== default_user_id){
  if (default_role) hasura_session['x-hasura-role'] = default_role; 
  if (default_user_id) hasura_session['x-hasura-user-id'] = default_user_id;
  plv8.execute('SELECT set_config($1, $2, $3)', ['hasura.user', JSON.stringify(hasura_session), true]);
}
return result;`;

// service functions

export const createPrepareFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__prepare__function(link jsonb, handletypeid bigint) RETURNS jsonb AS $$ ${prepareFunction} $$ LANGUAGE plv8;`;
export const dropPrepareFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__prepare__function CASCADE;`;

export const createDeepClientFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__deep__client(clientLinkId bigint, operation text, args jsonb, options jsonb) RETURNS jsonb AS $$ ${deepClientFunction} $$ LANGUAGE plv8;`;
export const dropDeepClientFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__deep__client CASCADE;`;

export const createDecodeBase64urlFunction = sql`CREATE OR REPLACE function ${LINKS_TABLE_NAME}__decode__base64url(text) returns bytea as $$ ${decodeBase64urlCode} $$ language sql strict immutable;`;
export const dropDecodeBase64urlFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__decode__base64url CASCADE;`;

export const createParseJwtFunction = sql`CREATE OR REPLACE function ${LINKS_TABLE_NAME}__parse__jwt(text) returns JSONB as $$ ${parseJwtCode} $$language plpgsql;`;
export const dropParseJwtFunction  = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__parse__jwt CASCADE;`;

// insert link trigger

export const createSyncInsertTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__insert__trigger__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleInsertId, false)} $$ LANGUAGE plv8;`;
export const createSyncInsertTrigger = sql`CREATE TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__insert__trigger AFTER INSERT ON "links" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__handlers__insert__trigger__function();`;
export const dropSyncInsertTrigger = sql`DROP TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__insert__trigger ON "${LINKS_TABLE_NAME}";`;
export const dropSyncInsertTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__insert__trigger__function CASCADE;`;

// delete link trigger

export const createSyncDeleteTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__delete__trigger__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleDeleteId, false)} $$ LANGUAGE plv8;`;
export const createSyncDeleteTrigger = sql`CREATE TRIGGER a_${LINKS_TABLE_NAME}__sync__handlers__delete__trigger AFTER DELETE ON "links" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__handlers__delete__trigger__function();`;
export const dropSyncDeleteTrigger = sql`DROP TRIGGER a_${LINKS_TABLE_NAME}__sync__handlers__delete__trigger ON "${LINKS_TABLE_NAME}";`;
export const dropSyncDeleteTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__delete__trigger__function CASCADE;`;

// update link trigger

export const createSyncUpdateTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__update__handler__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleUpdateId, false)} $$ LANGUAGE plv8;`;
export const createSyncUpdateTrigger = sql`CREATE TRIGGER a_${LINKS_TABLE_NAME}__sync__update__handler__trigger AFTER UPDATE ON "links" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__update__handler__function();`;
export const dropSyncUpdateTrigger = sql`DROP TRIGGER a_${LINKS_TABLE_NAME}__sync__update__handler__trigger ON "${LINKS_TABLE_NAME}";`;
export const dropSyncUpdateTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__update__handler__function CASCADE;`;

// strings triggers

export const createSyncInsertStringsTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__insert__strings__trigger__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleUpdateId, true)} $$ LANGUAGE plv8;`;
export const createSyncInsertStringsTrigger = sql`CREATE TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__insert__strings__trigger AFTER INSERT ON "strings" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__handlers__insert__strings__trigger__function();`;
export const dropSyncInsertStringsTrigger = sql`DROP TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__insert__strings__trigger ON "strings";`;
export const dropSyncInsertStringsTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__insert__strings__trigger__function CASCADE;`;

export const createSyncUpdateStringsTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__update__strings__trigger__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleUpdateId, true)} $$ LANGUAGE plv8;`;
export const createSyncUpdateStringsTrigger = sql`CREATE TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__update__strings__trigger AFTER UPDATE ON "strings" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__handlers__update__strings__trigger__function();`;
export const dropSyncUpdateStringsTrigger = sql`DROP TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__update__strings__trigger ON "strings";`;
export const dropSyncUpdateStringsTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__update__strings__trigger__function CASCADE;`;

export const createSyncDeleteStringsTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__delete__strings__trigger__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleUpdateId, true)} $$ LANGUAGE plv8;`;
export const createSyncDeleteStringsTrigger = sql`CREATE TRIGGER a_${LINKS_TABLE_NAME}__sync__handlers__delete__strings__trigger AFTER DELETE ON "strings" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__handlers__delete__strings__trigger__function();`;
export const dropSyncDeleteStringsTrigger = sql`DROP TRIGGER a_${LINKS_TABLE_NAME}__sync__handlers__delete__strings__trigger ON "strings";`;
export const dropSyncDeleteStringsTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__delete__strings__trigger__function CASCADE;`;

// numbers triggers

export const createSyncInsertNumbersTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__insert__numbers__trigger__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleUpdateId, true)} $$ LANGUAGE plv8;`;
export const createSyncInsertNumbersTrigger = sql`CREATE TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__insert__numbers__trigger AFTER INSERT ON "numbers" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__handlers__insert__numbers__trigger__function();`;
export const dropSyncInsertNumbersTrigger = sql`DROP TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__insert__numbers__trigger ON "numbers";`;
export const dropSyncInsertNumbersTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__insert__numbers__trigger__function CASCADE;`;

export const createSyncUpdateNumbersTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__update__numbers__trigger__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleUpdateId, true)} $$ LANGUAGE plv8;`;
export const createSyncUpdateNumbersTrigger = sql`CREATE TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__update__numbers__trigger AFTER UPDATE ON "numbers" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__handlers__update__numbers__trigger__function();`;
export const dropSyncUpdateNumbersTrigger = sql`DROP TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__update__numbers__trigger ON "numbers";`;
export const dropSyncUpdateNumbersTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__update__numbers__trigger__function CASCADE;`;

export const createSyncDeleteNumbersTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__delete__numbers__trigger__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleUpdateId, true)} $$ LANGUAGE plv8;`;
export const createSyncDeleteNumbersTrigger = sql`CREATE TRIGGER a_${LINKS_TABLE_NAME}__sync__handlers__delete__numbers__trigger AFTER DELETE ON "numbers" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__handlers__delete__numbers__trigger__function();`;
export const dropSyncDeleteNumbersTrigger = sql`DROP TRIGGER a_${LINKS_TABLE_NAME}__sync__handlers__delete__numbers__trigger ON "numbers";`;
export const dropSyncDeleteNumbersTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__delete__numbers__trigger__function CASCADE;`;

// objects triggers

export const createSyncInsertObjectsTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__insert__objects__trigger__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleUpdateId, true)} $$ LANGUAGE plv8;`;
export const createSyncInsertObjectsTrigger = sql`CREATE TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__insert__objects__trigger AFTER INSERT ON "objects" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__handlers__insert__objects__trigger__function();`;
export const dropSyncInsertObjectsTrigger = sql`DROP TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__insert__objects__trigger ON "objects";`;
export const dropSyncInsertObjectsTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__insert__objects__trigger__function CASCADE;`;

export const createSyncUpdateObjectsTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__update__objects__trigger__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleUpdateId, true)} $$ LANGUAGE plv8;`;
export const createSyncUpdateObjectsTrigger = sql`CREATE TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__update__objects__trigger AFTER UPDATE ON "objects" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__handlers__update__objects__trigger__function();`;
export const dropSyncUpdateObjectsTrigger = sql`DROP TRIGGER z_${LINKS_TABLE_NAME}__sync__handlers__update__objects__trigger ON "objects";`;
export const dropSyncUpdateObjectsTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__update__objects__trigger__function CASCADE;`;

export const createSyncDeleteObjectsTriggerFunction = sql`CREATE OR REPLACE FUNCTION ${LINKS_TABLE_NAME}__sync__handlers__delete__objects__trigger__function() RETURNS TRIGGER AS $$ ${triggerFunctionFabric(handleUpdateId, true)} $$ LANGUAGE plv8;`;
export const createSyncDeleteObjectsTrigger = sql`CREATE TRIGGER a_${LINKS_TABLE_NAME}__sync__handlers__delete__objects__trigger AFTER DELETE ON "objects" FOR EACH ROW EXECUTE PROCEDURE ${LINKS_TABLE_NAME}__sync__handlers__delete__objects__trigger__function();`;
export const dropSyncDeleteObjectsTrigger = sql`DROP TRIGGER a_${LINKS_TABLE_NAME}__sync__handlers__delete__objects__trigger ON "objects";`;
export const dropSyncDeleteObjectsTriggerFunction = sql`DROP FUNCTION IF EXISTS ${LINKS_TABLE_NAME}__sync__handlers__delete__objects__trigger__function CASCADE;`;


export const up = async () => {
  log('up');

  await api.sql(sql`CREATE EXTENSION IF NOT EXISTS plv8;`);

  await api.sql(createPrepareFunction);
  await api.sql(createDecodeBase64urlFunction);
  await api.sql(createParseJwtFunction);

  await api.sql(createDeepClientFunction);
  
  await api.sql(createSyncInsertTriggerFunction);
  await api.sql(createSyncInsertTrigger);

  await api.sql(createSyncUpdateTriggerFunction);
  await api.sql(createSyncUpdateTrigger);

  await api.sql(createSyncDeleteTriggerFunction);
  await api.sql(createSyncDeleteTrigger);

  await api.sql(createSyncInsertStringsTriggerFunction);
  await api.sql(createSyncInsertStringsTrigger);

  await api.sql(createSyncUpdateStringsTriggerFunction);
  await api.sql(createSyncUpdateStringsTrigger);

  await api.sql(createSyncDeleteStringsTriggerFunction);
  await api.sql(createSyncDeleteStringsTrigger);

  await api.sql(createSyncInsertNumbersTriggerFunction);
  await api.sql(createSyncInsertNumbersTrigger);

  await api.sql(createSyncUpdateNumbersTriggerFunction);
  await api.sql(createSyncUpdateNumbersTrigger);

  await api.sql(createSyncDeleteNumbersTriggerFunction);
  await api.sql(createSyncDeleteNumbersTrigger);

  await api.sql(createSyncInsertObjectsTriggerFunction);
  await api.sql(createSyncInsertObjectsTrigger);

  await api.sql(createSyncUpdateObjectsTriggerFunction);
  await api.sql(createSyncUpdateObjectsTrigger);

  await api.sql(createSyncDeleteObjectsTriggerFunction);
  await api.sql(createSyncDeleteObjectsTrigger);
};

export const down = async () => {
  log('down');

  await api.sql(dropPrepareFunction);
  await api.sql(dropDecodeBase64urlFunction);
  await api.sql(dropParseJwtFunction);

  await api.sql(dropDeepClientFunction);

  await api.sql(dropSyncInsertTrigger);
  await api.sql(dropSyncInsertTriggerFunction);

  await api.sql(dropSyncDeleteTrigger);
  await api.sql(dropSyncDeleteTriggerFunction);

  await api.sql(dropSyncInsertStringsTrigger);
  await api.sql(dropSyncInsertStringsTriggerFunction);

  await api.sql(dropSyncUpdateStringsTrigger);
  await api.sql(dropSyncUpdateStringsTriggerFunction);

  await api.sql(dropSyncDeleteStringsTrigger);
  await api.sql(dropSyncDeleteStringsTriggerFunction);

  await api.sql(dropSyncInsertNumbersTrigger);
  await api.sql(dropSyncInsertNumbersTriggerFunction);

  await api.sql(dropSyncUpdateNumbersTrigger);
  await api.sql(dropSyncUpdateNumbersTriggerFunction);

  await api.sql(dropSyncDeleteNumbersTrigger);
  await api.sql(dropSyncDeleteNumbersTriggerFunction);

  await api.sql(dropSyncInsertObjectsTrigger);
  await api.sql(dropSyncInsertObjectsTriggerFunction);

  await api.sql(dropSyncUpdateObjectsTrigger);
  await api.sql(dropSyncUpdateObjectsTriggerFunction);

  await api.sql(dropSyncDeleteObjectsTrigger);
  await api.sql(dropSyncDeleteObjectsTriggerFunction);

  await api.sql(sql`DROP EXTENSION IF EXISTS plv8 CASCADE;`);
};
