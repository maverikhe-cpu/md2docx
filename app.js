// 配置 marked 解析器
if (typeof marked !== 'undefined') {
    marked.setOptions({
        breaks: true,
        gfm: true
    });
}

// DOM 元素
const pasteTab = document.getElementById('paste-tab');
const uploadTab = document.getElementById('upload-tab');
const tabButtons = document.querySelectorAll('.tab-btn');
const markdownInput = document.getElementById('markdown-input');
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const fileInfo = document.getElementById('file-info');
const fileName = document.getElementById('file-name');
const removeFileBtn = document.getElementById('remove-file');
const convertBtn = document.getElementById('convert-btn');
const downloadFolderInput = document.getElementById('download-folder');
const previewSection = document.getElementById('preview-section');
const previewContent = document.getElementById('preview-content');
const statusMessage = document.getElementById('status-message');

let currentFile = null;

// 标签切换
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // 更新按钮状态
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // 更新内容区域
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        if (tabName === 'paste') {
            pasteTab.classList.add('active');
            // 切换到粘贴文本模式时，清空文件引用
            currentFile = null;
        } else {
            uploadTab.classList.add('active');
        }
    });
});

// 文件上传区域点击
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// 文件选择
fileInput.addEventListener('change', (e) => {
    handleFileSelect(e.target.files[0]);
});

// 拖拽上传
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.md') || file.name.endsWith('.markdown'))) {
        handleFileSelect(file);
    } else {
        showStatus('请上传 .md 或 .markdown 格式的文件', 'error');
    }
});

// 处理文件选择
function handleFileSelect(file) {
    if (!file) return;
    
    currentFile = file;
    fileName.textContent = file.name;
    fileInfo.style.display = 'flex';
    uploadArea.style.display = 'none';
    
    const reader = new FileReader();
    reader.onload = (e) => {
        markdownInput.value = e.target.result;
        updatePreview();
    };
    reader.readAsText(file);
}

// 移除文件
removeFileBtn.addEventListener('click', () => {
    currentFile = null;
    fileInput.value = '';
    fileInfo.style.display = 'none';
    uploadArea.style.display = 'block';
    markdownInput.value = '';
    previewSection.style.display = 'none';
});

// 输入变化时更新预览
markdownInput.addEventListener('input', () => {
    updatePreview();
});

// 更新预览
function updatePreview() {
    const markdown = markdownInput.value;
    if (markdown.trim() && typeof marked !== 'undefined') {
        previewContent.innerHTML = marked.parse(markdown);
        previewSection.style.display = 'block';
    } else {
        previewSection.style.display = 'none';
    }
}

// 转换按钮点击
convertBtn.addEventListener('click', async () => {
    const markdown = markdownInput.value.trim();
    
    if (!markdown) {
        showStatus('请输入或上传 Markdown 内容', 'error');
        return;
    }
    
    try {
        convertBtn.disabled = true;
        convertBtn.innerHTML = '<span class="btn-icon">⏳</span><span>转换中...</span>';
        
        await convertToDocx(markdown);
        
        showStatus('转换成功！文件已下载', 'success');
    } catch (error) {
        console.error('转换错误:', error);
        showStatus('转换失败：' + error.message, 'error');
    } finally {
        convertBtn.disabled = false;
        convertBtn.innerHTML = '<span class="btn-icon">🔄</span><span>转换为 Word 文档</span>';
    }
});

// 显示状态消息
function showStatus(message, type = 'info') {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    setTimeout(() => {
        statusMessage.style.display = 'none';
    }, 5000);
}

