const fs = require('fs');
const path = require('path');

const cssSnippet = `
/* ST Navigation Buttons */
.editor-nav-buttons {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: row;
    gap: 15px;
    z-index: 1000;
}

.editor-btn {
    width: 60px;
    height: 60px;
    background-color: #00838f;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    transition: background-color 0.3s, transform 0.2s;
}

.editor-btn:hover {
    background-color: #006064;
    transform: scale(1.1);
    color: white;
}
`;

const htmlSnippet = `
    <!-- ST Navigation Buttons -->
    <div class="editor-nav-buttons">
        <a href="pageEditor_ST1.html" class="editor-btn">ST1</a>
        <a href="pageEditor_ST2.html" class="editor-btn">ST2</a>
        <a href="pageEditor_ST3.html" class="editor-btn">ST3</a>
        <a href="pageEditor_ST4.html" class="editor-btn">ST4</a>
    </div>
`;

const files = ['pageEditor_ST1.html', 'pageEditor_ST2.html', 'pageEditor_ST3.html', 'pageEditor_ST4.html'];

files.forEach(f => {
    let p = path.join(process.cwd(), f);
    let c = fs.readFileSync(p, 'utf8');
    if (!c.includes('editor-nav-buttons')) {
        c = c.replace('<body>', '<body>' + htmlSnippet);
        fs.writeFileSync(p, c);
        console.log('Updated HTML ' + f);
    }
});

let cssPath = path.join(process.cwd(), 'pageEditor_validator.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');
if (!cssContent.includes('.editor-nav-buttons')) {
    fs.writeFileSync(cssPath, cssContent + '\n' + cssSnippet);
    console.log('Updated CSS');
}
