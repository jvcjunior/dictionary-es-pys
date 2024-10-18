import _ from "lodash";

export const getCanonicalString = _.flow([_.trim, _.deburr, _.lowerCase]);
