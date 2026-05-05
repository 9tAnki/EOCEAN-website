/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useInView 
} from "motion/react";
import { 
  ChevronDown, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  Send, 
  MessageSquare,
  ArrowRight,
  Globe,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Settings,
  User
} from "lucide-react";

// --- Types ---
interface NavItem {
  label: string;
  enLabel?: string;
  href: string;
  dropdown?: { label: string; href: string }[];
}

// --- Constants ---
const NAV_ITEMS: NavItem[] = [
  { label: "首页", enLabel: "Home", href: "#home" },
  { 
    label: "产品中心", 
    enLabel: "Products", 
    href: "#products",
    dropdown: [
      { label: "轻量化光电载荷系统", href: "#products-1" },
      { label: "智能安全供电系统", href: "#products-2" },
      { label: "高密度光电组件", href: "#products-3" },
    ]
  },
  { 
    label: "解决方案", 
    enLabel: "Solutions", 
    href: "#solutions",
    dropdown: [
      { label: "可见光通信 (LiFi) 方案", href: "#solutions-1" },
      { label: "物联网 (IoT) 智能控制系统", href: "#solutions-2" },
      { label: "定制化硬件开发", href: "#solutions-3" },
    ]
  },
  { 
    label: "关于我们", 
    enLabel: "About Us", 
    href: "#about",
    dropdown: [
      { label: "公司简介", href: "#about-1" },
      { label: "团队风采", href: "#about-2" },
      { label: "资质荣誉", href: "#about-3" },
    ]
  },
  { label: "新闻动态", enLabel: "News", href: "#news" },
  { label: "服务", enLabel: "Services", href: "#services" },
  { label: "联系我们", enLabel: "Contact", href: "#contact" },
];

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", // Tech blue
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop", // Electronics
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // High-tech
];

const CONTACT_INFO = {
  name: "盛先生 (Mr. Sheng)",
  phone: "(+86) 15262868308",
  email: "anson@eocean.email",
  address: "南通市崇川区长通路3号双逸国际大厦A座1208",
  addressEn: "1208, Tower A, Shuangyi Building, 3 Changtong Rd, Chongchuan District, Nantong City",
  company: "南通亿澳芯科技有限公司",
  companyEn: "Nantong EOCEAN Technology Co., LTD",
  copyright: "Copyright © 2026 Nantong EOCEAN Technology Co., LTD. All Rights Reserved."
};

// --- Components ---

