import fileManager from './fileManager.js';
import readLine from 'readline-sync';
import path from 'path';
import url, { fileURLToPath } from 'url';

async function main(){
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const baseDir = path.join(__dirname, "my_files");
    fileManager.createDirectory(baseDir)
    const readName = () => {
        const fileName = readLine.question('Digite o nome do arquivo (com extensao): ');
        return fileName;}

    while (true){
        console.log('====Menu====');
        console.log('1- Criar Arquivo');
        console.log('2- Listar Arquivos');
        console.log('3- Ler Arquivo');
        console.log('4- Reescrever Arquivo');
        console.log('5- Deletar Arquivo');
        console.log('6- sair');
        const choice = readLine.question('Escolha uma opcao: ');

        try{
        switch(choice){
            case '1':
                const filePath = readLine.question('Nome do arquivo: ');
                const fileContent = readLine.question('Conteudo do arquivo (ou em branco): ');
                const createFilePath = path.join(baseDir, filePath);
                const fileRespose = await fileManager.createFile(createFilePath, fileContent);
                console.log(fileRespose);
                break;
            
            case '2':
                const files = await fileManager.listFiles(baseDir);
                console.log('Arquivos no diretório base: ',files)
                break;

            case '3':
                const readFileName = readName();
                const readFilePath = path.join(baseDir, readFileName);
                const readFileContent = await fileManager.readFile(readFilePath);
                console.log(`Conteúdo do arquivo: \n ${readFileContent}`)
                break

            case '4':
                const writeFileName = readName();
                const writeFilePath = path.join(baseDir, writeFileName);
                const writeFileContent = readLine.question('Digite o novo conteúdo para sobrescrever: \n');
                await fileManager.writeFile(writeFilePath, writeFileContent);
                console.log('Arquivo reescrito com sucesso');
                break

            case '5':
                const deleteFileName = readName();
                const deleteFilePath = path.join(baseDir, deleteFileName);
                await fileManager.deleteFile(deleteFilePath);
                console.log('Arquivo deletado com sucesso!')
                break;

            case '6':
                return;
            default:
                console.log('Opcao invalida');    
        }
    } catch (err){console.log(err)}
    }
}

main();