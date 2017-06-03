const EXTRA_PARAMS = ['page', 'pageSize'];

function splitQueryParam(queryParam) {
  let result;
  if (queryParam) {
    result = queryParam.split(',');
  }
  return result;
}

function parseQueryParams(query) {
  let resultQuery = {};
  for (let param in query) {
    resultQuery[param] = splitQueryParam(query[param]);
  }
  return resultQuery;
}

function buildDbQuery(reqQuery) {
  const parsedQuery = parseQueryParams(reqQuery);
  let dbQuery = {};
  for (let paramName in parsedQuery) {
    if (!parsedQuery.hasOwnProperty(paramName) || EXTRA_PARAMS.includes(paramName)) {
      continue;
    }
    let paramValue = parsedQuery[paramName];
    if (paramValue.length > 1) {
      dbQuery[paramName] = {'$in': paramValue};
    } else {
      dbQuery[paramName] = paramValue[0];
    }
  }
  return dbQuery;
}

module.exports.buildDbQuery = buildDbQuery;