const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const browserFetcher = puppeteer.createBrowserFetcher();
  await page.goto('https://www.zcool.com.cn/discover/0!8!0!0!0!!!!2!-1!1');
//   await page.screenshot({path: 'example.png'});
//   const a = await page.$('.pop-login');
let c = await page.$eval('.pop-login', divs => divs.id);
  console.log(c);
  const $ = await page.evaluate(() => {
      // 在内部可以获得window对象,但是不能返回window对象的属性
      let $ = window.$;
        let t = $('.pop-login').html();
        return t
  });
// await page.evaluate(async () => {
//     // use window.md5 to compute hashes
//     const myString = 'PUPPETEER';
//     const myHash = await window.$;
//     console.log(`md5 of ${myString} is ${myHash}`);
//   });
  console.log($);
  
  browser.close();

  process.send({result: $});
  process.exit(0);

})();