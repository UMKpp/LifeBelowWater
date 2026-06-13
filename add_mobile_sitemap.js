const fs = require('fs');

const sitemapPath = 'c:\\Documents\\Github\\LifeBelowWater\\sitemap.html';
let content = fs.readFileSync(sitemapPath, 'utf8');

if (!content.includes('mobile-sitemap')) {
    const mobileSitemapHTML = `
<div class="mobile-sitemap">
    <div class="tree-node">
        <a href="index.html" class="tree-main">HOME</a>
        <div class="tree-children">
            <a href="index.html">OUR MISSION</a>
            <a href="index.html">CONTENT</a>
            <a href="index.html">SDG TARGET</a>
            <a href="index.html">PUBLICATIONS</a>
        </div>
    </div>
    <div class="tree-node">
        <a href="volunteer.html" class="tree-main">VOLUNTEER</a>
    </div>
    <div class="tree-node">
        <a href="table.html" class="tree-main">TABLE</a>
    </div>
    <div class="tree-node">
        <a href="profile.html" class="tree-main">USER PROFILE</a>
    </div>
    <div class="tree-node">
        <a href="feedback.html" class="tree-main">FEEDBACK</a>
    </div>
    <div class="tree-node">
        <a href="team.html" class="tree-main">OUR TEAM</a>
        <div class="tree-children">
            <a href="pageEditor_ST1.html" target="_blank">Dulaj Subapanditha</a>
            <a href="pageEditor_ST2.html" target="_blank">Nimsara Aluthgedara</a>
            <a href="pageEditor_ST3.html" target="_blank">Heruni Perera</a>
            <a href="pageEditor_ST4.html" target="_blank">Upuli Kuruppu</a>
        </div>
    </div>
</div>
`;
    content = content.replace('</svg>', '</svg>\n' + mobileSitemapHTML);
    fs.writeFileSync(sitemapPath, content, 'utf8');
    console.log('Mobile sitemap injected.');
} else {
    console.log('Mobile sitemap already exists.');
}
