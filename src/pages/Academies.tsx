import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { academiesData as fallbackAcademiesData } from '../data/academies';
import { fetchAcademies, type AcademyInfo } from '../services/api';
import { useSupabaseQuery } from '../hooks/use-supabase-query';

export default function Academies() {
    const { data: academiesData, isLoading, error } = useSupabaseQuery<AcademyInfo[]>(
        fetchAcademies,
        fallbackAcademiesData as AcademyInfo[]
    );

    return (
        <div className="pt-32 pb-24 min-h-screen bg-background-light">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-12 transition-colors font-medium">
                    <ArrowLeft size={20} /> 返回首页
                </Link>

                {/* Page Title */}
                <div className="mb-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">美院专业介绍</h1>
                    <p className="text-lg text-slate-500 max-w-3xl mx-auto">
                        探索意大利五大顶尖国立美术学院的历史底蕴与全学制专业解析。
                    </p>
                </div>

                {/* Academies List */}
                <div className="space-y-32">
                    {academiesData.map((academy) => (
                        <div key={academy.id} className="scroll-mt-32" id={academy.slug}>

                            {/* Level 1: Academy Hero & Intro */}
                            <div className="mb-12">
                                <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
                                    <div className="w-20 h-20 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 border border-slate-100">
                                        <img src={academy.logo} alt={`${academy.name} Logo`} className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-bold mb-2 flex flex-wrap items-end gap-4">
                                            {academy.name}
                                            <span className="text-xl text-slate-400 font-normal italic">{academy.name_it}</span>
                                        </h2>
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1"><MapPin size={16} /> 意大利建校</span>
                                            <span className="px-2 py-1 bg-slate-100 rounded-md">始于 {academy.established}</span>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="w-full aspect-[21/9] rounded-3xl bg-cover bg-center mb-8 shadow-sm"
                                    style={{ backgroundImage: `url('${academy.hero_image}')` }}
                                ></div>

                                <p className="text-lg text-slate-600 leading-relaxed max-w-4xl">
                                    {academy.introduction}
                                </p>
                            </div>

                            {/* Level 2: Majors Grid */}
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                                    专业概览体系
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {academy.majors.map((major) => (
                                        <div key={major.id} className="group">
                                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4 relative">
                                                <img
                                                    src={major.thumbnail}
                                                    alt={major.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary shadow-sm">
                                                    {major.level === 'Both' ? '本/硕' : major.level === 'Undergraduate' ? '本科' : '硕士'}
                                                </div>
                                            </div>
                                            <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{major.name}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {major.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
