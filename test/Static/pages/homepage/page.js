const { StaticCompiler } = require('../../../../index');
const header = require('./components/header/static');
const gallery = require('./components/gallery/static');

const components = [header, gallery]

const compiler = new StaticCompiler(components, { lang: 'se' })
compiler.compile();
console.log(compiler.HTMLDocument)

