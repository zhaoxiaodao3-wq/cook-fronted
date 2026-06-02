export const categories = [
  { id: 'all', name: '全部' },
  { id: 'breakfast', name: '早餐' },
  { id: 'lunch', name: '午餐' },
  { id: 'dinner', name: '晚餐' },
  { id: 'dessert', name: '甜点' },
];

export const cuisines = [
  { id: 'chuan', name: '川菜' },
  { id: 'yue', name: '粤菜' },
  { id: 'lu', name: '鲁菜' },
  { id: 'su', name: '苏菜' },
  { id: 'other', name: '其他' }
];

export const tags = [
  { id: 'low-fat', name: '减脂' },
  { id: 'vegetarian', name: '素食' },
  { id: 'premium', name: '精选' },
  { id: 'quick', name: '快手菜' }
];

export type Recipe = {
  id: string;
  title: string;
  coverImage: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  rating: number;
  ratingCount: number;
  uploadTime: string;
  duration: number; // minutes
  difficulty: '简单' | '中等' | '困难';
  category: string;
  cuisine: string;
  tags: string[];
  servings: number;
  ingredients: { name: string; amount: string; unit: string }[];
  steps: { id: number; desc: string; image?: string }[];
  tips: string;
};

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: '健康活力燕麦碗',
    coverImage: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYnJlYWtmYXN0fGVufDF8fHx8MTc4MDMxMjA3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    author: {
      id: 'u1',
      name: '小李厨娘',
      avatar: 'https://i.pravatar.cc/150?u=u1'
    },
    rating: 4.8,
    ratingCount: 128,
    uploadTime: '2026-05-30',
    duration: 15,
    difficulty: '简单',
    category: 'breakfast',
    cuisine: 'other',
    tags: ['low-fat', 'vegetarian', 'quick'],
    servings: 1,
    ingredients: [
      { name: '燕麦片', amount: '50', unit: '克' },
      { name: '牛奶', amount: '200', unit: '毫升' },
      { name: '蓝莓', amount: '20', unit: '克' },
      { name: '香蕉', amount: '1', unit: '根' }
    ],
    steps: [
      { id: 1, desc: '将燕麦片倒入碗中。' },
      { id: 2, desc: '加入牛奶，没过燕麦片即可。' },
      { id: 3, desc: '切好香蕉片，和洗净的蓝莓一起铺在上面。' }
    ],
    tips: '也可以加入一勺蜂蜜增加甜味哦！'
  },
  {
    id: '2',
    title: '迷迭香煎牛排',
    coverImage: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGRpbm5lcnxlbnwxfHx8fDE3ODAzMTIwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    author: {
      id: 'u2',
      name: '老张头',
      avatar: 'https://i.pravatar.cc/150?u=u2'
    },
    rating: 4.9,
    ratingCount: 342,
    uploadTime: '2026-05-28',
    duration: 30,
    difficulty: '中等',
    category: 'dinner',
    cuisine: 'other',
    tags: ['premium'],
    servings: 2,
    ingredients: [
      { name: '西冷牛排', amount: '400', unit: '克' },
      { name: '海盐', amount: '5', unit: '克' },
      { name: '黑胡椒', amount: '3', unit: '克' },
      { name: '迷迭香', amount: '2', unit: '支' },
      { name: '黄油', amount: '20', unit: '克' },
      { name: '大蒜', amount: '3', unit: '瓣' }
    ],
    steps: [
      { id: 1, desc: '牛排提前解冻，用厨房纸吸干表面水分。均匀撒上海盐和黑胡椒腌制10分钟。' },
      { id: 2, desc: '热锅冷油，将锅烧至冒烟。放入牛排，每面煎约1.5分钟（5分熟）。' },
      { id: 3, desc: '加入黄油、迷迭香和拍碎的大蒜，用勺子将融化的黄油不断淋在牛排上，持续30秒。' },
      { id: 4, desc: '取出牛排，静置5分钟锁住肉汁后即可切片。' }
    ],
    tips: '静置这一步非常关键，千万不要刚煎好就切！'
  },
  {
    id: '3',
    title: '清新田园沙拉',
    coverImage: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwbHVuY2h8ZW58MXx8fHwxNzgwMzEyMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: {
      id: 'u3',
      name: '健身狂人',
      avatar: 'https://i.pravatar.cc/150?u=u3'
    },
    rating: 4.5,
    ratingCount: 89,
    uploadTime: '2026-05-29',
    duration: 10,
    difficulty: '简单',
    category: 'lunch',
    cuisine: 'other',
    tags: ['low-fat', 'vegetarian', 'quick'],
    servings: 1,
    ingredients: [
      { name: '混合生菜', amount: '100', unit: '克' },
      { name: '小番茄', amount: '50', unit: '克' },
      { name: '黄瓜', amount: '50', unit: '克' },
      { name: '橄榄油', amount: '10', unit: '毫升' },
      { name: '意大利香醋', amount: '5', unit: '毫升' }
    ],
    steps: [
      { id: 1, desc: '生菜洗净沥干水分，撕成小块。' },
      { id: 2, desc: '小番茄对半切开，黄瓜切片。' },
      { id: 3, desc: '将所有蔬菜混合，淋上橄榄油和意大利香醋，拌匀即可。' }
    ],
    tips: '可以加点坚果碎增加口感。'
  },
  {
    id: '4',
    title: '草莓海绵蛋糕',
    coverImage: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2VldCUyMGRlc3NlcnQlMjBjYWtlfGVufDF8fHx8MTc4MDMxMjA3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    author: {
      id: 'u4',
      name: '甜品大师',
      avatar: 'https://i.pravatar.cc/150?u=u4'
    },
    rating: 4.7,
    ratingCount: 210,
    uploadTime: '2026-05-25',
    duration: 120,
    difficulty: '困难',
    category: 'dessert',
    cuisine: 'other',
    tags: ['premium'],
    servings: 6,
    ingredients: [
      { name: '鸡蛋', amount: '3', unit: '个' },
      { name: '细砂糖', amount: '90', unit: '克' },
      { name: '低筋面粉', amount: '90', unit: '克' },
      { name: '黄油', amount: '30', unit: '克' },
      { name: '牛奶', amount: '30', unit: '克' },
      { name: '淡奶油', amount: '300', unit: '克' },
      { name: '草莓', amount: '200', unit: '克' }
    ],
    steps: [
      { id: 1, desc: '全蛋加糖打发至画8字不消失。' },
      { id: 2, desc: '分次筛入面粉，翻拌均匀。' },
      { id: 3, desc: '加入融化的黄油和牛奶混合液，拌匀后倒入模具。' },
      { id: 4, desc: '烤箱160度烘烤35分钟，出炉倒扣晾凉。' },
      { id: 5, desc: '淡奶油打发，抹面并用草莓装饰。' }
    ],
    tips: '打发全蛋时可以隔温水，更容易打发。'
  },
  {
    id: '5',
    title: '麻婆豆腐',
    coverImage: 'https://images.unsplash.com/photo-1702705487239-10a1ca715454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGluZXNlJTIwc3BpY3klMjBmb29kfGVufDF8fHx8MTc4MDMxMjA4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    author: {
      id: 'u5',
      name: '川味老饕',
      avatar: 'https://i.pravatar.cc/150?u=u5'
    },
    rating: 4.9,
    ratingCount: 521,
    uploadTime: '2026-05-31',
    duration: 20,
    difficulty: '中等',
    category: 'dinner',
    cuisine: 'chuan',
    tags: ['quick'],
    servings: 3,
    ingredients: [
      { name: '嫩豆腐', amount: '400', unit: '克' },
      { name: '牛肉末', amount: '50', unit: '克' },
      { name: '郫县豆瓣酱', amount: '20', unit: '克' },
      { name: '豆豉', amount: '10', unit: '克' },
      { name: '辣椒面', amount: '5', unit: '克' },
      { name: '花椒面', amount: '3', unit: '克' },
      { name: '葱姜蒜', amount: '适量', unit: '' }
    ],
    steps: [
      { id: 1, desc: '豆腐切方块，沸水中加盐焯水1分钟捞出。' },
      { id: 2, desc: '热油煸香牛肉末，盛出备用。' },
      { id: 3, desc: '底油炒香豆瓣酱、豆豉、辣椒面，加入葱姜蒜末。' },
      { id: 4, desc: '加水煮沸，放入豆腐和牛肉末，中小火慢炖5分钟。' },
      { id: 5, desc: '勾薄芡，出锅前撒上花椒面和葱花。' }
    ],
    tips: '勾芡要分三次进行，这样芡汁才能紧紧包裹住豆腐。'
  },
  {
    id: '6',
    title: '美式松饼',
    coverImage: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5jYWtlJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc4MDMxMjA4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    author: {
      id: 'u1',
      name: '小李厨娘',
      avatar: 'https://i.pravatar.cc/150?u=u1'
    },
    rating: 4.6,
    ratingCount: 156,
    uploadTime: '2026-06-01',
    duration: 20,
    difficulty: '简单',
    category: 'breakfast',
    cuisine: 'other',
    tags: ['quick'],
    servings: 2,
    ingredients: [
      { name: '低筋面粉', amount: '150', unit: '克' },
      { name: '牛奶', amount: '150', unit: '毫升' },
      { name: '鸡蛋', amount: '1', unit: '个' },
      { name: '糖', amount: '30', unit: '克' },
      { name: '泡打粉', amount: '5', unit: '克' },
      { name: '黄油', amount: '15', unit: '克' }
    ],
    steps: [
      { id: 1, desc: '鸡蛋加糖打散，加入牛奶拌匀。' },
      { id: 2, desc: '筛入面粉和泡打粉，画Z字拌匀至无颗粒。' },
      { id: 3, desc: '加入融化的黄油拌匀。' },
      { id: 4, desc: '平底锅不放油，舀一勺面糊，表面冒泡后翻面，再煎30秒即可。' }
    ],
    tips: '锅一定要保持小火，否则容易焦。'
  }
];
