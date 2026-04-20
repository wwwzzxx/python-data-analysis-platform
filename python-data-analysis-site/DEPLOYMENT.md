# Cloudflare Pages 部署指南

## 项目准备

1. **构建项目**
   - 运行 `npm run build` 命令构建项目
   - 构建输出会在 `dist` 目录中生成，包含所有必要的文件，包括 `_headers` 和 `_redirects` 配置文件

2. **配置文件**
   - 项目已包含必要的 Cloudflare Pages 配置文件：
     - `public/_headers` - 配置 HTTP 安全头
     - `public/_redirects` - 配置 SPA 路由重定向
   - 这些文件会在构建时自动复制到 `dist` 目录的根目录

## 部署步骤

### 方法一：通过 Cloudflare Pages 控制台部署

1. **登录 Cloudflare 账户**
   - 访问 [Cloudflare 控制台](https://dash.cloudflare.com/)

2. **创建 Pages 项目**
   - 点击 "Pages" → "Create a project"
   - 选择 "Connect to Git"
   - 选择你的 GitHub 仓库

3. **配置构建设置**
   - **Framework preset**: 选择 "Vite"
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables** (如果需要):
     - 参考 `.env.example` 文件设置必要的环境变量

4. **部署**
   - 点击 "Save and Deploy"
   - 等待部署完成

### 方法二：通过 Cloudflare CLI 部署

1. **安装 Cloudflare CLI**
   ```bash
   npm install -g @cloudflare/pages-cli
   ```

2. **登录 Cloudflare**
   ```bash
   npx wrangler login
   ```

3. **部署项目**
   ```bash
   npx wrangler pages deploy dist
   ```

## 部署验证

1. **访问部署的网站**
   - Cloudflare Pages 会为你提供一个临时域名（如 `your-project.pages.dev`）
   - 访问该域名检查网站是否正常加载

2. **功能验证**
   - 检查网站的基本功能是否正常
   - 测试路由导航是否正常工作
   - 验证 Pyodide Python 环境是否正常运行
   - 测试 AI 陪练功能是否正常调用

3. **性能检查**
   - 使用浏览器开发者工具检查页面加载速度
   - 确保静态资源已正确缓存

## 优化建议

1. **代码分割**
   - 项目已配置代码分割，将第三方库分离到单独的 chunk：
     - `vendor`: React 相关库
     - `pyodide`: Python 运行环境
     - `editor`: Monaco 编辑器
     - `charts`: 图表库

2. **缓存策略**
   - 为静态资源配置适当的缓存策略
   - 考虑使用 Cloudflare 的缓存规则进一步优化

3. **环境变量**
   - 在 Cloudflare Pages 控制台中配置环境变量，避免在代码中硬编码敏感信息

4. **HTTPS**
   - Cloudflare Pages 自动提供 HTTPS，确保网站使用安全连接

5. **分析工具**
   - 考虑添加 Google Analytics 或其他分析工具，了解用户行为

## 故障排除

1. **构建失败**
   - 检查构建命令是否正确
   - 确保所有依赖已正确安装
   - 检查环境变量是否设置正确

2. **部署后网站无法访问**
   - 检查 `_redirects` 文件是否配置正确
   - 确保 `dist` 目录包含所有必要的文件
   - 查看 Cloudflare Pages 控制台中的部署日志

3. **功能异常**
   - 检查浏览器控制台中的错误信息
   - 确保 Pyodide 加载正常
   - 验证 AI 代理 Worker 是否正确配置

4. **Python 代码运行失败**
   - 检查 Pyodide 是否成功加载
   - 确保代码使用的库已在 Pyodide 中预装
   - 检查浏览器控制台中的错误信息

## 结论

本项目已配置为可直接部署到 Cloudflare Pages。通过遵循上述步骤，你可以轻松将项目部署到 Cloudflare Pages，并确保网站能够正常运行。项目使用了 Cloudflare 免费套餐的资源，包括 Pages、Workers 和 KV 存储，实现了零成本、零运维的 Python 数据分析训练平台。