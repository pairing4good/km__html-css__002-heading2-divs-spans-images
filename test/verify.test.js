const http = require('http');
const fs = require('fs');
const puppeteer = require('puppeteer');

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/..' + req.url, function (err,data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });
  
  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3000/index.html');
});

afterEach(async () => {
  await browser.close();
});

describe('heading 2', () => {
  it('should exist', async () => {
    const heading = await page.$('h2');
    expect(heading).not.toBeNull();
  });
});

describe('span', () => {
  it('should exist', async () => {
    const span = await page.$('span')
    expect(span).not.toBeNull();
  });
});


describe('div', () => {
  it('should exist', async () => {
    const div = await page.$('div')
    expect(div).not.toBeNull();
  });
});

describe('image', () => {
  it('should exist', async () => {
    const img = await page.$('img')
    expect(img).not.toBeNull();
  });
  
  it('should have source attribute', async () => {
    const source = await page.$('img[src]')
    expect(source).not.toBeNull();
  });
  
  it('should have alternate text attribute', async () => {
    const alternateText = await page.$('img[alt]')
    expect(alternateText).not.toBeNull();
  });
});