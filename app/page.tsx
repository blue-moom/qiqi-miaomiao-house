'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContentItem {
  id: number;
  title: string;
  cover: string;
  author: string;
  avatar: string;
  views: string;
  likes: string;
  videoUrl?: string; // 添加视频URL
  description?: string; // 添加描述
}

interface Section {
  id: string;
  name: string;
  contents: ContentItem[];
}

interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  followers: number;
}

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const sections: Section[] = [
  {
    id: 'game',
    name: '游戏',
    contents: [
      { 
        id: 1, 
        title: '游戏攻略：如何通关最终BOSS', 
        cover: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=游戏攻略', 
        author: '游戏达人', 
        avatar: 'https://via.placeholder.com/40x40/4ECDC4/FFFFFF?text=达人', 
        views: '12.3万', 
        likes: '8.9k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: '详细讲解最终BOSS的战斗策略和技巧，让你轻松通关！'
      },
      { 
        id: 2, 
        title: '新游戏评测：年度最佳作品', 
        cover: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=游戏评测', 
        author: '评测师小王', 
        avatar: 'https://via.placeholder.com/40x40/F7DC6F/FFFFFF?text=小王', 
        views: '8.7万', 
        likes: '5.2k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description: '深度评测2024年度最佳游戏作品，带你领略游戏的魅力！'
      },
      { 
        id: 3, 
        title: '游戏实况：周末快乐直播', 
        cover: 'https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=游戏直播', 
        author: '主播小明', 
        avatar: 'https://via.placeholder.com/40x40/FFEAA7/FFFFFF?text=小明', 
        views: '25.6万', 
        likes: '15.3k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description: '周末快乐游戏时间，一起享受游戏的乐趣！'
      },
      { 
        id: 4, 
        title: '经典游戏重温：童年回忆', 
        cover: 'https://via.placeholder.com/300x200/FD79A8/FFFFFF?text=经典游戏', 
        author: '怀旧玩家', 
        avatar: 'https://via.placeholder.com/40x40/E84393/FFFFFF?text=怀旧', 
        views: '18.9万', 
        likes: '11.2k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description: '重温经典游戏，找回童年的美好回忆！'
      },
      { 
        id: 5, 
        title: '游戏音乐欣赏：OST合集', 
        cover: 'https://via.placeholder.com/300x200/6C5CE7/FFFFFF?text=游戏音乐', 
        author: '音乐爱好者', 
        avatar: 'https://via.placeholder.com/40x40/00B894/FFFFFF?text=音乐', 
        views: '9.4万', 
        likes: '6.8k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        description: '精选游戏原声音乐，让你沉浸在美妙的旋律中！'
      },
      { 
        id: 6, 
        title: '游戏周边开箱：限量版收藏', 
        cover: 'https://via.placeholder.com/300x200/D63031/FFFFFF?text=游戏周边', 
        author: '收藏家', 
        avatar: 'https://via.placeholder.com/40x40/FDCB6E/FFFFFF?text=收藏', 
        views: '14.2万', 
        likes: '9.1k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        description: '开箱限量版游戏周边，收藏家的宝藏分享！'
      },
    ]
  },
  {
    id: 'tech',
    name: '科技',
    contents: [
      { 
        id: 7, 
        title: 'AI最新进展：GPT-5震撼发布', 
        cover: 'https://via.placeholder.com/300x200/74B9FF/FFFFFF?text=AI进展', 
        author: '科技博主', 
        avatar: 'https://via.placeholder.com/40x40/A29BFE/FFFFFF?text=科技', 
        views: '15.2万', 
        likes: '9.8k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        description: 'GPT-5发布震撼科技界，AI新时代来临！'
      },
      { 
        id: 8, 
        title: '编程教程：React 18新特性详解', 
        cover: 'https://via.placeholder.com/300x200/FD79A8/FFFFFF?text=编程教程', 
        author: '码农小李', 
        avatar: 'https://via.placeholder.com/40x40/FDCB6E/FFFFFF?text=小李', 
        views: '22.1万', 
        likes: '12.4k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        description: 'React 18新特性深度解析，提升你的开发技能！'
      },
      { 
        id: 9, 
        title: '硬件评测：最新MacBook Pro深度体验', 
        cover: 'https://via.placeholder.com/300x200/E17055/FFFFFF?text=硬件评测', 
        author: '数码评测师', 
        avatar: 'https://via.placeholder.com/40x40/00B894/FFFFFF?text=数码', 
        views: '28.7万', 
        likes: '16.3k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        description: 'MacBook Pro深度评测，性能与设计的完美结合！'
      },
      { 
        id: 10, 
        title: '未来科技：量子计算突破', 
        cover: 'https://via.placeholder.com/300x200/6C5CE7/FFFFFF?text=量子计算', 
        author: '科学家', 
        avatar: 'https://via.placeholder.com/40x40/4ECDC4/FFFFFF?text=科学', 
        views: '31.5万', 
        likes: '18.9k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        description: '量子计算重大突破，开启科技新纪元！'
      },
    ]
  },
  {
    id: 'anime',
    name: '动漫',
    contents: [
      { 
        id: 11, 
        title: '动漫推荐：2024年秋季新番导视', 
        cover: 'https://via.placeholder.com/300x200/E17055/FFFFFF?text=动漫推荐', 
        author: '动漫迷小雅', 
        avatar: 'https://via.placeholder.com/40x40/00B894/FFFFFF?text=小雅', 
        views: '18.9万', 
        likes: '11.2k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
        description: '2024秋季新番导视，带你发现精彩动漫作品！'
      },
      { 
        id: 12, 
        title: 'MAD：经典动漫混剪', 
        cover: 'https://via.placeholder.com/300x200/FD79A8/FFFFFF?text=MAD混剪', 
        author: '剪辑师', 
        avatar: 'https://via.placeholder.com/40x40/E84393/FFFFFF?text=剪辑', 
        views: '45.6万', 
        likes: '25.8k',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        description: '经典动漫MAD混剪，视觉与音乐的完美融合！'
      },
      { id: 13, title: '动漫音乐：OP/ED精选集', cover: 'https://via.placeholder.com/300x200/6C5CE7/FFFFFF?text=动漫音乐', author: '音乐宅', avatar: 'https://via.placeholder.com/40x40/F7DC6F/FFFFFF?text=音乐宅', views: '22.3万', likes: '14.7k' },
    ]
  },
  {
    id: 'music',
    name: '音乐',
    contents: [
      { id: 14, title: '音乐MV：最新单曲首发', cover: 'https://via.placeholder.com/300x200/D63031/FFFFFF?text=音乐MV', author: '音乐人小张', avatar: 'https://via.placeholder.com/40x40/E84393/FFFFFF?text=小张', views: '30.5万', likes: '20.1k' },
      { id: 15, title: '音乐教学：吉他入门教程', cover: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=吉他教学', author: '音乐老师', avatar: 'https://via.placeholder.com/40x40/4ECDC4/FFFFFF?text=老师', views: '16.8万', likes: '10.5k' },
      { id: 16, title: '音乐会实录：现场版精选', cover: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=音乐会', author: '音乐发烧友', avatar: 'https://via.placeholder.com/40x40/FFEAA7/FFFFFF?text=发烧友', views: '38.9万', likes: '22.4k' },
    ]
  },
  {
    id: 'life',
    name: '生活',
    contents: [
      { id: 17, title: '生活vlog：一日东京漫步', cover: 'https://via.placeholder.com/300x200/6C5CE7/FFFFFF?text=东京vlog', author: '旅行博主', avatar: 'https://via.placeholder.com/40x40/FDCB6E/FFFFFF?text=旅行', views: '14.7万', likes: '7.3k' },
      { id: 18, title: '美食制作：家常菜教学', cover: 'https://via.placeholder.com/300x200/E17055/FFFFFF?text=美食教学', author: '厨师小王', avatar: 'https://via.placeholder.com/40x40/00B894/FFFFFF?text=小王', views: '25.3万', likes: '15.6k' },
      { id: 19, title: '宠物日常：猫咪的可爱瞬间', cover: 'https://via.placeholder.com/300x200/FD79A8/FFFFFF?text=宠物日常', author: '铲屎官', avatar: 'https://via.placeholder.com/40x40/F7DC6F/FFFFFF?text=铲屎官', views: '19.8万', likes: '12.1k' },
      { id: 20, title: '手工DIY：创意装饰品制作', cover: 'https://via.placeholder.com/300x200/74B9FF/FFFFFF?text=手工DIY', author: '手艺人', avatar: 'https://via.placeholder.com/40x40/A29BFE/FFFFFF?text=手艺', views: '11.4万', likes: '8.7k' },
    ]
  },
  {
    id: 'sports',
    name: '体育',
    contents: [
      { id: 21, title: '篮球教学：基础运球技巧', cover: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=篮球教学', author: '篮球教练', avatar: 'https://via.placeholder.com/40x40/4ECDC4/FFFFFF?text=教练', views: '9.2万', likes: '5.8k' },
      { id: 22, title: '健身计划：增肌训练指南', cover: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=健身计划', author: '健身教练', avatar: 'https://via.placeholder.com/40x40/F7DC6F/FFFFFF?text=健身', views: '27.6万', likes: '16.9k' },
    ]
  },
];

const onboardingSteps = [
  { text: "嘿，你来了 👋", emoji: "👋" },
  { text: "这里是我的小角落 🏠", emoji: "🏠" },
  { text: "准备了点有趣的东西 ✨", emoji: "✨" },
  { text: "希望你喜欢 💫", emoji: "💫" },
  { text: "开始探索吧 🚀", emoji: "🚀" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('game');
  const [showSurprise, setShowSurprise] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // 新增功能状态
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<ContentItem | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'system',
      title: '欢迎来到我的小房间',
      message: '感谢您的访问，希望您在这里找到有趣的内容！',
      time: '刚刚',
      read: false
    },
    {
      id: '2',
      type: 'like',
      title: '您的视频获得了新点赞',
      message: '"游戏攻略：如何通关最终BOSS" 获得了新的点赞',
      time: '5分钟前',
      read: false
    }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'user1',
    name: '访客用户',
    avatar: 'https://via.placeholder.com/40x40/6366F1/FFFFFF?text=我',
    level: 1,
    followers: 0
  });

  useEffect(() => {
    // 每次刷新都显示引导页
    setShowOnboarding(true);
    setCurrentStep(0);
    
    // 从localStorage加载收藏数据
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount + 1 >= 3) {
      setShowSurprise(true);
      setTimeout(() => setShowSurprise(false), 3000);
      setClickCount(0);
    }
  };

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowOnboarding(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (showOnboarding) {
      nextStep();
    }
  };

  // 新增功能函数
  const playVideo = (content: ContentItem) => {
    setPlayingVideo(content);
  };

  const closeVideo = () => {
    setPlayingVideo(null);
  };

  const toggleFavorite = (contentId: number) => {
    const newFavorites = favorites.includes(contentId)
      ? favorites.filter(id => id !== contentId)
      : [...favorites, contentId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    // 添加通知
    const notification: Notification = {
      id: Date.now().toString(),
      type: favorites.includes(contentId) ? 'system' : 'like',
      title: favorites.includes(contentId) ? '已取消收藏' : '已添加到收藏',
      message: `内容 "${sections.flatMap(s => s.contents).find(c => c.id === contentId)?.title}" ${favorites.includes(contentId) ? '已从收藏中移除' : '已添加到您的收藏列表'}`,
      time: '刚刚',
      read: false
    };
    
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    // 标记所有通知为已读
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  useEffect(() => {
    if (showOnboarding) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [showOnboarding, currentStep]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContents, setFilteredContents] = useState<ContentItem[]>([]);

  const currentSection = sections.find(s => s.id === activeSection);

  useEffect(() => {
    if (currentSection?.contents) {
      const filtered = currentSection.contents.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContents(filtered);
    } else {
      setFilteredContents([]);
    }
  }, [currentSection, searchTerm]);

  if (showOnboarding) {
    const textVariants = {
      enter: {
        opacity: 0,
        scale: 0.95,
        y: 20,
      },
      center: {
        opacity: 1,
        scale: 1,
        y: 0,
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: -20,
      },
    };

    const emojiVariants = {
      enter: {
        opacity: 0,
        scale: 0.8,
        rotate: -10,
      },
      center: {
        opacity: 1,
        scale: 1,
        rotate: 0,
      },
      exit: {
        opacity: 0,
        scale: 0.8,
        rotate: 10,
      },
    };

    return (
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 flex items-center justify-center z-50 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* 背景流动动画 */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-500/30 to-pink-400/30"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))",
              "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))",
              "linear-gradient(225deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))",
              "linear-gradient(315deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* 漂浮粒子 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        <div className="text-center max-w-md mx-auto px-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="mb-8"
            >
              <motion.div 
                className="text-8xl mb-6"
                variants={emojiVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.1,
                }}
              >
                {onboardingSteps[currentStep].emoji}
              </motion.div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.2,
                }}
              >
                {onboardingSteps[currentStep].text}
              </motion.h1>
            </motion.div>
          </AnimatePresence>

          {/* 进度指示器 */}
          <motion.div 
            className="flex justify-center space-x-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {onboardingSteps.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'bg-white scale-125' : 'bg-white/30'
                }`}
                animate={{
                  scale: index === currentStep ? 1.25 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {currentStep === onboardingSteps.length - 1 ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={nextStep}
                className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-purple-100 transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95"
                whileTap={{ scale: 0.95 }}
              >
                进入网站
              </motion.button>
            ) : (
              <motion.p 
                className="text-white/80 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                点击屏幕或按任意键继续
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 点击区域 */}
        <motion.div
          className="absolute inset-0 cursor-pointer"
          onClick={nextStep}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900 relative overflow-hidden">
      {/* 轻盈的背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-25 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-gradient-to-r from-green-200 to-teal-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* 顶部导航栏 */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200 sticky top-0 z-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <motion.h1 
                className="text-2xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-500 transition-colors duration-200"
                onClick={handleLogoClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                我的B站
              </motion.h1>
              <motion.div 
                className="ml-2 px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-xs rounded-full text-white font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
              >
                Beta
              </motion.div>
            </div>

            {/* 导航菜单 */}
            <nav className="hidden md:flex space-x-1">
              {sections.slice(0, 6).map(section => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? 'text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.name}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* 右侧操作区 */}
            <div className="flex items-center space-x-4">
              {/* 通知 */}
              <div className="relative">
                <motion.button 
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNotificationClick}
                >
                  🔔
                  {notifications.some(n => !n.read) && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </motion.button>

                {/* 通知下拉菜单 */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-900">通知</h3>
                          <button 
                            onClick={clearAllNotifications}
                            className="text-sm text-gray-500 hover:text-gray-700"
                          >
                            全部清除
                          </button>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">
                            暂无通知
                          </div>
                        ) : (
                          notifications.map(notification => (
                            <div 
                              key={notification.id}
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                                !notification.read ? 'bg-blue-50' : ''
                              }`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="text-2xl">
                                  {notification.type === 'like' ? '👍' : 
                                   notification.type === 'comment' ? '💬' : 
                                   notification.type === 'follow' ? '👤' : '🔔'}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900 text-sm">
                                    {notification.title}
                                  </h4>
                                  <p className="text-gray-600 text-sm mt-1">
                                    {notification.message}
                                  </p>
                                  <span className="text-xs text-gray-400 mt-1 block">
                                    {notification.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 用户头像 */}
              <div className="relative">
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleUserMenuClick}
                >
                  我
                </motion.div>

                {/* 用户菜单 */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={currentUser.avatar} 
                            alt={currentUser.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{currentUser.name}</h4>
                            <p className="text-sm text-gray-500">Lv.{currentUser.level}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          👤 个人资料
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          ⚙️ 设置
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          📊 数据统计
                        </button>
                        <button 
                          onClick={() => {
                            setShowUserMenu(false);
                            // 这里可以添加打开收藏页面的逻辑
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          ❤️ 我的收藏 ({favorites.length})
                        </button>
                        <div className="border-t border-gray-200 my-2"></div>
                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                          🚪 退出登录
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 移动端菜单按钮 */}
              <motion.button 
                className="md:hidden text-gray-500 hover:text-gray-700"
                whileTap={{ scale: 0.9 }}
                onClick={toggleSidebar}
              >
                ☰
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* 移动端侧边栏 */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-40 md:hidden"
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">菜单</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {/* 用户信息 */}
                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{currentUser.name}</h3>
                    <p className="text-sm text-gray-500">Lv.{currentUser.level}</p>
                  </div>
                </div>

                {/* 导航菜单 */}
                <nav className="space-y-2">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-indigo-100 text-indigo-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {section.name}
                    </button>
                  ))}
                </nav>

                {/* 其他选项 */}
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-2">
                  <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    ❤️ 我的收藏 ({favorites.length})
                  </button>
                  <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    ⚙️ 设置
                  </button>
                  <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    📊 数据统计
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎横幅 */}
        <motion.div 
          className="mb-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-center relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
          <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-30 animate-float"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-pink-300 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative z-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              欢迎来到我的小房间 🎉
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-6 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              这里有游戏、科技、动漫、音乐、生活等精彩内容，等着你来探索！
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                🎮 游戏攻略
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                🤖 AI科技
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                🎵 音乐推荐
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                📺 动漫精选
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* 搜索栏 */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder={`在 ${currentSection?.name} 分区搜索...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 shadow-lg"
              />
              <div className="absolute right-3 top-3 text-gray-500">
                🔍
              </div>
            </div>
          </div>
        </div>

        {/* 分区标题和统计 */}
        <div className="text-center mb-8">
          <motion.h2 
            className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {currentSection?.name}分区
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            共 {filteredContents.length} 个精彩内容
          </motion.p>
        </div>

        {/* 内容网格 */}
        {filteredContents.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {filteredContents.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  borderColor: "rgba(99, 102, 241, 0.3)"
                }}
              >
                {/* 封面图 */}
                <div className="relative overflow-hidden">
                  <img 
                    src={item.cover} 
                    alt={item.title} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    HD
                  </div>
                </div>

                {/* 内容信息 */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  {/* 作者信息 */}
                  <div className="flex items-center mb-3">
                    <img 
                      src={item.avatar} 
                      alt={item.author} 
                      className="w-8 h-8 rounded-full mr-3 ring-2 ring-gray-200 group-hover:ring-indigo-300 transition-all duration-300" 
                    />
                    <span className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
                      {item.author}
                    </span>
                  </div>

                  {/* 统计信息 */}
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <span className="mr-1">👁</span>
                        {item.views}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">👍</span>
                        {item.likes}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      刚刚
                    </div>
                  </div>

                  {/* 悬浮时显示的操作按钮 */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center space-x-2">
                    <button 
                      onClick={() => playVideo(item)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200"
                    >
                      播放
                    </button>
                    <button 
                      onClick={() => toggleFavorite(item.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                        favorites.includes(item.id)
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      {favorites.includes(item.id) ? '❤️ 已收藏' : '收藏'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">没有找到相关内容</h3>
            <p className="text-gray-500">试试其他关键词或切换分区</p>
          </motion.div>
        )}

        {/* 分页指示器 */}
        {filteredContents.length > 12 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    page === 1 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="px-2 py-2 text-gray-500">...</span>
              <button className="px-4 py-2 rounded-lg bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200 transition-all duration-300">
                下一页
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 视频播放模态框 */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 视频播放器 */}
              <div className="relative bg-black">
                <video
                  className="w-full h-auto max-h-[60vh] object-contain"
                  controls
                  autoPlay
                  src={playingVideo.videoUrl}
                  poster={playingVideo.cover}
                >
                  您的浏览器不支持视频播放。
                </video>
                <button
                  onClick={closeVideo}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              {/* 视频信息 */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {playingVideo.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {playingVideo.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <img 
                          src={playingVideo.avatar} 
                          alt={playingVideo.author}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span>{playingVideo.author}</span>
                      </div>
                      <span>👁 {playingVideo.views}</span>
                      <span>👍 {playingVideo.likes}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(playingVideo.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                      favorites.includes(playingVideo.id)
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {favorites.includes(playingVideo.id) ? '❤️ 已收藏' : '收藏'}
                  </button>
                </div>

                {/* 相关推荐 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">相关推荐</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sections
                      .flatMap(s => s.contents)
                      .filter(item => item.id !== playingVideo.id)
                      .slice(0, 3)
                      .map(item => (
                        <div 
                          key={item.id}
                          className="flex space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => {
                            setPlayingVideo(item);
                          }}
                        >
                          <img 
                            src={item.cover} 
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                              {item.title}
                            </h4>
                            <p className="text-gray-500 text-xs mt-1">
                              {item.author}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 收藏列表模态框 */}
      <AnimatePresence>
        {showUserMenu && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUserMenu(false)}
          >
            <motion.div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">我的收藏</h2>
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">❤️</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">暂无收藏</h3>
                    <p className="text-gray-600">浏览内容并点击收藏按钮来保存您喜欢的内容</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favorites.map(favId => {
                      const content = sections.flatMap(s => s.contents).find(c => c.id === favId);
                      if (!content) return null;
                      
                      return (
                        <div 
                          key={favId}
                          className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer group"
                          onClick={() => playVideo(content)}
                        >
                          <div className="flex space-x-3">
                            <img 
                              src={content.cover} 
                              alt={content.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                                {content.title}
                              </h3>
                              <p className="text-gray-600 text-xs mb-2">
                                {content.author}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 text-xs text-gray-500">
                                  <span>👁 {content.views}</span>
                                  <span>👍 {content.likes}</span>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(favId);
                                  }}
                                  className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 页脚 */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">关于我们</h3>
              <p className="text-gray-600 text-sm">
                这里是我的小角落，分享有趣的内容和创意。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">分区</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {sections.map(section => (
                  <li key={section.id}>
                    <button 
                      onClick={() => setActiveSection(section.id)}
                      className="hover:text-indigo-600 transition-colors duration-200"
                    >
                      {section.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">联系方式</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📧 contact@myroom.ccwu.cc</p>
                <p>🏠 myroom.ccwu.cc</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">关注我们</h3>
              <div className="flex space-x-4">
                <button className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-xl">
                  📘
                </button>
                <button className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-xl">
                  📷
                </button>
                <button className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-xl">
                  🐦
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 我的小房间. All rights reserved. | Made with ❤️</p>
          </div>
        </div>
      </footer>

      {/* 惊喜弹窗 */}
      {showSurprise && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl shadow-2xl animate-pulse border-4 border-white/20 max-w-md">
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              🎉 惊喜发现！
            </h2>
            <p className="text-lg text-white/90 text-center">
              你找到了隐藏的彩蛋！欢迎来到我的秘密空间~
            </p>
            <div className="mt-6 text-center">
              <span className="text-6xl">🎊</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
