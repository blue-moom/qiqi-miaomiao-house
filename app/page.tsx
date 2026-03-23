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
}

interface Section {
  id: string;
  name: string;
  contents: ContentItem[];
}

const sections: Section[] = [
  {
    id: 'game',
    name: '游戏',
    contents: [
      { id: 1, title: '游戏攻略：如何通关', cover: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=游戏封面', author: '游戏达人', avatar: 'https://via.placeholder.com/40x40/4ECDC4/FFFFFF?text=头像', views: '12.3万', likes: '8.9k' },
      { id: 2, title: '新游戏评测', cover: 'https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=游戏封面', author: '评测师', avatar: 'https://via.placeholder.com/40x40/F7DC6F/FFFFFF?text=头像', views: '8.7万', likes: '5.2k' },
      { id: 3, title: '游戏实况直播', cover: 'https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=游戏封面', author: '主播A', avatar: 'https://via.placeholder.com/40x40/FFEAA7/FFFFFF?text=头像', views: '25.6万', likes: '15.3k' },
    ]
  },
  {
    id: 'tech',
    name: '科技',
    contents: [
      { id: 4, title: 'AI最新进展', cover: 'https://via.placeholder.com/300x200/74B9FF/FFFFFF?text=科技封面', author: '科技博主', avatar: 'https://via.placeholder.com/40x40/A29BFE/FFFFFF?text=头像', views: '15.2万', likes: '9.8k' },
      { id: 5, title: '编程教程', cover: 'https://via.placeholder.com/300x200/FD79A8/FFFFFF?text=科技封面', author: '码农', avatar: 'https://via.placeholder.com/40x40/FDCB6E/FFFFFF?text=头像', views: '22.1万', likes: '12.4k' },
    ]
  },
  {
    id: 'anime',
    name: '动漫',
    contents: [
      { id: 6, title: '动漫推荐', cover: 'https://via.placeholder.com/300x200/E17055/FFFFFF?text=动漫封面', author: '动漫迷', avatar: 'https://via.placeholder.com/40x40/00B894/FFFFFF?text=头像', views: '18.9万', likes: '11.2k' },
    ]
  },
  {
    id: 'music',
    name: '音乐',
    contents: [
      { id: 7, title: '音乐MV', cover: 'https://via.placeholder.com/300x200/D63031/FFFFFF?text=音乐封面', author: '音乐人', avatar: 'https://via.placeholder.com/40x40/E84393/FFFFFF?text=头像', views: '30.5万', likes: '20.1k' },
    ]
  },
  {
    id: 'life',
    name: '生活',
    contents: [
      { id: 8, title: '生活vlog', cover: 'https://via.placeholder.com/300x200/6C5CE7/FFFFFF?text=生活封面', author: '生活博主', avatar: 'https://via.placeholder.com/40x40/FDCB6E/FFFFFF?text=头像', views: '14.7万', likes: '7.3k' },
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

  useEffect(() => {
    // 每次刷新都显示引导页
    setShowOnboarding(true);
    setCurrentStep(0);
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

  useEffect(() => {
    if (showOnboarding) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [showOnboarding, currentStep]);

  const currentSection = sections.find(s => s.id === activeSection);

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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 顶部导航栏 */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 
                className="text-2xl font-bold text-pink-500 cursor-pointer hover:text-pink-400 transition-colors"
                onClick={handleLogoClick}
              >
                我的B站
              </h1>
            </div>
            <nav className="flex space-x-8">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">{currentSection?.name}分区</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSection?.contents.map(item => (
            <div 
              key={item.id} 
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
            >
              <img src={item.cover} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
                <div className="flex items-center mb-3">
                  <img src={item.avatar} alt={item.author} className="w-8 h-8 rounded-full mr-3" />
                  <span className="text-sm text-gray-400">{item.author}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>👁 {item.views}</span>
                  <span>👍 {item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

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
