const fs = require('fs');
const path = require('path');

console.log("🔍 Iniciando verificação do projeto...\n");

// 1️⃣ Verificar se .env está no .gitignore
const gitignorePath = path.join(__dirname, '.gitignore');
if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    if (!gitignoreContent.includes('.env')) {
        console.log("⚠️ ALERTA: O arquivo `.env` NÃO está no `.gitignore`! Adicione para proteger suas credenciais.");
    } else {
        console.log("✅ O arquivo `.env` está protegido no `.gitignore`.");
    }
} else {
    console.log("⚠️ ALERTA: O arquivo `.gitignore` não foi encontrado! Você precisa criar um para proteger `.env` e `node_modules/`.");
}

// 2️⃣ Verificar se node_modules/ está no .gitignore
if (fs.existsSync(gitignorePath)) {
    if (!gitignoreContent.includes('node_modules')) {
        console.log("⚠️ ALERTA: A pasta `node_modules/` NÃO está no `.gitignore`! Adicione para evitar problemas no GitHub.");
    } else {
        console.log("✅ A pasta `node_modules/` está protegida no `.gitignore`.");
    }
}

// 3️⃣ Verificar estrutura MVC
const requiredFiles = [
    'server.js',
    'routes/contacts.js',
    'models/Contact.js'
];

requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ Arquivo encontrado: ${file}`);
    } else {
        console.log(`❌ ERRO: Arquivo não encontrado: ${file} (Verifique se está no local correto)`);
    }
});

console.log("\n✅ Verificação concluída! Se houver avisos ⚠️, corrija antes de enviar seu projeto.\n");
