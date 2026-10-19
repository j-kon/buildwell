'use strict';
const fs=require('fs'), path=require('path');
let ts;try{ts=require('typescript');}catch{try{ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript');}catch{console.error('Run npm install first, then npm run build to compile React JSX.');process.exit(1);}}
const root=path.resolve(__dirname,'..'),input=path.join(root,'src','App.jsx'),output=path.join(root,'public','app.js');
const result=ts.transpileModule(fs.readFileSync(input,'utf8'),{fileName:'App.jsx',compilerOptions:{allowJs:true,jsx:ts.JsxEmit.React,target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.None},reportDiagnostics:true});
if(result.diagnostics?.length){console.error(ts.formatDiagnosticsWithColorAndContext(result.diagnostics,{getCanonicalFileName:f=>f,getCurrentDirectory:()=>root,getNewLine:()=>"\n"}));process.exit(1);}
fs.writeFileSync(output,result.outputText);console.log('Compiled React JSX -> public/app.js');
