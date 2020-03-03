const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const index2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const img = fs.readFileSync(`${__dirname}/../client/background.png`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getIndex2 = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index2);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getImg = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(img);
  response.end();
};

module.exports = {
  getIndex,
  getIndex2,
  getCSS,
  getImg,
};
