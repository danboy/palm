if (Mom === undefined) {
  var Mom = {};
}

Mom.failedResult = function() {
  return {
    "totalCount": 1,
    "passedCount": 0,
    "failedCount": 1,
    "results": [{"passed": false, "message": "Failed."}],
    "description": "should bar"
  };
};