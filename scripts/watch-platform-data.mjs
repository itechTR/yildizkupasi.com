// Local-preview companion. GitHub Actions uses update-platform-data.mjs directly.
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const run=promisify(execFile);
while(true){
 try{const result=await run(process.execPath,['scripts/update-platform-data.mjs'],{timeout:55000});console.log(result.stdout.trim());}
 catch{console.error('Score refresh failed; previous snapshot retained.');}
 await new Promise(resolve=>setTimeout(resolve,60000));
}
