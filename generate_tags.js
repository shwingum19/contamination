const fs = require('fs');
const zones = ['A','B','C'];
const path = './tags_generated/'; // dossier où les fichiers seront créés

// Crée le dossier si il n'existe pas
if (!fs.existsSync(path)){
    fs.mkdirSync(path);
}

// Template HTML pour chaque tag
function generateTagHTML(tagId){
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Tag ${tagId}</title>
<style>
body { font-family: Arial; background:#111; color:#fff; text-align:center; padding:50px;}
#tag { font-size:50px; padding:20px; border-radius:10px; display:inline-block; margin-bottom:30px; }
.sain { background-color:#28a745; }
.contamine { background-color:#dc3545; }
button { font-size:20px; padding:10px 20px; margin:10px; cursor:pointer; }
</style>
</head>
<body>

<h1>Tag ${tagId}</h1>
<div id="tag">${tagId}</div>
<br>
<button onclick="setTag('contamine')">Contaminer</button>
<button onclick="setTag('sain')">Purifier</button>

<script>
const tagId = "${tagId}";
const tagDiv = document.getElementById("tag");

function loadTag() {
  const state = localStorage.getItem(tagId) || "sain";
  tagDiv.className = state;
}
function setTag(state) {
  localStorage.setItem(tagId, state);
  tagDiv.className = state;
  alert(tagId + " est maintenant " + state.toUpperCase());
}
loadTag();
</script>

</body>
</html>`;
}

// Génère tous les tags
zones.forEach(zone => {
    for(let i=1; i<=12; i++){
        const tagId = zone + String(i).padStart(2,"0");
        const content = generateTagHTML(tagId);
        fs.writeFileSync(`${path}${tagId}.html`, content, 'utf8');
        console.log(`Fichier créé: ${tagId}.html`);
    }
});

console.log('✅ Tous les fichiers tags ont été générés dans le dossier "tags_generated" !');
