import { loadPyodide } from 'pyodide';

// 全局Pyodide实例
let pyodide: any = null;
// 加载状态
let loading: Promise<any> | null = null;
// 加载错误
let loadError: Error | null = null;
// 加载进度
let loadProgress: number = 0;
// 进度回调
let progressCallback: ((progress: number) => void) | null = null;

// 设置进度回调
export function setPyodideProgressCallback(callback: (progress: number) => void) {
  progressCallback = callback;
}

// 更新加载进度
function updateProgress(progress: number) {
  loadProgress = progress;
  if (progressCallback) {
    progressCallback(progress);
  }
}

// 初始化Pyodide，预装所需库
export async function initPyodide() {
  // 如果已经初始化，直接返回
  if (pyodide) return pyodide;
  
  // 如果正在加载，返回加载中的Promise
  if (loading) return loading;
  
  // 如果之前加载失败，抛出错误
  if (loadError) throw loadError;
  
  // 开始加载
  loading = (async () => {
    try {
      updateProgress(0);
      
      pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/',
        fullStdLib: false,
        // 启用缓存
        lockFileUrl: 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/lockfile.json'
      });
      
      updateProgress(30);
      
      // 预装核心库，分批加载以提高速度
      const packages = ['pandas', 'numpy', 'matplotlib', 'seaborn', 'scikit-learn', 'mlxtend'];
      for (let i = 0; i < packages.length; i++) {
        await pyodide.loadPackage(packages[i]);
        updateProgress(30 + (i + 1) * 10);
      }
      
      updateProgress(90);
      
      // 配置matplotlib，使其在前端渲染
      pyodide.runPython(`
        import matplotlib.pyplot as plt
        import io
        import base64
        
        # 设置中文字体
        plt.rcParams['font.sans-serif'] = ['WenQuanYi Zen Hei', 'SimHei']
        plt.rcParams['axes.unicode_minus'] = False
        plt.ioff()
        
        # 自定义显示函数，将图表转换为base64
        def show_plot():
            buf = io.BytesIO()
            plt.savefig(buf, format='png')
            buf.seek(0)
            img_str = base64.b64encode(buf.read()).decode('utf-8')
            plt.close()
            return f'data:image/png;base64,{img_str}'
        
        # 暴露给JavaScript
        import js
        js.show_plot = show_plot
      `);
      
      updateProgress(100);
      
      // 加载成功，重置错误状态
      loadError = null;
      return pyodide;
    } catch (error) {
      loadError = error as Error;
      throw error;
    } finally {
      // 重置加载状态
      loading = null;
    }
  })();
  
  return loading;
}

// 预加载Pyodide（在应用启动时调用）
export function preloadPyodide() {
  if (!pyodide && !loading) {
    // 开始加载但不等待完成
    initPyodide().catch(() => {
      // 预加载失败不影响应用启动
      console.log('Pyodide preload failed, will try again when needed');
    });
  }
}

// 运行Python代码
export async function runPythonCode(code: string) {
  try {
    const py = await initPyodide();
    const result = await py.runPythonAsync(code);
    return { success: true, result };
  } catch (error) {
    return { 
      success: false, 
      error: (error as Error).message,
      details: error instanceof Error ? error.stack : String(error)
    };
  }
}

// 获取Pyodide加载状态
export function getPyodideStatus() {
  return {
    initialized: !!pyodide,
    loading: !!loading,
    error: loadError,
    progress: loadProgress
  };
}

// 重置Pyodide实例（用于测试或特殊情况）
export function resetPyodide() {
  pyodide = null;
  loading = null;
  loadError = null;
  loadProgress = 0;
  progressCallback = null;
}