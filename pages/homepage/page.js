const { StaticCompiler } = require('../../nova');
const header = require('./components/header/static');

const components = [header('five')];

const importComponents = [{ component: 'gallery' }];
const compiler = new StaticCompiler(components, 'homepage', { lang: 'se', title: 'nova', importComponents })

compiler.compile();