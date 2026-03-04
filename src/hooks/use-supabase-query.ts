/**
 * 通用 Supabase 数据获取 Hook
 * 提供加载状态管理和错误处理，支持 fallback 默认数据
 */
import { useState, useEffect } from 'react';

interface UseSupabaseQueryResult<T> {
    data: T;
    isLoading: boolean;
    error: string | null;
}

/**
 * 从 Supabase 获取数据的通用 Hook
 * 当 API 不可用或出错时，使用 fallback 默认数据
 * @param fetcher 数据获取函数
 * @param fallback 默认/兜底数据（加载失败时使用）
 */
export function useSupabaseQuery<T>(
    fetcher: () => Promise<T>,
    fallback: T
): UseSupabaseQueryResult<T> {
    const [data, setData] = useState<T>(fallback);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                const result = await fetcher();
                if (!cancelled) {
                    setData(result);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : '数据加载失败');
                    // NOTE: 出错时保留 fallback 数据，页面不会空白
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        }

        load();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data, isLoading, error };
}
