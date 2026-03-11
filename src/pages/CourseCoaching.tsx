import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, GraduationCap, Palette, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactModal from '../components/ContactModal';

export default function CourseCoaching() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        <Link to="/courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-12 transition-colors font-medium">
          <ArrowLeft size={20} /> 返回课程体系
        </Link>

        {/* Hero Section: Editorial Style */}
        <section className="grid grid-cols-12 gap-6 mb-24">
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-end min-h-[400px]">
            <span className="text-primary font-bold tracking-widest uppercase mb-4 block">ITALIAN FINE ARTS ACADEMY</span>
            <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
              转学 / 升学 / <br />
              <span className="text-primary">毕业辅导</span>
            </h2>
            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              专为意大利美院在读学生定制的专业进阶指导。我们采用极简画册排版逻辑，助力每一份作品集达到顶级策展水准。
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden aspect-[3/4] relative group" style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white text-black px-6 py-2 rounded-full font-bold">了解更多</span>
              </div>
            </div>
          </div>
        </section>

        {/* Course Grid: Core Steps */}
        <section className="mb-32">
          <div className="flex items-baseline justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-12">
            <h3 className="text-2xl font-bold italic uppercase tracking-tighter">01 课程阶梯 / Core Levels</h3>
            <span className="text-sm font-medium text-slate-400">SELECT YOUR PATH</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Level 01 */}
            <div className="border-l border-slate-200 dark:border-slate-800 pl-8 py-4 hover:border-primary transition-colors group">
              <span className="text-5xl font-black text-slate-200 dark:text-slate-800 group-hover:text-primary transition-colors block mb-6">01</span>
              <h4 className="text-xl font-bold mb-4">基础辅导课程</h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 20个精品课时</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 1对1 深度指导</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 锁定1所目标美院</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 1场全仿真模拟面试</li>
              </ul>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 w-full py-3 rounded-lg border border-slate-900 dark:border-slate-100 font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-slate-100 dark:hover:text-black transition-all"
              >
                立即预约
              </button>
            </div>
            {/* Level 02 */}
            <div className="border-l border-slate-200 dark:border-slate-800 pl-8 py-4 hover:border-primary transition-colors group">
              <span className="text-5xl font-black text-slate-200 dark:text-slate-800 group-hover:text-primary transition-colors block mb-6">02</span>
              <h4 className="text-xl font-bold mb-4">标准进阶课程</h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 40个精品课时</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 1对1 专业陪跑</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 针对1所核心美院</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 2场全仿真模拟面试</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 包含排版与画册制作指导</li>
              </ul>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 w-full py-3 rounded-lg border border-slate-900 dark:border-slate-100 font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-slate-100 dark:hover:text-black transition-all"
              >
                立即预约
              </button>
            </div>
            {/* Level 03 */}
            <div className="border-l border-slate-200 dark:border-slate-800 pl-8 py-4 hover:border-primary transition-colors group">
              <span className="text-5xl font-black text-slate-200 dark:text-slate-800 group-hover:text-primary transition-colors block mb-6">03</span>
              <h4 className="text-xl font-bold mb-4">全能进阶课程</h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 60个精品课时</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 1对1 资深导师</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 冲刺3所目标美院</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 2场高强度模拟面试</li>
                <li className="flex items-center gap-2"><CheckCircle className="text-primary w-4 h-4" /> 文案润色 / 外教语言指导</li>
              </ul>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 w-full py-3 rounded-lg border border-slate-900 dark:border-slate-100 font-bold hover:bg-slate-900 hover:text-white dark:hover:bg-slate-100 dark:hover:text-black transition-all"
              >
                立即预约
              </button>
            </div>
          </div>
        </section>

        {/* Services Section: Minimalist Grid */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-12">
            <h3 className="text-2xl font-bold italic uppercase tracking-tighter">02 增益服务 / Extras</h3>
            <span className="text-sm font-medium text-slate-400">ENHANCE YOUR JOURNEY</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <div className="bg-white dark:bg-slate-900 p-10 flex flex-col items-center text-center border border-slate-100 dark:border-slate-800">
              <GraduationCap className="w-10 h-10 mb-6 text-primary" />
              <h5 className="text-lg font-bold mb-3 tracking-tight">毕业辅导</h5>
              <p className="text-sm text-slate-500 leading-relaxed">针对论文开题、作品集整合及最终答辩的全方位技术性指导。</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-10 flex flex-col items-center text-center border border-slate-100 dark:border-slate-800">
              <Palette className="w-10 h-10 mb-6 text-primary" />
              <h5 className="text-lg font-bold mb-3 tracking-tight">专业实践</h5>
              <p className="text-sm text-slate-500 leading-relaxed">对接意大利当地艺术家工作室，参与真实展览策划与艺术项目。</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-10 flex flex-col items-center text-center border border-slate-100 dark:border-slate-800">
              <Building2 className="w-10 h-10 mb-6 text-primary" />
              <h5 className="text-lg font-bold mb-3 tracking-tight">工作室空间</h5>
              <p className="text-sm text-slate-500 leading-relaxed">提供独立创作空间与专业摄影棚，助力高质量作品集的输出与拍摄。</p>
            </div>
          </div>
        </section>

        {/* Newsletter / Contact */}
        <section className="rounded-2xl bg-slate-900 text-white p-12 overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 lg:col-span-7">
              <h4 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">准备好开启你的<br /><span className="text-primary italic">艺术进阶</span>之旅了吗？</h4>
              <p className="text-slate-400 max-w-md">加入我们，与来自布雷拉、都灵、博洛尼亚等顶尖美院的导师一起，重塑你的艺术语言。</p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-center mt-8 lg:mt-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-black font-black py-4 px-8 rounded-lg uppercase tracking-widest hover:brightness-110 transition-all w-full md:w-auto"
              >
                获取免费作品集评估
              </button>
            </div>
          </div>
          {/* Decorative circle */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 border-[40px] border-primary/10 rounded-full"></div>
        </section>
      </main>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