const NavDropdown = ({ item }: { item: NavItem, key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a 
        href={item.href}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors whitespace-nowrap"
      >
        {item.label}
        {item.dropdown && <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />}
      </a>
      
      {item.dropdown && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 mt-1 w-56 glass rounded-xl overflow-hidden z-50 shadow-2xl py-2"
            >
              {item.dropdown.map((sub, idx) => (
                <a
                  key={idx}
                  href={sub.href}
                  className="block px-6 py-3 text-sm text-gray-600 hover:bg-blue-50/50 hover:text-blue-600 transition-colors"
                >
                  {sub.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 glass" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo - Removed subtitle, changed Chinese to TECH */}
        <div className="flex items-center">
          <div>
            <span className="block font-display font-bold text-xl leading-tight tracking-tight text-gray-900">
              EOCEAN <span className="text-blue-600">TECH</span>
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-2">
          {NAV_ITEMS.map((item, idx) => (
            <NavDropdown key={idx} item={item} />
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_ITEMS.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <a href={item.href} className="font-medium text-gray-900 py-2">
                    {item.label}
                  </a>
                  {item.dropdown?.map((sub, sIdx) => (
                    <a key={sIdx} href={sub.href} className="pl-4 text-gray-500 text-sm py-1 border-l-2 border-blue-100">
                      {sub.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Slides - Removed mode="wait" for cross-fade */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={SLIDE_IMAGES[current]} 
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Container - Added padding-top to ensure no collision with navbar and centered contents */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 pt-12 md:pt-16 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-dark p-5 md:p-12 rounded-[32px] md:rounded-[40px] text-center max-w-2xl relative w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-200 text-[10px] font-semibold uppercase tracking-[0.2em] mb-4 md:mb-6"
          >
            <Zap className="w-3 h-3 fill-current" />
            Empowering Future Life
          </motion.div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-[1.2] tracking-tight">
            用科技赋能<br className="sm:hidden" />未来生活
          </h1>
          
          <p className="text-white/80 text-sm md:text-lg font-light mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed">
            Empowering future life<br className="sm:hidden" /> with technology
          </p>

          <div className="h-px w-16 md:w-20 bg-white/20 mx-auto mb-6 md:mb-8" />

          <motion.div
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scale: [0.99, 1, 0.99]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6"
          >
            <h2 className="text-sm md:text-xl font-semibold text-blue-300 mb-1 leading-relaxed">
              网站正在建设中<br className="sm:hidden" /> 欢迎联系
            </h2>
            <p className="text-white/50 text-[10px] md:text-sm">
              Website under construction
            </p>
          </motion.div>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <a 
              href="mailto:anson@eocean.email"
              className="w-full sm:w-auto px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 group shadow-xl text-sm"
            >
              立刻联系 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#products"
              className="w-full sm:w-auto px-8 py-3 bg-white/10 text-white font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              了解更多
            </a>
          </div>

          {/* Scroll Indicator - Replaced line with arrows */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute -right-8 md:-right-16 bottom-0 hidden lg:flex flex-col items-center gap-2"
          >
            <span className="text-white text-[10px] uppercase font-bold tracking-[0.4em] [writing-mode:vertical-lr] drop-shadow-lg mb-2">Scroll</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center -space-y-2"
            >
              <ChevronDown className="w-5 h-5 text-white drop-shadow-lg" />
              <ChevronDown className="w-5 h-5 text-white/60 drop-shadow-lg" />
              <ChevronDown className="w-5 h-5 text-white/30 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 lg:hidden flex flex-col items-center gap-1"
      >
        <span className="text-white/40 text-[9px] uppercase font-bold tracking-[0.2em]">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white/60" />
      </motion.div>
    </section>
  );
};

const ContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-10 right-10 z-[60]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        >
          {isOpen ? <X /> : <MessageSquare />}
          <div className="absolute right-full mr-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            立即咨询 Consult Now
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 md:bottom-32 left-4 right-4 md:left-auto md:right-10 z-[60] md:w-[400px]"
          >
            <div className="glass p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-2xl border border-white/40 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">发送咨询消息</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Consultation Form</p>
                </div>
              </div>

              <form 
                action={`mailto:${CONTACT_INFO.email}`} 
                method="POST" 
                encType="text/plain"
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">您的姓名 Name</label>
                  <input 
                    name="name" 
                    type="text" 
                    required 
                    placeholder="请输入您的姓名"
                    className="w-full bg-white/50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">电话 Phone</label>
                    <input 
                      name="phone" 
                      type="tel" 
                      required 
                      placeholder="您的电话"
                      className="w-full bg-white/50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">邮箱 Email</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      placeholder="您的邮箱"
                      className="w-full bg-white/50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">公司/项目名称 Company</label>
                  <input 
                    name="company" 
                    type="text" 
                    placeholder="请输入公司或项目名称"
                    className="w-full bg-white/50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">需求描述 Description</label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    required 
                    placeholder="请简要描述您的需求..."
                    className="w-full bg-white/50 border border-gray-100 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
                >
                  确认发送 <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: React.ElementType, title: string, desc: string, delay: number }) => (
  <motion.div
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 40 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay }}
    className="glass p-8 rounded-[32px] hover-lift group"
  >
    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

export default function App() {
  return (
    <div className="relative selection:bg-blue-100">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <HeroSlider />

        {/* Features / Preview Section */}
        <section id="products" className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-blue-600 text-xs font-bold uppercase tracking-[0.3em] block mb-4"
              >
                Core Strength
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                领先科技 赋能多维应用
              </motion.h2>
              <div className="h-1 w-20 bg-blue-600 mx-auto opacity-20 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={Globe}
                title="光电载荷系统"
                desc="自主研发的高精度、轻量化光电侦察与跟踪系统，广泛应用于安防、监测及特种行业。"
                delay={0.1}
              />
              <FeatureCard 
                icon={ShieldCheck}
                title="智能供电方案"
                desc="基于AI的智能能源管理模块，确保持续、稳定的高效率电力供应。"
                delay={0.2}
              />
              <FeatureCard 
                icon={Layers}
                title="高密度光电组件"
                desc="先进的微组装工艺，提供超小尺寸、高性能的定制化组件。"
                delay={0.3}
              />
              <FeatureCard 
                icon={Settings}
                title="定制化开发"
                desc="针对具体需求，提供从设计、打样到量产的全流程技术支持与开发服务。"
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Contact Strip */}
        <section id="contact" className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="glass p-6 md:p-12 lg:p-20 rounded-[32px] md:rounded-[48px] bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full -ml-32 -mb-32 blur-2xl" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                <div className="w-full">
                  <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6 italic leading-tight">
                    期待与您的合作<br />共创未来
                  </h2>
                  <p className="text-blue-100/70 text-sm md:text-base mb-8 max-w-md">
                    我们的团队已准备好为您提供专业的技术支持和创新的行业解决方案。
                  </p>
                  
                  {/* Address Card - Condensed and stretched */}
                  <div className="glass-dark bg-white/5 border-white/10 p-4 md:p-5 rounded-2xl w-full mb-4">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <MapPin className="w-4 h-4 text-blue-200" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-1">公司地址 Address</h4>
                        <p className="text-white text-sm md:text-base font-medium leading-snug mb-1">
                          {CONTACT_INFO.address}
                        </p>
                        <p className="text-blue-100/50 text-[10px] md:text-xs leading-relaxed italic">
                          {CONTACT_INFO.addressEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 w-full">
                  <div className="glass-dark bg-white/10 border-white/20 p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 hover:bg-white/15 transition-colors group">
                    <div className="w-8 h-8 bg-white/10 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[8px] md:text-[9px] text-blue-200 font-bold uppercase tracking-wider mb-0.5">联系人 Contact Person</p>
                      <p className="text-white text-xs md:text-base font-semibold leading-tight">{CONTACT_INFO.name}</p>
                    </div>
                  </div>
                  
                  <a href={`tel:${CONTACT_INFO.phone}`} className="glass-dark bg-white/10 border-white/20 p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 hover:bg-white/15 transition-colors group min-w-0">
                    <div className="w-8 h-8 bg-white/10 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[8px] md:text-[9px] text-blue-200 font-bold uppercase tracking-wider mb-0.5">联系电话 Phone Number</p>
                      <p className="text-white text-xs md:text-base font-semibold tracking-wide leading-tight">{CONTACT_INFO.phone}</p>
                    </div>
                  </a>

                  <a href={`mailto:${CONTACT_INFO.email}`} className="glass-dark bg-white/10 border-white/20 p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 hover:bg-white/15 transition-colors group sm:col-span-2 lg:col-span-1 min-w-0">
                    <div className="w-8 h-8 bg-white/10 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[8px] md:text-[9px] text-blue-200 font-bold uppercase tracking-wider mb-0.5">电子邮箱 Email Address</p>
                      <p className="text-white text-xs md:text-base font-semibold leading-tight">{CONTACT_INFO.email}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                  <Cpu className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gray-900 tracking-tight">
                    EOCEAN <span className="text-blue-600">TECHNOLOGY</span>
                  </h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-mono">
                    Innovating the future of tech
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-sm">
                南通亿澳芯科技有限公司专注于光电技术研发与智能系统集成，致力于通过尖端科技赋能未来智慧生活。
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">快速链接 Links</h4>
              <ul className="space-y-4">
                {['产品预览', '解决方案', '关于我们', '最新动态', '服务中心'].map((item, id) => (
                  <li key={id}>
                    <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">关注我们 Follow</h4>
              <div className="flex gap-4">
                {[1, 2, 3].map((_, idx) => (
                  <div key={idx} className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                    {idx === 0 ? <Globe className="w-4 h-4" /> : idx === 1 ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 font-medium">
              {CONTACT_INFO.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Widget */}
      <ContactWidget />
    </div>
  );
}
