const fs = require('fs');
const path = require('path');

async function processReadMe(readmeFilePath) {
    const readmeFileDir = path.dirname(readmeFilePath);

    try {
        let readmeContent = (await fs.promises.readFile(readmeFilePath)).toString();

        const matches = readmeContent.match(/<!-- @include .+/ig);
        if (!matches) { return; }

        for (const match of matches) {
            const split = match.trim().match(/^<!-- @include (.+) -->$/);
            const file = split[1];
            const filePath = path.join(readmeFileDir, file);
            const includedFileContent = (await fs.promises.readFile(filePath)).toString();
            readmeContent = readmeContent.replace(
                new RegExp(`${match}\r{0,1}\n\r{0,1}.*\r{0,1}\n\r{0,1}<!-- @include-end ${file} -->`, 'gm'),
                `${match.trim()}\n${includedFileContent}\n<!-- @include-end ${file} -->`
            );
            console.log(`replaced: ${filePath}`);
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