const fs = require('fs');
const path = require('path');

const distDir = path.join(process.cwd(), '.next', 'static');
const scriptContent = fs.readFileSync(path.join(process.cwd(), 'public', 'dashboard-console-capture.js'), 'utf8');

function injectScript(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      injectScript(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      if (!content.includes('dashboard-console-capture.js') && content.includes('</head>')) {
        content = content.replace('</head>', `<script>${scriptContent}</script></head>`);
        fs.writeFileSync(filePath, content);
        console.log(`Injected console capture script into ${filePath}`);
      }
    }
  });
}

injectScript(distDir);