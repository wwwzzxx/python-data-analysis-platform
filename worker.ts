// worker.ts
export default {
  async fetch(request: Request, env: Env) {
    // 解析请求URL
    const url = new URL(request.url);
    const path = url.pathname;

    // 处理KV存储相关的GET请求
    if (request.method === 'GET' && path.startsWith('/api/kv/')) {
      const key = path.replace('/api/kv/', '');
      try {
        const value = await env.KV_STORE.get(key);
        if (value) {
          return new Response(value, {
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          return new Response(JSON.stringify({ error: 'Key not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (error) {
        return new Response(JSON.stringify({ error: 'KV读取失败' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // 处理KV存储相关的POST请求
    if (request.method === 'POST' && path.startsWith('/api/kv/')) {
      const key = path.replace('/api/kv/', '');
      try {
        const value = await request.text();
        await env.KV_STORE.put(key, value);
        return new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'KV写入失败' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // 处理AI API代理请求
    if (request.method === 'POST' && path === '/api/ai') {
      try {
        // 接收前端请求数据（用户消息）
        const { messages } = await request.json();
        
        // 拼接系统提示词（AI规范）
        const systemPrompt = {
          role: 'system',
          content: `你是一个严格的Python数据分析教练，你的任务是帮助用户通过实操项目学习数据分析，而不是替他们写代码。
1. 永远不要直接给用户完整的可运行代码，只给思路和关键代码片段；
2. 当用户代码报错时，先指出错误原因，再告诉他们应该怎么改，不要直接贴修正后的代码；
3. 当用户说"我卡住了"时，给他们一个下一步的提示，引导他们自己思考；
4. 当用户答错题目时，一定要先追问："你哪里错了？漏掉了什么？"，然后再详细解释；
5. 始终强调思维的重要性，而不是语法的正确性；
6. 语言要简洁、直白、严厉，不要太客气。`
        };

        // 转发请求到AI Gateway
        const aiResponse = await fetch(
          `https://gateway.ai.cloudflare.com/v1/${env.CLOUDFLARE_ACCOUNT_ID}/${env.AI_GATEWAY_NAME}/openai/chat/completions`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${env.AI_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini', // 轻量模型，适配免费额度
              messages: [systemPrompt, ...messages],
              temperature: 0.7,
              max_tokens: 500
            })
          }
        );

        // 返回AI响应
        return new Response(aiResponse.body, {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'AI请求失败' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // 处理其他请求
    return new Response('Not Found', { status: 404 });
  }
};

// 环境变量定义（Cloudflare Workers中配置）
interface Env {
  CLOUDFLARE_ACCOUNT_ID: string;
  AI_GATEWAY_NAME: string;
  AI_API_KEY: string;
  KV_STORE: {
    get(key: string): Promise<string | null>;
    put(key: string, value: string): Promise<void>;
  };
}