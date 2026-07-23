/**
 * Gera automaticamente content/imoveis/_manifest.json
 * a partir de todos os arquivos .json existentes em content/imoveis/.
 *
 * Roda a cada deploy no Netlify (veja netlify.toml), então qualquer
 * imóvel adicionado, removido ou editado pelo painel /admin já é
 * refletido no site sem precisar editar nada manualmente.
 */
const fs = require('fs');
const path = require('path');

const pastaImoveis = path.join(__dirname, '..', 'content', 'imoveis');
const caminhoManifesto = path.join(pastaImoveis, '_manifest.json');

function gerarManifesto() {
  if (!fs.existsSync(pastaImoveis)) {
    console.error(`Pasta não encontrada: ${pastaImoveis}`);
    process.exit(1);
  }

  const codigos = fs.readdirSync(pastaImoveis)
    .filter(nome => nome.endsWith('.json') && nome !== '_manifest.json')
    .map(nome => nome.replace(/\.json$/, ''))
    .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }));

  fs.writeFileSync(caminhoManifesto, JSON.stringify(codigos, null, 2) + '\n', 'utf8');

  console.log(`_manifest.json gerado com ${codigos.length} imóvel(is): ${codigos.join(', ')}`);
}

gerarManifesto();
