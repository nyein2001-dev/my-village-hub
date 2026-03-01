const fs = require('fs');
const path = require('path');
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
    const metaRegex = /export const metadata\s*=\s*\{[^}]+\};\n?/g;

    const metadataMatch = content.match(/export const metadata\s*=\s*\{\s*title:\s*'([^']+)'\s*\};\n?/);
    if (metadataMatch && content.includes('use client')) {
        const title = metadataMatch[1];
        // remove metadata from page.tsx
        content = content.replace(metaRegex, '');
        fs.writeFileSync(file, content);

        // generate layout.tsx
        const dir = path.dirname(file);
        const layoutFile = path.join(dir, 'layout.tsx');
        if (fs.existsSync(layoutFile)) {
            let layoutContent = fs.readFileSync(layoutFile, 'utf8');
            if (!layoutContent.includes('export const metadata')) {
                layoutContent = "export const metadata = { title: '" + title + "' };\n" + layoutContent;
                fs.writeFileSync(layoutFile, layoutContent);
            }
        } else {
            const newLayout = "export const metadata = { title: '" + title + "' };\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <>{children}</>;\n}\n";
            fs.writeFileSync(layoutFile, newLayout);
        }
    }
});
