# Markdown 转 Word 转换器

一个简单易用的网页应用，可以将 Markdown 格式的文本转换为 Word (.docx) 格式的文档。

## 功能特性

- ✨ **双输入模式**：支持粘贴文本或上传文件
- 📝 **实时预览**：输入 Markdown 时实时预览渲染效果
- 🎨 **现代化 UI**：美观的用户界面设计
- 📥 **一键下载**：转换完成后自动下载 DOCX 文件
- 🔄 **支持多种 Markdown 语法**：
  - 标题（H1-H6）
  - 粗体、斜体
  - 有序列表、无序列表
  - 代码块、行内代码
  - 表格
  - 引用块
  - 分隔线

## 使用方法

1. 直接在浏览器中打开 `index.html` 文件
2. 选择输入方式：
   - **粘贴文本**：在文本框中粘贴或输入 Markdown 内容
   - **上传文件**：点击上传区域或拖拽 .md 文件
3. 点击"转换为 Word 文档"按钮
4. 文件会自动下载到浏览器的默认下载文件夹

## 技术栈

- **HTML5**：页面结构
- **CSS3**：现代化样式设计
- **JavaScript (ES6+)**：核心功能实现
- **Marked.js**：Markdown 解析库（CDN）
- **docx.js**：Word 文档生成库（CDN）
- **FileSaver.js**：文件下载功能（CDN）

## 浏览器兼容性

- Chrome/Edge（推荐）
- Firefox
- Safari
- 其他现代浏览器

## 注意事项

1. **下载位置**：由于浏览器安全限制，无法通过网页应用直接指定下载文件夹。文件会下载到浏览器默认的下载文件夹（通常是系统的"下载"或"Downloads"文件夹）。您可以在浏览器设置中更改默认下载位置，或者在下载时手动选择保存位置。

2. **网络连接**：需要网络连接以加载 CDN 资源（Marked.js、html-docx-js、FileSaver.js）

3. **文件大小**：对于大型 Markdown 文件，转换可能需要几秒钟时间，请耐心等待

4. **浏览器兼容性**：建议使用最新版本的 Chrome、Edge、Firefox 或 Safari

## 部署到 Zeabur

本项目已配置好 Zeabur 部署，您可以：

1. **通过 GitHub 部署（推荐）**
   - 将代码推送到 GitHub 仓库
   - 在 Zeabur 中导入 GitHub 仓库
   - Zeabur 会自动检测并部署静态网站

2. **通过本地项目部署**
   - 在 Zeabur 控制台选择"本地项目"
   - 上传项目文件夹
   - 等待自动部署完成

详细部署步骤请参考 [DEPLOY.md](./DEPLOY.md)

## 本地开发

如果需要本地开发或离线使用，可以：

1. 下载依赖库到本地
2. 修改 HTML 中的 CDN 链接为本地路径
3. 使用本地服务器运行（推荐使用 VS Code 的 Live Server 插件）

## 项目结构

```
md2docx/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── app.js              # 核心功能逻辑
├── package.json        # 项目配置（用于 Zeabur 识别）
├── zeabur.json         # Zeabur 部署配置
├── .gitignore         # Git 忽略文件
├── README.md          # 项目说明
└── DEPLOY.md          # 部署指南
```

## 许可证

MIT License

