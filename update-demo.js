/* eslint-disable @typescript-eslint/no-var-requires */
/*
  用于 dumi 改造使用，
  可用于将 examples 的文件批量修改为 demo 引入形式，
  其他项目根据具体情况使用。
*/

const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob');

const paths = glob.sync('./docs/examples/*.tsx');

paths.forEach(p => {
  const name = p
    .split('/')
    .pop()
    .split('.')[0];
  if (!fs.existsSync(path.resolve(__dirname, './docs/demo/'))) {
    fs.mkdirSync(path.resolve(__dirname, './docs/demo/'));
  }
  fs.writeFile(
    `./docs/demo/${name}.md`,
    `## ${name}

<code src="../examples/${name}.tsx">
`,
    'utf8',
    function(error) {
      if (error) {
        console.log(error);
        return false;
      }
      console.log(`${name} 更新成功~`);
    }
  );
});
