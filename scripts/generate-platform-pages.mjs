import fs from 'node:fs/promises';
const catalog=JSON.parse(await fs.readFile('platform/catalog.json','utf8'));
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const template=(await fs.readFile('turnuvalar/index.html','utf8'));
for(const t of catalog.tournaments){
 if(t.archiveUrl)continue;
 if(!/^[a-z0-9-]+$/.test(t.id))throw Error('Invalid tournament ID');
 const route=`turnuvalar/${t.id}`;
 await fs.mkdir(route,{recursive:true});
 await fs.writeFile(`${route}/index.html`,template.replace(/<title>.*?<\/title>/,`<title>${escape(t.name)} | Yıldız Kupası</title>`).replace('https://yildizkupasi.com/turnuvalar/','https://yildizkupasi.com/'+route+'/'));
}
