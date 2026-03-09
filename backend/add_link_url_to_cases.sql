-- ============================================================
-- 增加外链字段到 cases（优秀案例）表
-- 请在 Supabase Dashboard 的 SQL Editor 中执行此脚本
-- ============================================================

-- 为 cases 表增加 link_url 字段，允许为空（null）
ALTER TABLE cases ADD COLUMN IF NOT EXISTS link_url TEXT;

-- 为已有的数据设置注释（可选）
COMMENT ON COLUMN cases.link_url IS '学生案例的外部作品集或项目跳转链接';
