/**
 * ArtAcademy 前端数据服务层
 * 直接通过 @supabase/supabase-js 读写 Supabase 数据库
 * 无需 Python 后端
 */
import { supabase } from '../lib/supabase';

// --------------------------------------------------------
// 网站全局配置
// --------------------------------------------------------

export interface SiteSettings {
    [key: string]: string;
}

/**
 * 获取网站全局配置（key-value 键值对）
 */
export async function fetchSiteSettings(): Promise<SiteSettings> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');
    if (error) throw new Error(error.message);
    const settings: SiteSettings = {};
    (data || []).forEach((row: { key: string; value: string }) => {
        settings[row.key] = row.value;
    });
    return settings;
}

// --------------------------------------------------------
// 类型定义
// --------------------------------------------------------

export interface Course {
    id: number;
    slug: string;
    category: 'standard' | 'guarantee';
    name: string;
    tag: string | null;
    duration: string;
    format: string;
    content: string;
    target: string;
    sort_order: number;
}

export interface FacultyMember {
    id: number;
    name: string;
    title: string;
    description: string | null;
    image_url: string | null;
    sort_order: number;
}

export interface CaseItem {
    id: number;
    name: string;
    school: string;
    major: string;
    image_url: string | null;
    tags: string[];
    link_url?: string | null;
    sort_order: number;
}

export interface CampusCourse {
    name: string;
    description: string;
}

export interface CampusInstitution {
    name: string;
    name_it: string;
    featured: boolean;
}

export interface Campus {
    id: number;
    slug: string;
    name: string;
    subtitle: string | null;
    address: string;
    description: string | null;
    admission_results: string[];
    activities: { image_url: string; description: string }[];
    gallery_images: string[];
}

export interface Testimonial {
    id: number;
    campus_slug: string;
    content: string;
    student_name: string;
    admission_info: string | null;
    avatar_url: string | null;
    sort_order: number;
}

export interface ContactFormData {
    name: string;
    phone: string;
    message?: string;
}

export interface HomeCurriculum {
    id: number;
    sort_order: number;
    number_label: string;
    title_cn: string;
    icon_name: string;
    objective: string;
    duration: string;
    methodology: string;
    core_points: string[];
}

// --------------------------------------------------------
// 数据读取
// --------------------------------------------------------

/**
 * 获取课程列表
 * @param category 可选分类筛选: 'standard' | 'guarantee'
 */
export async function fetchCourses(category?: string): Promise<Course[]> {
    let query = supabase.from('courses').select('*').order('sort_order');
    if (category) {
        query = query.eq('category', category);
    }
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data || [];
}

/**
 * 获取全部师资信息
 */
export async function fetchFaculty(): Promise<FacultyMember[]> {
    const { data, error } = await supabase
        .from('faculty')
        .select('*')
        .order('sort_order');
    if (error) throw new Error(error.message);
    return data || [];
}

/**
 * 获取全部优秀案例
 */
export async function fetchCases(): Promise<CaseItem[]> {
    const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('sort_order');
    if (error) throw new Error(error.message);
    return data || [];
}

/**
 * 获取指定校区信息
 * @param slug 校区标识: 'florence' | 'milan'
 */
export async function fetchCampus(slug: string): Promise<Campus | null> {
    const { data, error } = await supabase
        .from('campuses')
        .select('*')
        .eq('slug', slug)
        .single();
    if (error) throw new Error(error.message);
    return data;
}

/**
 * 获取指定校区的学生反馈
 * @param campusSlug 校区标识: 'florence' | 'milan'
 */
export async function fetchTestimonials(campusSlug: string): Promise<Testimonial[]> {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('campus_slug', campusSlug)
        .order('sort_order');
    if (error) throw new Error(error.message);
    return data || [];
}

/**
 * 获取首页课程模块
 */
export async function fetchHomeCurriculums(): Promise<HomeCurriculum[]> {
    const { data, error } = await supabase
        .from('home_curriculums')
        .select('*')
        .order('sort_order');
    if (error) throw new Error(error.message);
    return data || [];
}

// --------------------------------------------------------
// 数据写入
// --------------------------------------------------------

export interface AcademyMajor {
    id: string;
    name: string;
    level: 'Undergraduate' | 'Graduate' | 'Both';
    description: string;
    thumbnail: string;
}

export interface AcademyInfo {
    id: string;
    slug: string;
    name: string;
    name_it: string;
    established: string;
    logo: string;
    hero_image: string;
    introduction: string;
    majors: AcademyMajor[];
}

/**
 * 获取所有美院专业介绍数据
 */
export async function fetchAcademies(): Promise<AcademyInfo[]> {
    const { data, error } = await supabase
        .from('academies')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) throw new Error(error.message);
    return data || [];
}

/**
 * 提交联系/预约咨询表单
 * @param formData 表单数据
 */
export async function submitContact(formData: ContactFormData): Promise<void> {
    const { error } = await supabase.from('contacts').insert({
        name: formData.name,
        phone: formData.phone,
        message: formData.message || null,
    });
    if (error) throw new Error(error.message);
}
