const fs = require('fs');
const path = require('path');
const dir = process.cwd();
fs.readdirSync(dir).forEach(f => {
    if(f.endsWith('.html')) {
        let p = path.join(dir, f);
        let c = fs.readFileSync(p, 'utf8');
        let orig = c;
        c = c.replace(/<\/section><\/a><\/p>/g, '</section>');
        c = c.replace(/<br><\/br>/g, '<br>');
        if(f === 'validation_ST1.html') {
            c = c.replace('            </div>\r\n            </div>\r\n\r\n            <div class="footer-section">', '            </div>\r\n\r\n            <div class="footer-section">');
            c = c.replace('            </div>\n            </div>\n\n            <div class="footer-section">', '            </div>\n\n            <div class="footer-section">');
        }
        if(f === 'pageEditor_ST4.html') {
            c = c.replace('<br><br>\r\n                <ol>', '<br><br></p>\r\n                <ol>');
            c = c.replace('<br><br>\n                <ol>', '<br><br></p>\n                <ol>');
        }
        if(f === 'pageEditor_ST3.html') {
            c = c.replace('        </main>\r\n    </div>\r\n        <!-- Sidebar area -->', '        </main>\r\n        <!-- Sidebar area -->');
            c = c.replace('        </main>\n    </div>\n        <!-- Sidebar area -->', '        </main>\n        <!-- Sidebar area -->');
        }
        if(c !== orig) {
            fs.writeFileSync(p, c);
            console.log('Fixed syntax in ' + f);
        }
    }
});
