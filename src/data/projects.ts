import { Project } from '../types/projects';

// 10个梯度项目数据
export const projects: Project[] = [
  {
    id: '1',
    title: '基础数据清洗与分析',
    description: '学习使用pandas进行数据清洗、处理和基本分析，掌握数据分析的核心技能。',
    level: '初级',
    learningObjectives: [
      '掌握pandas基本操作',
      '学习数据清洗技巧',
      '理解数据类型转换',
      '掌握基本的数据分析方法'
    ],
    tasks: [
      {
        id: 'task1',
        title: '生成销售数据集',
        description: '使用Python生成模拟的销售数据集，包含日期、产品、销售额等字段',
        completed: false,
        hint: '使用pandas的DataFrame创建销售数据，包含日期范围、产品类别、销售金额等字段'
      },
      {
        id: 'task2',
        title: '数据清洗',
        description: '处理缺失值、重复值和异常值',
        completed: false,
        hint: '使用dropna()、drop_duplicates()等方法处理数据质量问题'
      },
      {
        id: 'task3',
        title: '基本统计分析',
        description: '计算销售额的平均值、中位数、最大值和最小值',
        completed: false,
        hint: '使用describe()方法获取基本统计信息，或使用mean()、median()等方法'
      },
      {
        id: 'task4',
        title: '按产品类别分析',
        description: '统计不同产品类别的销售情况',
        completed: false,
        hint: '使用groupby()方法按产品类别分组，计算每组的销售总额'
      }
    ],
    datasetCode: `import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# 生成日期范围
date_range = pd.date_range(start='2023-01-01', end='2023-12-31', freq='D')

# 产品类别
product_categories = ['电子产品', '服装', '食品', '家居用品', '办公用品']

# 生成销售数据
data = []
for date in date_range:
    for category in product_categories:
        # 生成随机销售额（100-10000）
        sales = round(random.uniform(100, 10000), 2)
        # 生成随机销量（1-100）
        quantity = random.randint(1, 100)
        # 生成随机单价
        unit_price = round(sales / quantity, 2)
        data.append({
            'date': date,
            'product_category': category,
            'sales': sales,
            'quantity': quantity,
            'unit_price': unit_price
        })

# 创建DataFrame
sales_data = pd.DataFrame(data)

# 添加一些缺失值（模拟数据质量问题）
for i in range(50):
    idx = random.randint(0, len(sales_data) - 1)
    sales_data.loc[idx, 'sales'] = np.nan

# 添加一些重复行（模拟数据质量问题）
duplicate_rows = sales_data.sample(20)
sales_data = pd.concat([sales_data, duplicate_rows], ignore_index=True)

print('销售数据集生成完成！')
print(f'数据集形状：{sales_data.shape}')
print('\n前5行数据：')
print(sales_data.head())
sales_data`,
    evaluationCriteria: [
      '成功生成数据集',
      '正确处理缺失值和重复值',
      '计算出正确的统计指标',
      '成功按产品类别分组分析'
    ],
    estimatedTime: '1-2小时',
    prerequisites: ['Python基础', 'pandas基础']
  },
  {
    id: '2',
    title: '数据可视化入门',
    description: '使用matplotlib和seaborn创建各种类型的图表，学习数据可视化的基本原理和技巧。',
    level: '初级',
    learningObjectives: [
      '掌握matplotlib基本绘图功能',
      '学习seaborn的高级可视化',
      '理解不同图表类型的适用场景',
      '掌握图表美化技巧'
    ],
    tasks: [
      {
        id: 'task1',
        title: '生成用户行为数据集',
        description: '创建包含用户活跃度、留存率等数据的数据集',
        completed: false,
        hint: '使用numpy生成随机数据，包含用户ID、活跃度、留存率等字段'
      },
      {
        id: 'task2',
        title: '折线图展示',
        description: '使用折线图展示用户活跃度随时间的变化',
        completed: false,
        hint: '使用plt.plot()或sns.lineplot()创建折线图'
      },
      {
        id: 'task3',
        title: '柱状图分析',
        description: '使用柱状图展示不同用户群体的活跃度',
        completed: false,
        hint: '使用plt.bar()或sns.barplot()创建柱状图'
      },
      {
        id: 'task4',
        title: '散点图分析',
        description: '使用散点图分析活跃度与留存率的关系',
        completed: false,
        hint: '使用plt.scatter()或sns.scatterplot()创建散点图'
      }
    ],
    datasetCode: `import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# 生成用户数据
user_ids = range(1, 101)  # 100个用户

# 生成30天的日期
start_date = datetime(2023, 1, 1)
date_range = [start_date + timedelta(days=i) for i in range(30)]

# 生成用户行为数据
data = []
for user_id in user_ids:
    # 基础活跃度（0-100）
    base_activity = random.uniform(30, 80)
    for date in date_range:
        # 添加随机波动
        activity = max(0, min(100, base_activity + random.uniform(-20, 20)))
        # 留存率（与活跃度正相关）
        retention = min(1.0, activity / 100 * random.uniform(0.8, 1.2))
        # 用户类型
        user_type = random.choice(['新用户', '活跃用户', '流失用户'])
        data.append({
            'user_id': user_id,
            'date': date,
            'activity': round(activity, 2),
            'retention': round(retention, 2),
            'user_type': user_type
        })

# 创建DataFrame
user_behavior_data = pd.DataFrame(data)

print('用户行为数据集生成完成！')
print(f'数据集形状：{user_behavior_data.shape}')
print('\n前5行数据：')
print(user_behavior_data.head())
user_behavior_data`,
    evaluationCriteria: [
      '成功生成用户行为数据集',
      '正确创建折线图展示时间趋势',
      '正确创建柱状图展示用户群体差异',
      '正确创建散点图分析变量关系'
    ],
    estimatedTime: '2-3小时',
    prerequisites: ['Python基础', 'matplotlib基础']
  },
  {
    id: '3',
    title: '统计分析基础',
    description: '学习描述性统计和推断性统计，掌握假设检验和置信区间的应用。',
    level: '初级',
    learningObjectives: [
      '掌握描述性统计分析',
      '理解正态分布和中心极限定理',
      '学习假设检验的基本原理',
      '掌握置信区间的计算方法'
    ],
    tasks: [
      {
        id: 'task1',
        title: '生成身高体重数据集',
        description: '创建包含身高、体重等生理指标的数据集',
        completed: false,
        hint: '使用numpy生成符合正态分布的身高体重数据'
      },
      {
        id: 'task2',
        title: '描述性统计分析',
        description: '计算数据的均值、标准差、分位数等统计指标',
        completed: false,
        hint: '使用describe()方法获取详细的统计信息'
      },
      {
        id: 'task3',
        title: '正态性检验',
        description: '检验数据是否符合正态分布',
        completed: false,
        hint: '使用scipy的normaltest()或kurtosis/skewness分析'
      },
      {
        id: 'task4',
        title: '置信区间计算',
        description: '计算身高和体重的95%置信区间',
        completed: false,
        hint: '使用stats.t.interval()计算置信区间'
      }
    ],
    datasetCode: `import pandas as pd
import numpy as np
import scipy.stats as stats

# 生成1000个样本
n_samples = 1000

# 生成身高数据（正态分布，均值170cm，标准差6cm）
heights = np.random.normal(170, 6, n_samples)

# 生成体重数据（与身高正相关）
# 体重 = 身高 * 0.6 + 随机误差
weights = heights * 0.6 + np.random.normal(0, 5, n_samples)

# 生成性别数据
genders = np.random.choice(['男', '女'], size=n_samples, p=[0.5, 0.5])

# 生成年龄数据（18-60岁）
ages = np.random.randint(18, 61, size=n_samples)

# 创建DataFrame
physique_data = pd.DataFrame({
    'height': heights.round(1),
    'weight': weights.round(1),
    'gender': genders,
    'age': ages
})

# 添加BMI计算
physique_data['bmi'] = (physique_data['weight'] / (physique_data['height'] / 100) ** 2).round(2)

print('身高体重数据集生成完成！')
print(f'数据集形状：{physique_data.shape}')
print('\n前5行数据：')
print(physique_data.head())
print('\n基本统计信息：')
print(physique_data.describe())
physique_data`,
    evaluationCriteria: [
      '成功生成身高体重数据集',
      '正确计算描述性统计指标',
      '正确进行正态性检验',
      '正确计算置信区间'
    ],
    estimatedTime: '2-3小时',
    prerequisites: ['Python基础', '基本统计学知识']
  },
  {
    id: '4',
    title: '回归分析实践',
    description: '使用线性回归和逻辑回归模型，解决实际业务问题，评估模型性能。',
    level: '中级',
    learningObjectives: [
      '掌握线性回归模型的原理和应用',
      '学习逻辑回归模型的原理和应用',
      '理解模型评估指标',
      '掌握特征选择和模型优化'
    ],
    tasks: [
      {
        id: 'task1',
        title: '生成房价预测数据集',
        description: '创建包含房屋特征和价格的数据集',
        completed: false,
        hint: '生成包含面积、卧室数量、年龄等特征的数据集，价格与这些特征相关'
      },
      {
        id: 'task2',
        title: '线性回归建模',
        description: '使用线性回归模型预测房价',
        completed: false,
        hint: '使用sklearn的LinearRegression模型，划分训练集和测试集'
      },
      {
        id: 'task3',
        title: '模型评估',
        description: '计算模型的R²、MSE等评估指标',
        completed: false,
        hint: '使用r2_score、mean_squared_error等指标评估模型性能'
      },
      {
        id: 'task4',
        title: '特征重要性分析',
        description: '分析各个特征对房价的影响程度',
        completed: false,
        hint: '查看模型的coef_属性，分析特征系数'
      }
    ],
    datasetCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# 生成样本数量
n_samples = 1000

# 生成特征数据
# 房屋面积（100-300平方米）
square_feet = np.random.uniform(100, 300, n_samples)

# 卧室数量（1-5个）
bedrooms = np.random.randint(1, 6, n_samples)

# 房屋年龄（0-50年）
age = np.random.uniform(0, 50, n_samples)

# 距离市中心距离（1-10公里）
distance_to_city = np.random.uniform(1, 10, n_samples)

# 生成价格（基于特征的线性组合 + 随机误差）
# 价格 = 10000 * 面积 + 50000 * 卧室数 - 1000 * 年龄 - 20000 * 距离 + 随机误差
price = (
    10000 * square_feet +
    50000 * bedrooms -
    1000 * age -
    20000 * distance_to_city +
    np.random.normal(0, 100000, n_samples)
)

# 确保价格为正数
price = np.maximum(price, 100000)

# 创建DataFrame
housing_data = pd.DataFrame({
    'square_feet': square_feet.round(1),
    'bedrooms': bedrooms,
    'age': age.round(1),
    'distance_to_city': distance_to_city.round(1),
    'price': price.round(2)
})

print('房价预测数据集生成完成！')
print(f'数据集形状：{housing_data.shape}')
print('\n前5行数据：')
print(housing_data.head())
print('\n基本统计信息：')
print(housing_data.describe())
housing_data`,
    evaluationCriteria: [
      '成功生成房价预测数据集',
      '正确构建线性回归模型',
      '正确评估模型性能',
      '正确分析特征重要性'
    ],
    estimatedTime: '3-4小时',
    prerequisites: ['Python基础', 'pandas基础', 'sklearn基础']
  },
  {
    id: '5',
    title: '分类算法应用',
    description: '学习决策树、随机森林等分类算法，应用于实际数据集。',
    level: '中级',
    learningObjectives: [
      '掌握决策树分类算法',
      '学习随机森林分类算法',
      '理解分类模型的评估指标',
      '掌握模型调参和优化'
    ],
    tasks: [
      {
        id: 'task1',
        title: '生成客户流失数据集',
        description: '创建包含客户特征和流失标签的数据集',
        completed: false,
        hint: '生成包含客户年龄、消费金额、使用时长等特征，以及流失标签的数据集'
      },
      {
        id: 'task2',
        title: '决策树建模',
        description: '使用决策树模型预测客户流失',
        completed: false,
        hint: '使用sklearn的DecisionTreeClassifier，设置合适的参数'
      },
      {
        id: 'task3',
        title: '随机森林建模',
        description: '使用随机森林模型预测客户流失',
        completed: false,
        hint: '使用sklearn的RandomForestClassifier，比较与决策树的性能差异'
      },
      {
        id: 'task4',
        title: '模型评估和调参',
        description: '评估模型性能并进行参数调优',
        completed: false,
        hint: '使用accuracy、precision、recall等指标评估，使用GridSearchCV进行调参'
      }
    ],
    datasetCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# 生成样本数量
n_samples = 1000

# 生成客户特征
# 年龄（18-70岁）
age = np.random.randint(18, 71, n_samples)

# 月消费金额（100-10000元）
monthly_spend = np.random.uniform(100, 10000, n_samples)

# 账户使用时长（1-60个月）
account_age = np.random.uniform(1, 60, n_samples)

# 每月登录次数（1-30次）
login_frequency = np.random.randint(1, 31, n_samples)

# 客服联系次数（0-10次）
support_calls = np.random.randint(0, 11, n_samples)

# 计算流失概率（基于特征）
# 流失概率与年龄（年轻人更容易流失）、低消费、短使用时长、低登录频率、高客服联系正相关
churn_probability = (
    (age < 30) * 0.3 +
    (monthly_spend < 1000) * 0.25 +
    (account_age < 12) * 0.2 +
    (login_frequency < 5) * 0.15 +
    (support_calls > 3) * 0.1
)

# 添加随机噪声
churn_probability += np.random.normal(0, 0.1, n_samples)
churn_probability = np.clip(churn_probability, 0, 1)

# 生成流失标签（0=未流失，1=流失）
churn = np.random.binomial(1, churn_probability)

# 创建DataFrame
customer_data = pd.DataFrame({
    'age': age,
    'monthly_spend': monthly_spend.round(2),
    'account_age': account_age.round(1),
    'login_frequency': login_frequency,
    'support_calls': support_calls,
    'churn': churn
})

print('客户流失数据集生成完成！')
print(f'数据集形状：{customer_data.shape}')
print(f'流失率：{(churn.sum() / n_samples * 100):.2f}%')
print('\n前5行数据：')
print(customer_data.head())
customer_data`,
    evaluationCriteria: [
      '成功生成客户流失数据集',
      '正确构建决策树模型',
      '正确构建随机森林模型',
      '正确评估和调优模型'
    ],
    estimatedTime: '3-4小时',
    prerequisites: ['Python基础', 'sklearn基础', '分类算法知识']
  },
  {
    id: '6',
    title: '聚类分析项目',
    description: '使用K-means、层次聚类等算法，对数据进行无监督学习。',
    level: '中级',
    learningObjectives: [
      '掌握K-means聚类算法',
      '学习层次聚类算法',
      '理解聚类评估指标',
      '掌握最佳聚类数的确定方法'
    ],
    tasks: [
      {
        id: 'task1',
        title: '生成客户行为数据集',
        description: '创建包含客户购买行为和偏好的数据集',
        completed: false,
        hint: '生成包含购买频率、平均消费、产品偏好等特征的数据集'
      },
      {
        id: 'task2',
        title: 'K-means聚类',
        description: '使用K-means算法对客户进行聚类',
        completed: false,
        hint: '使用sklearn的KMeans，尝试不同的k值'
      },
      {
        id: 'task3',
        title: '确定最佳聚类数',
        description: '使用肘部法则和轮廓系数确定最佳聚类数',
        completed: false,
        hint: '绘制肘部图，计算不同k值的轮廓系数'
      },
      {
        id: 'task4',
        title: '聚类结果分析',
        description: '分析每个聚类的特征和行为模式',
        completed: false,
        hint: '计算每个聚类的特征均值，分析客户群体特点'
      }
    ],
    datasetCode: `import pandas as pd
import numpy as np

# 生成样本数量
n_samples = 500

# 生成3个客户群体的数据
# 群体1：高频高消费
cluster1 = np.random.normal([15, 2000, 0.8], [3, 500, 0.1], size=(150, 3))

# 群体2：中频中消费
cluster2 = np.random.normal([8, 1000, 0.5], [2, 300, 0.15], size=(200, 3))

# 群体3：低频低消费
cluster3 = np.random.normal([3, 500, 0.2], [1, 200, 0.1], size=(150, 3))

# 合并数据
customer_data = np.vstack([cluster1, cluster2, cluster3])

# 确保值为正数
customer_data = np.maximum(customer_data, 0)

# 创建DataFrame
customer_behavior = pd.DataFrame({
    'purchase_frequency': customer_data[:, 0].round(1),  # 每月购买次数
    'average_spend': customer_data[:, 1].round(2),      # 平均消费金额
    'loyalty_score': customer_data[:, 2].round(2)        # 忠诚度得分
})

print('客户行为数据集生成完成！')
print(f'数据集形状：{customer_behavior.shape}')
print('\n前5行数据：')
print(customer_behavior.head())
print('\n基本统计信息：')
print(customer_behavior.describe())
customer_behavior`,
    evaluationCriteria: [
      '成功生成客户行为数据集',
      '正确应用K-means聚类算法',
      '正确确定最佳聚类数',
      '正确分析聚类结果'
    ],
    estimatedTime: '3-4小时',
    prerequisites: ['Python基础', 'sklearn基础', '聚类算法知识']
  },
  {
    id: '7',
    title: '时间序列分析',
    description: '学习时间序列数据的处理和分析方法，预测未来趋势。',
    level: '高级',
    learningObjectives: [
      '掌握时间序列数据的处理方法',
      '学习时间序列的分解和特征提取',
      '理解ARIMA等时间序列模型',
      '掌握时间序列预测方法'
    ],
    tasks: [
      {
        id: 'task1',
        title: '生成销售时间序列数据',
        description: '创建包含趋势、季节性和噪声的销售时间序列数据',
        completed: false,
        hint: '生成包含年度趋势、月度季节性和随机噪声的时间序列数据'
      },
      {
        id: 'task2',
        title: '时间序列分解',
        description: '分解时间序列为趋势、季节性和残差',
        completed: false,
        hint: '使用statsmodels的seasonal_decompose进行分解'
      },
      {
        id: 'task3',
        title: 'ARIMA建模',
        description: '使用ARIMA模型对时间序列进行建模和预测',
        completed: false,
        hint: '使用statsmodels的ARIMA或SARIMAX模型'
      },
      {
        id: 'task4',
        title: '模型评估和预测',
        description: '评估模型性能并进行未来预测',
        completed: false,
        hint: '使用均方误差等指标评估模型，生成未来预测结果'
      }
    ],
    datasetCode: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# 生成时间范围（2020-2023年，共48个月）
start_date = datetime(2020, 1, 1)
date_range = [start_date + timedelta(days=i*30) for i in range(48)]

# 生成基础趋势（线性增长）
trend = np.arange(48) * 1000 + 10000

# 生成季节性（月度模式）
seasonality = np.array([1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.8, 0.9, 1.0, 1.1, 1.3, 1.4] * 4)

# 生成随机噪声
noise = np.random.normal(0, 1000, 48)

# 计算最终销售额
sales = trend * seasonality + noise

# 确保销售额为正数
sales = np.maximum(sales, 5000)

# 创建DataFrame
sales_data = pd.DataFrame({
    'date': date_range,
    'sales': sales.round(2)
})

# 设置日期索引
sales_data.set_index('date', inplace=True)

print('销售时间序列数据集生成完成！')
print(f'数据集形状：{sales_data.shape}')
print('\n前5行数据：')
print(sales_data.head())
print('\n基本统计信息：')
print(sales_data.describe())
sales_data`,
    evaluationCriteria: [
      '成功生成销售时间序列数据',
      '正确分解时间序列',
      '正确构建ARIMA模型',
      '正确评估模型并进行预测'
    ],
    estimatedTime: '4-5小时',
    prerequisites: ['Python基础', 'pandas时间序列处理', 'statsmodels基础']
  },
  {
    id: '8',
    title: '特征工程实践',
    description: '学习特征选择、特征提取和特征变换等技术，提升模型性能。',
    level: '高级',
    learningObjectives: [
      '掌握特征选择方法',
      '学习特征提取技术',
      '理解特征变换和标准化',
      '掌握特征工程对模型性能的影响'
    ],
    tasks: [
      {
        id: 'task1',
        title: '生成电信客户数据集',
        description: '创建包含多个特征的电信客户数据集',
        completed: false,
        hint: '生成包含通话时长、短信数量、流量使用等多个特征的数据集'
      },
      {
        id: 'task2',
        title: '特征选择',
        description: '使用相关系数和特征重要性进行特征选择',
        completed: false,
        hint: '计算特征与目标变量的相关系数，使用随机森林评估特征重要性'
      },
      {
        id: 'task3',
        title: '特征变换',
        description: '对特征进行标准化、归一化和多项式特征生成',
        completed: false,
        hint: '使用StandardScaler、MinMaxScaler进行标准化，使用PolynomialFeatures生成多项式特征'
      },
      {
        id: 'task4',
        title: '模型性能比较',
        description: '比较特征工程前后的模型性能差异',
        completed: false,
        hint: '构建相同的模型，比较特征工程前后的准确率、F1分数等指标'
      }
    ],
    datasetCode: `import pandas as pd
import numpy as np

# 生成样本数量
n_samples = 1000

# 生成基础特征
# 通话时长（分钟/月）
call_duration = np.random.uniform(100, 1000, n_samples)

# 短信数量（条/月）
sms_count = np.random.randint(0, 500, n_samples)

# 流量使用（GB/月）
data_usage = np.random.uniform(1, 50, n_samples)

# 账户年龄（月）
account_age = np.random.uniform(1, 60, n_samples)

# 月费用（元）
monthly_fee = np.random.uniform(50, 500, n_samples)

# 客服联系次数（次/月）
support_calls = np.random.randint(0, 10, n_samples)

# 生成目标变量（客户价值评分，0-100）
# 客户价值与通话时长、数据使用、账户年龄正相关，与客服联系次数负相关
customer_value = (
    0.3 * (call_duration / 1000 * 100) +
    0.3 * (data_usage / 50 * 100) +
    0.2 * (account_age / 60 * 100) -
    0.2 * (support_calls / 10 * 100) +
    np.random.normal(0, 10, n_samples)
)

# 确保价值评分在0-100之间
customer_value = np.clip(customer_value, 0, 100)

# 创建DataFrame
telco_data = pd.DataFrame({
    'call_duration': call_duration.round(1),
    'sms_count': sms_count,
    'data_usage': data_usage.round(2),
    'account_age': account_age.round(1),
    'monthly_fee': monthly_fee.round(2),
    'support_calls': support_calls,
    'customer_value': customer_value.round(1)
})

print('电信客户数据集生成完成！')
print(f'数据集形状：{telco_data.shape}')
print('\n前5行数据：')
print(telco_data.head())
print('\n基本统计信息：')
print(telco_data.describe())
telco_data`,
    evaluationCriteria: [
      '成功生成电信客户数据集',
      '正确进行特征选择',
      '正确进行特征变换',
      '正确比较特征工程前后的模型性能'
    ],
    estimatedTime: '4-5小时',
    prerequisites: ['Python基础', 'sklearn基础', '特征工程知识']
  },
  {
    id: '9',
    title: '机器学习模型优化',
    description: '学习模型调参、交叉验证和集成学习等技术，优化模型性能。',
    level: '高级',
    learningObjectives: [
      '掌握模型参数调优方法',
      '学习交叉验证技术',
      '理解集成学习原理',
      '掌握模型融合策略'
    ],
    tasks: [
      {
        id: 'task1',
        title: '生成信用评分数据集',
        description: '创建包含个人信用相关特征的数据集',
        completed: false,
        hint: '生成包含收入、负债、信用历史等特征的数据集，目标变量为信用评分'
      },
      {
        id: 'task2',
        title: '网格搜索调参',
        description: '使用GridSearchCV对随机森林模型进行参数调优',
        completed: false,
        hint: '设置不同的n_estimators、max_depth等参数进行网格搜索'
      },
      {
        id: 'task3',
        title: '交叉验证',
        description: '使用k折交叉验证评估模型性能',
        completed: false,
        hint: '使用cross_val_score进行5折或10折交叉验证'
      },
      {
        id: 'task4',
        title: '集成学习',
        description: '使用投票法或 stacking 集成多个模型',
        completed: false,
        hint: '使用VotingClassifier或StackingClassifier集成多个分类器'
      }
    ],
    datasetCode: `import pandas as pd
import numpy as np

# 生成样本数量
n_samples = 1000

# 生成信用相关特征
# 年收入（万元）
annual_income = np.random.uniform(5, 50, n_samples)

# 负债比率（0-1）
debt_ratio = np.random.uniform(0, 0.8, n_samples)

# 信用历史长度（月）
credit_history = np.random.uniform(6, 120, n_samples)

# 信用卡数量
credit_cards = np.random.randint(1, 10, n_samples)

# 逾期次数
late_payments = np.random.randint(0, 10, n_samples)

# 贷款数量
loans = np.random.randint(0, 5, n_samples)

# 生成信用评分（300-850）
# 信用评分与收入正相关，与负债比率、逾期次数负相关，与信用历史长度正相关
credit_score = (
    300 +
    0.5 * annual_income * 10 +
    50 * (1 - debt_ratio) +
    2 * credit_history -
    20 * late_payments -
    10 * loans +
    np.random.normal(0, 30, n_samples)
)

# 确保信用评分在300-850之间
credit_score = np.clip(credit_score, 300, 850)

# 创建DataFrame
credit_data = pd.DataFrame({
    'annual_income': annual_income.round(2),
    'debt_ratio': debt_ratio.round(3),
    'credit_history': credit_history.round(1),
    'credit_cards': credit_cards,
    'late_payments': late_payments,
    'loans': loans,
    'credit_score': credit_score.round(1)
})

# 创建信用等级标签（基于评分）
def get_credit_rating(score):
    if score >= 750: return '优秀'
    elif score >= 700: return '良好'
    elif score >= 650: return '中等'
    elif score >= 600: return '一般'
    else: return '较差'

credit_data['credit_rating'] = credit_data['credit_score'].apply(get_credit_rating)

print('信用评分数据集生成完成！')
print(f'数据集形状：{credit_data.shape}')
print('\n前5行数据：')
print(credit_data.head())
print('\n信用等级分布：')
print(credit_data['credit_rating'].value_counts())
credit_data`,
    evaluationCriteria: [
      '成功生成信用评分数据集',
      '正确进行网格搜索调参',
      '正确进行交叉验证',
      '正确实现集成学习'
    ],
    estimatedTime: '4-5小时',
    prerequisites: ['Python基础', 'sklearn基础', '模型调优知识']
  },
  {
    id: '10',
    title: '综合数据分析项目',
    description: '整合所学技能，完成一个完整的数据分析项目，从数据获取到结果展示。',
    level: '专家',
    learningObjectives: [
      '掌握完整的数据分析流程',
      '学习数据可视化和报告生成',
      '理解业务问题的分析方法',
      '掌握数据驱动决策的思路'
    ],
    tasks: [
      {
        id: 'task1',
        title: '生成电商平台数据集',
        description: '创建包含用户、商品、订单等多个维度的电商数据集',
        completed: false,
        hint: '生成包含用户信息、商品信息、订单详情等多个表的数据'
      },
      {
        id: 'task2',
        title: '数据清洗和预处理',
        description: '处理缺失值、异常值，进行数据集成和转换',
        completed: false,
        hint: '使用pandas进行数据清洗，处理多表关联'
      },
      {
        id: 'task3',
        title: '多维度分析',
        description: '从用户、商品、时间等多个维度进行分析',
        completed: false,
        hint: '使用groupby、pivot_table等方法进行多维度分析'
      },
      {
        id: 'task4',
        title: '综合可视化和报告',
        description: '创建综合可视化图表，生成分析报告',
        completed: false,
        hint: '使用matplotlib和seaborn创建多种图表，整合分析结果'
      }
    ],
    datasetCode: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# 生成用户数据
n_users = 1000
user_ids = range(1, n_users + 1)
age = np.random.randint(18, 65, n_users)
gender = np.random.choice(['男', '女'], n_users)
city = np.random.choice(['北京', '上海', '广州', '深圳', '杭州'], n_users)
user_data = pd.DataFrame({
    'user_id': user_ids,
    'age': age,
    'gender': gender,
    'city': city
})

# 生成商品数据
n_products = 200
product_ids = range(1, n_products + 1)
categories = ['电子产品', '服装', '食品', '家居用品', '办公用品']
product_categories = np.random.choice(categories, n_products)
prices = np.random.uniform(10, 5000, n_products)
product_data = pd.DataFrame({
    'product_id': product_ids,
    'category': product_categories,
    'price': prices.round(2)
})

# 生成订单数据
n_orders = 5000
order_ids = range(1, n_orders + 1)
order_dates = [datetime(2023, 1, 1) + timedelta(days=random.randint(0, 364)) for _ in range(n_orders)]
user_ids_order = np.random.choice(user_ids, n_orders)
order_data = pd.DataFrame({
    'order_id': order_ids,
    'user_id': user_ids_order,
    'order_date': order_dates
})

# 生成订单详情数据
order_items = []
for order_id in order_ids:
    # 每个订单1-5个商品
    n_items = random.randint(1, 5)
    for _ in range(n_items):
        product_id = np.random.choice(product_ids)
        quantity = random.randint(1, 3)
        # 获取商品价格
        price = product_data.loc[product_data['product_id'] == product_id, 'price'].values[0]
        order_items.append({
            'order_id': order_id,
            'product_id': product_id,
            'quantity': quantity,
            'item_price': price
        })

order_items_data = pd.DataFrame(order_items)

# 合并数据
order_details = order_data.merge(order_items_data, on='order_id')
order_details = order_details.merge(user_data, on='user_id')
order_details = order_details.merge(product_data, on='product_id')

# 计算订单金额
order_details['total_amount'] = order_details['quantity'] * order_details['item_price']

print('电商平台数据集生成完成！')
print(f'订单详情数据形状：{order_details.shape}')
print('\n前5行数据：')
print(order_details.head())
print('\n基本统计信息：')
print(order_details[['quantity', 'item_price', 'total_amount']].describe())
order_details`,
    evaluationCriteria: [
      '成功生成电商平台数据集',
      '正确进行数据清洗和预处理',
      '正确进行多维度分析',
      '正确创建综合可视化和报告'
    ],
    estimatedTime: '6-8小时',
    prerequisites: ['Python基础', 'pandas高级操作', '数据可视化技能']
  }
];

// 根据ID获取项目
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

// 获取项目列表
export const getProjects = (): Project[] => {
  return projects;
};
