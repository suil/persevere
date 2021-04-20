const fs = require('fs');
const path = require('path');

async function processReadMe(readmeFilePath) {
    const readmeFileDir = path.dirname(readmeFilePath);

    try {
        let readmeContent = (await fs.promises.readFile(readmeFilePath)).toString();

        const matches = readmeContent.match(/\n@include .+/ig);
        if (!matches) { return; }

        for (const match of matches) {
            const split = match.trim().split('@include ');
            const file = split.filter(s => s.trim())[0];
            const filePath = path.join(readmeFileDir, file);
            const includedFileContent = (await fs.promises.readFile(filePath)).toString();
            readmeContent = readmeContent.replace(match,
                `<!-- ${match.trim()} -->\n${includedFileContent}`
            );
        }
    
        await fs.promises.writeFile(readmeFilePath, readmeContent);

        console.log(`replaced: ${readmeFilePath}`);
    } catch (error) {
       console.log(`error replacing: ${readmeFilePath}`, error);
    }
}

(async () => {
    const root = './coding';
    const folders = await fs.promises.readdir(root);
    for (const folder of folders) {
        const folderPath = path.join(root, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            const files = await fs.promises.readdir(folderPath);
            for (const file of files) {
                const filePath = path.join(root, folder, file);
                processReadMe(filePath)
            }
        }
    }
})();