// 将 Markdown 转换为 DOCX
async function convertToDocx(markdown) {
    // 检查库是否加载
    let htmlDocxLib = null;
    if (typeof htmlDocx !== 'undefined') {
        htmlDocxLib = htmlDocx;
    } else if (typeof window !== 'undefined' && window.htmlDocx) {
        htmlDocxLib = window.htmlDocx;
    } else {
        throw new Error('DOCX 转换库未加载，请检查网络连接并刷新页面');
    }
    
    // 解析 Markdown 为 HTML
    let html = '';
    if (typeof marked !== 'undefined') {
        html = marked.parse(markdown);
    } else {
        // 简单的 fallback：将 markdown 转换为纯文本段落
        html = markdown.split('\n').map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '<p></p>';
            return `<p>${escapeHtml(trimmed)}</p>`;
        }).join('');
    }
    
    // 添加样式以改善 Word 文档的显示效果
    const styledHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: 'Microsoft YaHei', 'SimSun', Arial, sans-serif;
                    font-size: 12pt;
                    line-height: 1.6;
                    margin: 20px;
                }
                h1 { font-size: 24pt; font-weight: bold; margin-top: 20px; margin-bottom: 10px; }
                h2 { font-size: 20pt; font-weight: bold; margin-top: 18px; margin-bottom: 9px; }
                h3 { font-size: 16pt; font-weight: bold; margin-top: 16px; margin-bottom: 8px; }
                h4 { font-size: 14pt; font-weight: bold; margin-top: 14px; margin-bottom: 7px; }
                h5 { font-size: 12pt; font-weight: bold; margin-top: 12px; margin-bottom: 6px; }
                h6 { font-size: 11pt; font-weight: bold; margin-top: 10px; margin-bottom: 5px; }
                p { margin-bottom: 10px; }
                ul, ol { margin-left: 30px; margin-bottom: 10px; }
                li { margin-bottom: 5px; }
                blockquote {
                    border-left: 4px solid #ddd;
                    padding-left: 15px;
                    margin-left: 20px;
                    color: #666;
                }
                code {
                    background-color: #f4f4f4;
                    padding: 2px 6px;
                    border-radius: 3px;
                    font-family: 'Courier New', monospace;
                    font-size: 10pt;
                }
                pre {
                    background-color: #f4f4f4;
                    padding: 15px;
                    border-radius: 5px;
                    overflow-x: auto;
                    font-family: 'Courier New', monospace;
                    font-size: 10pt;
                    margin-bottom: 10px;
                }
                pre code {
                    background-color: transparent;
                    padding: 0;
                }
                table {
                    border-collapse: collapse;
                    width: 100%;
                    margin-bottom: 10px;
                }
                table th, table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                table th {
                    background-color: #f8f9fa;
                    font-weight: bold;
                }
                hr {
                    border: none;
                    border-top: 2px solid #ddd;
                    margin: 20px 0;
                }
                strong, b { font-weight: bold; }
                em, i { font-style: italic; }
            </style>
        </head>
        <body>
            ${html}
        </body>
        </html>
    `;
    
    // 使用 html-docx-js 转换为 DOCX
    let converted;
    try {
        if (htmlDocxLib.asBlob) {
            converted = htmlDocxLib.asBlob(styledHtml);
        } else if (htmlDocxLib.asBlobAsync) {
            converted = await htmlDocxLib.asBlobAsync(styledHtml);
        } else {
            throw new Error('无法找到转换方法');
        }
    } catch (error) {
        throw new Error('转换失败：' + error.message);
    }
    
    // 生成文件名
    const prefix = downloadFolderInput.value.trim() || 'markdown';
    const filename = currentFile 
        ? currentFile.name.replace(/\.(md|markdown)$/i, '.docx')
        : `${prefix}-${Date.now()}.docx`;
    
    // 下载文件
    // 注意：浏览器安全限制，无法直接指定下载文件夹
    // 文件会下载到浏览器默认下载文件夹
    try {
        if (typeof saveAs !== 'undefined') {
            saveAs(converted, filename);
        } else {
            // Fallback：创建下载链接
            const url = URL.createObjectURL(converted);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    } catch (error) {
        throw new Error('下载失败：' + error.message);
    }
}

// HTML 转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

