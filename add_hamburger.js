const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if nav exists
    if (content.includes('<nav class="navigation">') || content.includes('<nav class="navigation"')) {
        // Check if menu-icon already exists
        if (!content.includes('class="menu-icon"')) {
            // Find the <ul> inside the nav to inject before it
            // Or just inject right before closing </nav>
            const navCloseIndex = content.indexOf('</nav>');
            if (navCloseIndex !== -1) {
                const injectString = '\n      <div class="menu-icon" onclick="document.querySelector(\'nav ul\').classList.toggle(\'active\')">☰</div>\n    ';
                content = content.slice(0, navCloseIndex) + injectString + content.slice(navCloseIndex);
                fs.writeFileSync(filePath, content, 'utf8');
                updatedCount++;
                console.log(`Updated ${file}`);
            }
        }
    }
}

console.log(`Finished injecting hamburger menu. Updated ${updatedCount} files.`);
