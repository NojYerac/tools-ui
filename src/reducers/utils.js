"use strict";

function getMatcher(displayFilter, fields) {
  if (displayFilter.basic) {
    return basicMatch(displayFilter.basicMatch, fields);
  }
  return advMatch(displayFilter.where);
}

function basicMatch(filter, fields) {
  // always return true if no filters provided.
  if (!filter.length) {return () => (true);}
  const words = filter.toLowerCase().split(/\s+/g);
  return test => {
    let matched = false;
    // concatinate all the searchable strings into one
    let searchable = fields.map(field => test[field]).join(" ").toLowerCase();
    words.forEach((word) => {
      // only test if necessary
      if (word && !matched) {
        matched = searchable.indexOf(word) > -1;
      }
    });
    return matched;
  };
}

function advMatch(filters) {
  // always return true if no filters provided.
  if (!(filters && filters.length)) {return () => (true);}
  // collect test functions
  let tests = {
    required: [],
    notReq: []
  };
  // create a test function for each filter
  filters.forEach(function(condition) {
    let testFunc;
    const {key, value, oper} = condition;
    let arrayValue = value ? value.split(",") : [];
    if (arrayValue.length === 1) {
      arrayValue = arrayValue[0];
    }
    switch (oper) {
      // equal
      case "eq":
        testFunc = test => (test[key] === value);
        break;
      // not equal
      case "ne":
        testFunc = test => (test[key] !== value);
        break;
      // less than
      case "lt":
        testFunc = test => (test[key] < value);
        break;
      // greater than
      case "gt":
        testFunc = test => (test[key] > value);
        break;
      // value in condition
      case "in":
        testFunc = test => (arrayValue.indexOf(test[key]) > -1);
        // if (Array.isArray(arrayValue)) {
        //   testFunc = test => (arrayValue.indexOf(test[key]) > -1);
        // } else {
        //   testFunc = test => (
        //     arrayValue.toString().toLowerCase().indexOf(
        //      test[key].toString().toLowerCase()
        //    ) > -1
        //  );
        // }
        break;
      // condition in value
      case "has":
        testFunc = test => (
          test[key] && (
            test[key].toString().toLowerCase().indexOf(
              value.toString().toLowerCase()
            ) > -1)
          );
        break;
      case "matches":
        testFunc = test => ((new RegExp(value)).test(test[key]));
        break;
      default:
        throw new Error(`Unsuported operater ${oper}`);
    }
    // invert if testing a `not` condition
    if (condition.not) {
      const oldTest = testFunc;
      testFunc = test => !oldTest(test);
    }
    // keep required tests seperate
    if (condition.required) {
      tests.required.push(testFunc);
    } else {
      tests.notReq.push(testFunc);
    }
  });
  // return the composed test function
  return test => {
    let i;
    // return false if any required test fails
    for (i = 0; i < tests.required.length; ++i) {
      if (!tests.required[i](test)) {
        return false;
      }
    }
    // return true if no optional tests specified
    if (!tests.notReq.length) {return true;}
    // return true if any optional test succeeds
    for (i = 0; i < tests.notReq.length; ++i) {
      if (tests.notReq[i](test)) {
        return true;
      }
    }
    // return false if all optional tests fail
    return false;
  };
}

export function filter(state, fields) {
  let matches;
  // matches = getCached(state);
  // if (!matches) {
    matches = state.all.filter(getMatcher(state.displayFilter, fields));
  //   setCached(state.displayFilter, matches);
  // }
  return matches;
}

export function order(list, orderBy) {
  list.sort((a, b) => {
    let order = 0;
    orderBy.forEach(ord => {
      if (order) {return;}
      let key = ord[0];
      let sortOrder = ord[1] === "DESC" ? -1 : 1;
      if (a[key] > b[key]) {
        order = 1;
      } else if (a[key] < b[key]) {
        order = -1;
      }
      order = sortOrder * order;
    });
    return order;
  });
  return list;
}

export function cloneState(state) {
  let nextState = Object.assign({}, state);
  return nextState;
}

export function merge(newState, indexById, payload) {
  payload.forEach((newItem) => {
    let index = indexById[newItem.id];
    if (isNaN(index)) {
      index = newState.all.length;
      newState.indexById[newItem.id] = index;
      newState.indexByCveId[newItem.cveId] = index;
      newState.all[index] = newItem;
    } else {
      newState.all[index] = Object.assign(newState.all[index], newItem);
    }
  });
}
