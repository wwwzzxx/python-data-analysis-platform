# Cloudflare Workers 部署说明

本文档详细介绍如何部署和配置 Cloudflare Workers 项目，实现 AI API 代理和 KV 数据存储功能。

## 前提条件

1. 拥有 Cloudflare 账号
2. 安装 Node.js 和 npm
3. 安装 wrangler CLI 工具（已在项目中安装）

## 部署步骤

### 1. 配置 Cloudflare Workers

#### 1.1 登录 Cloudflare 控制台

访问 [Cloudflare 控制台](https://dash.cloudflare.com/) 并登录您的账号。

#### 1.2 创建 Workers 服务

1. 进入 "Workers & Pages" 页面
2. 点击 "Create Application" 按钮
3. 选择 "Create Worker"
4. 输入服务名称（例如：`python-data-analysis-platform`）
5. 点击 "Deploy" 按钮

#### 1.3 配置环境变量

1. 在 Workers 服务详情页，点击 "Settings" 标签
2. 选择 "Variables" 部分
3. 添加以下环境变量：
   - `CLOUDFLARE_ACCOUNT_ID`: 您的 Cloudflare 账号 ID
   - `AI_GATEWAY_NAME`: AI Gateway 的名称
   - `AI_API_KEY`: 您的 AI API 密钥（如 OpenAI API Key）
4. 勾选 "Encrypt" 选项以加密敏感信息

#### 1.4 创建 KV 命名空间

1. 在 Workers 服务详情页，点击 "Settings" 标签
2. 选择 "KV Namespaces" 部分
3. 点击 "Add Binding"
4. 输入绑定名称：`KV_STORE`
5. 点击 "Create namespace" 按钮
6. 输入命名空间名称（例如：`python-data-analysis-platform-kv`）
7. 点击 "Add" 按钮

### 2. 配置 Cloudflare AI Gateway

1. 进入 "AI" 页面
2. 点击 "AI Gateway" 标签
3. 点击 "Create Gateway" 按钮
4. 输入 Gateway 名称（例如：`python-data-analysis-gateway`）
5. 点击 "Create"
6. 在 "Providers" 部分，点击 "Add Provider"
7. 选择 "OpenAI" 或其他 AI 提供商
8. 输入 API Key 并保存

### 3. 部署 Workers 代码

#### 3.1 配置 wrangler.toml 文件

编辑项目根目录下的 `wrangler.toml` 文件，填写以下信息：

- `account_id`: 您的 Cloudflare 账号 ID
- `KV_STORE` 的 `id` 和 `preview_id`（从 Cloudflare 控制台获取）

#### 3.2 部署代码

在项目根目录执行以下命令：

```bash
npx wrangler deploy
```

### 4. 测试 API 接口

部署完成后，您可以测试以下 API 接口：

#### 4.1 AI API 代理

```bash
curl -X POST https://your-worker-url/api/ai \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "如何使用 pandas 进行数据分析？"}]}'
```

#### 4.2 KV 存储 API

```bash
# 写入数据
curl -X POST https://your-worker-url/api/kv/test-key \
  -H "Content-Type: application/json" \
  -d '{"test": "value"}'

# 读取数据
curl https://your-worker-url/api/kv/test-key
```

### 5. 前端配置

修改前端代码中的 API 调用地址，将 `https://python-data-analysis-platform.example.workers.dev` 替换为您实际的 Workers 服务地址。

## 安全设置

1. **环境变量加密**：确保所有敏感信息（如 API Key）都通过 Cloudflare 的加密功能进行保护
2. **访问控制**：考虑添加 CORS 策略，限制只允许特定域名的请求
3. **请求限流**：利用 Cloudflare 的速率限制功能，防止 API 滥用

## 故障排除

### 常见问题

1. **AI 请求失败**：检查 AI Gateway 配置和 API Key 是否正确
2. **KV 存储错误**：确认 KV 命名空间已正确绑定
3. **部署失败**：检查 wrangler.toml 配置是否正确

### 调试技巧

1. 使用 `npx wrangler dev` 在本地测试 Workers 代码
2. 查看 Cloudflare Workers 的日志，了解请求处理情况
3. 检查 AI Gateway 的使用情况和错误信息

## 监控和维护

1. **监控使用量**：定期检查 Cloudflare Workers 和 AI Gateway 的使用情况，确保不超出免费额度
2. **更新代码**：如需修改 Workers 代码，使用 `npx wrangler deploy` 重新部署
3. **备份数据**：定期备份 KV 存储中的重要数据

## 注意事项

- Cloudflare Workers 免费套餐每天有 10 万次请求限制
- AI Gateway 免费套餐每天有 10 万次请求限制
- KV 存储免费套餐提供 1GB 存储空间
- 建议使用轻量 AI 模型（如 gpt-4o-mini）以降低成本

## 联系支持

如果遇到部署问题，请参考 [Cloudflare 文档](https://developers.cloudflare.com/workers/) 或联系 Cloudflare 支持团队。