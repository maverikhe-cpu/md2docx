# Zeabur 部署指南

本指南将帮助您将 Markdown 转 Word 转换器部署到 Zeabur 平台。

## 前置要求

1. 一个 Zeabur 账户（可通过 [zeabur.com](https://zeabur.com) 注册）
2. 一个 GitHub 账户（用于连接代码仓库，推荐）

## 部署步骤

### 方法一：通过 GitHub 部署（推荐）

1. **创建 GitHub 仓库**
   - 在 GitHub 上创建一个新仓库
   - 将项目代码推送到仓库

2. **连接 Zeabur**
   - 登录 Zeabur 控制台
   - 点击"创建项目"或"New Project"
   - 选择"从 GitHub 导入"或"Import from GitHub"
   - 授权 Zeabur 访问您的 GitHub 账户
   - 选择您的仓库

3. **自动部署**
   - Zeabur 会自动检测到这是一个静态网站
   - 系统会自动使用 Caddy 服务器进行托管
   - 无需额外配置，等待部署完成即可

4. **获取访问链接**
   - 部署完成后，Zeabur 会提供一个默认域名
   - 您可以在项目设置中绑定自定义域名

### 方法二：通过本地项目部署

1. **准备项目文件**
   - 确保项目包含以下文件：
     - `index.html`
     - `styles.css`
     - `app.js`
     - `package.json`
     - `zeabur.json`

2. **上传到 Zeabur**
   - 登录 Zeabur 控制台
   - 点击"创建项目"
   - 选择"本地项目"或"Local Project"
   - 上传项目文件夹或压缩包

3. **部署配置**
   - Zeabur 会自动识别为静态网站
   - 确认配置后点击"部署"

## 配置文件说明

### package.json
用于标识项目类型和基本信息，Zeabur 会根据此文件识别项目。

### zeabur.json
Zeabur 部署配置文件，指定：
- `framework`: "static" - 标识为静态网站
- `outputDirectory`: "." - 输出目录为当前目录

## 自定义域名

部署完成后，您可以：

1. 在项目设置中找到"域名"选项
2. 添加您的自定义域名
3. 按照提示配置 DNS 记录

## 环境变量

本项目不需要环境变量配置，所有功能都在客户端完成。

## 故障排除

### 部署失败
- 检查所有必需文件是否都已上传
- 确认 `package.json` 格式正确
- 查看 Zeabur 的部署日志获取详细错误信息

### 页面无法访问
- 确认部署状态为"运行中"
- 检查域名配置是否正确
- 清除浏览器缓存后重试

### CDN 资源加载失败
- 确认网络连接正常
- 检查浏览器控制台是否有 CORS 错误
- 如需要，可以考虑将 CDN 资源下载到本地

## 更新部署

### GitHub 方式
- 直接推送代码到 GitHub，Zeabur 会自动重新部署

### 本地项目方式
- 重新上传更新后的文件
- 或使用 Zeabur CLI 工具进行部署

## 更多信息

- [Zeabur 官方文档](https://zeabur.com/docs)
- [Zeabur 静态网站部署指南](https://zeabur.com/docs/zh-CN/guides/static)

