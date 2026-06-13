const fs = require('fs');

const peEdits = {
    'pageEditor_ST1.html': ['validation_ST1.html#splashVal', 'validation_ST1.html#volunteerVal', 'validation_ST1.html#contentVal'],
    'pageEditor_ST2.html': ['validation_ST2.html#homeVal', 'validation_ST2.html#tableVal', 'validation_ST2.html#contentVal'],
    'pageEditor_ST3.html': ['validation_ST3.html#validation-feedback', 'validation_ST3.html#validation-team', 'validation_ST3.html#validation-content'],
    'pageEditor_ST4.html': ['validation_ST4.html#profileVal', 'validation_ST4.html#sitemapVal', 'validation_ST4.html#contentVal']
};

const valEdits = {
    'validation_ST1.html': ['pageEditor_ST1.html#splash', 'pageEditor_ST1.html#volunteer', 'pageEditor_ST1.html#content'],
    'validation_ST2.html': ['pageEditor_ST2.html#home', 'pageEditor_ST2.html#table', 'pageEditor_ST2.html#content'],
    'validation_ST3.html': ['pageEditor_ST3.html#feedback', 'pageEditor_ST3.html#team', 'pageEditor_ST3.html#content'],
    'validation_ST4.html': ['pageEditor_ST4.html#user-profile', 'pageEditor_ST4.html#sitemap', 'pageEditor_ST4.html#content']
};

for (const [file, links] of Object.entries(peEdits)) {
    let content = fs.readFileSync(file, 'utf8');
    let searchStr = new RegExp(`href="validation_ST\\d\\.html[^"]*"`, 'g');
    
    // We only want to replace the first 3 matches. The others (e.g. in the footer) should be left as is,
    // or actually footer has target="_self" or just href="validation_STx.html". 
    // To be safe, let's just do it sequentially.
    let index = 0;
    content = content.replace(searchStr, (match) => {
        if (index < 3) {
            return `href="${links[index++]}"`;
        }
        return `href="validation_ST${file.match(/\d/)[0]}.html"`; // clean up any hash from footer just in case
    });
    
    fs.writeFileSync(file, content);
    console.log(`Updated links in ${file}`);
}

for (const [file, links] of Object.entries(valEdits)) {
    let content = fs.readFileSync(file, 'utf8');
    let searchStr = new RegExp(`href="pageEditor_ST\\d\\.html[^"]*"`, 'g');
    
    let index = 0;
    content = content.replace(searchStr, (match) => {
        // Exclude the ST buttons at the top right which have class="editor-btn" or similar!
        // Wait, the regex matches href="pageEditor_ST1.html" but we only want the links under <h3>Back to Page Editor page</h3>
        // Let's rely on the sequential occurrence. But wait, we added ST1, ST2, ST3, ST4 buttons! 
        // We added them just after <body>. So the first 4 links are the ST buttons!
        // Let's use a more specific regex. We know they are inside `<p><a href="..."` or `</a>,</p>` or similar.
        // Actually, we can just replace all occurrences of:
        // href="pageEditor_STx.html..." that are followed by ">link back" or ">click here"
        return match; 
    });
    // Let's do it with a safer specific replace:
    
    // Reset content to original to use a different approach
    content = fs.readFileSync(file, 'utf8');
    
    // Replace the specific patterns found under "Back to Page Editor page"
    // In validation_STx, they look like: <p><a href="pageEditor_ST1.html">link back
    // or <a href="pageEditor_ST4.html#sitemapVal">click here</a>
    
    let blockSearch = /<h3>Back to Page Editor page<\/h3>\s*<p><a href="([^"]+)"/g;
    let i = 0;
    content = content.replace(blockSearch, (match, p1) => {
        if (i < 3) {
            return `<h3>Back to Page Editor page</h3>\n                    <p><a href="${links[i++]}"`;
        }
        return match;
    });

    fs.writeFileSync(file, content);
    console.log(`Updated links in ${file}`);
}
