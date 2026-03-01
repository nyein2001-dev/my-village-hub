const fs = require('fs');
const path = require('path');
const p = path.join(process.cwd(), 'app', '**', 'page.tsx');
let files = [];
function findPages(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        if (item.isDirectory()) {
            findPages(path.join(dir, item.name));
        } else if (item.name === 'page.tsx') {
            files.push(path.join(dir, item.name));
        }
    }
}
findPages(path.join(process.cwd(), 'app'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('export const metadata')) return;
    const match = content.match(/export default function ([a-zA-Z0-9_]+)/);
    if (match) {
        let name = match[1].replace(/Page$/, '').replace(/([A-Z])/g, ' $1').trim();
        if (name === 'Home') name = 'Home';
        if (name === 'Dashboard Home') name = 'Dashboard';
        if (name.startsWith('Admin ')) name = name.replace('Admin ', '');
        const meta = "export const metadata = { title: '" + name + "' };\n";

        const lastImport = content.lastIndexOf('import ');
        if (lastImport !== -1) {
            const endOfImport = content.indexOf('\n', lastImport);
            content = content.slice(0, endOfImport + 1) + '\n' + meta + content.slice(endOfImport + 1);
        } else {
            content = meta + '\n' + content;
        }
        fs.writeFileSync(file, content);
    }
});
console.log('Updated ' + files.length + ' files');
