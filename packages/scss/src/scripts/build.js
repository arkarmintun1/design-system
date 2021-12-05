const fs = require('fs');
const path = require('path');
const sass = require('sass');

const getComponents = () => {
  let allComponents = [];
  const types = ['atoms', 'molecules', 'organisms'];
  types.forEach((type) => {
    const allFiles = fs.readdirSync(`src/${type}`).map((file) => ({
      input: `src/${type}/${file}`,
      output: `src/lib/${file.slice(0, -4) + 'css'}`,
    }));

    allComponents = [...allComponents, ...allFiles];
  });
  return allComponents;
};

const compile = (filePath, fileName) => {
  const result = sass.renderSync({
    data: fs.readFileSync(path.resolve(filePath)).toString(),
    outputStyle: 'expanded',
    includePaths: [path.resolve('src')],
  });
  fs.writeFileSync(path.resolve(fileName), result.css.toString());
};

compile('src/global.scss', 'src/lib/global.css');

getComponents().forEach((component) => {
  compile(component.input, component.output);
});
