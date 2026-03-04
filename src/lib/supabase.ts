/**
 * 前端 Supabase 客户端
 * 直接从前端连接 Supabase，无需 Python 后端
 * NOTE: 使用 anon/publishable key，配合 RLS 策略保证安全
 */
/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// NOTE: Supabase 凭证从环境变量读取（Vite 通过 import.meta.env 注入）
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn('Supabase 环境变量未配置，数据库功能将不可用');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
