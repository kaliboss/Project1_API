const projects = {};
let defaultProj = true;

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};


// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// return user object as JSON
const getProjects = (request, response) => {
  if (defaultProj === true) {
    projects.testData = {};
    // add or update fields for this project name

    projects.testData.project = 'Test Data';
    projects.testData.name = 'Austin Stone';
    projects.testData.description = 'This is default test data for when the page loads up for the first time';
    defaultProj = false;
  }
  const responseJSON = {
    projects,
  };

  respondJSON(request, response, 200, responseJSON);
};

// method to handle our getProjects head
const getProjectsMeta = (request, response) => respondJSONMeta(request, response, 200);

// function to add a user from a POST body
const addProject = (request, response, body) => {
  // default json message
  const responseJSON = {
    message: 'project name, creator name, and description required',
  };

  // check to make sure we have all fields
  // We might want more validation than just checking if they exist
  // This could easily be abused with invalid types (such as booleans, numbers, etc)
  // If either are missing, send back an error message as a 400 badRequest
  if (!body.project || !body.name || !body.description) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code to 201 created
  let responseCode = 201;

  // if that project already exists in our object
  // then switch to a 204 updated status
  if (projects[body.project]) {
    responseCode = 204;
  } else {
    // otherwise create an object with that project name
    projects[body.project] = {};
  }

  // add or update fields for this project name
  projects[body.project].project = body.project;
  projects[body.project].name = body.name;
  projects[body.project].description = body.description;

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  // 204 has an empty payload, just a success
  // It cannot have a body, so we just send a 204 without a message
  // 204 will not alter the browser in any way!!!
  return respondJSONMeta(request, response, responseCode);
};

const addRating = (request, response, body) => {
  // default json message
  const responseJSON = {
    message: 'rating required',
  };

  // check to make sure we have all fields
  // We might want more validation than just checking if they exist
  // This could easily be abused with invalid types (such as booleans, numbers, etc)
  // If either are missing, send back an error message as a 400 badRequest
  if (!body.project || !body.rating) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code to 201 created
  const responseCode = 204;

  // add or update fields for this project name
  if (projects[body.project].rating) {
    const ratingNum = (Number(projects[body.project].rating) + Number(body.rating)) / 2;
    projects[body.project].rating = ratingNum.toString();
  } else {
    projects[body.project].rating = body.rating;
  }

  // if response is created, then set our created message
  // and sent response with a message
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  // 204 has an empty payload, just a success
  // It cannot have a body, so we just send a 204 without a message
  // 204 will not alter the browser in any way!!!
  return respondJSONMeta(request, response, responseCode);
};

// function for 404 not found requests with message
const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};
// public exports
module.exports = {
  getProjects,
  getProjectsMeta,
  addProject,
  addRating,
  notFound,
  notFoundMeta,
};
