"""
ArtAcademy FastAPI 后端主入口
提供课程、师资、案例、校区、联系表单等 RESTful API
"""
import logging
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from database import supabase
from schemas import (
    ContactForm,
    CourseResponse,
    FacultyResponse,
    CaseResponse,
    CampusResponse,
    TestimonialResponse,
)

logger = logging.getLogger(__name__)

app = FastAPI(title="ArtAcademy API")

# CORS 中间件配置
app.add_middleware(
    CORSMiddleware,
    # NOTE: 生产环境应替换为具体的前端域名
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _ensure_db() -> None:
    """确保数据库连接可用，否则抛出 500 错误"""
    if not supabase:
        raise HTTPException(
            status_code=500,
            detail="服务器未正确配置数据库连接 (Supabase)",
        )


# --------------------------------------------------------
# 健康检查
# --------------------------------------------------------


@app.get("/api/health")
async def health_check():
    """用来验证后端服务是否正常运行"""
    return {"status": "ok", "database": bool(supabase)}


# --------------------------------------------------------
# 课程 API
# --------------------------------------------------------


@app.get("/api/courses", response_model=List[CourseResponse])
async def get_courses(category: Optional[str] = Query(None, description="筛选分类: standard | guarantee")):
    """
    获取课程列表
    支持通过 category 参数筛选标准课程或保障课程
    """
    _ensure_db()
    try:
        query = supabase.table("courses").select("*").order("sort_order")
        if category:
            query = query.eq("category", category)
        response = query.execute()
        return response.data
    except Exception as e:
        logger.error("获取课程列表失败: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


# --------------------------------------------------------
# 师资 API
# --------------------------------------------------------


@app.get("/api/faculty", response_model=List[FacultyResponse])
async def get_faculty():
    """获取全部师资信息"""
    _ensure_db()
    try:
        response = supabase.table("faculty").select("*").order("sort_order").execute()
        return response.data
    except Exception as e:
        logger.error("获取师资列表失败: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


# --------------------------------------------------------
# 案例 API
# --------------------------------------------------------


@app.get("/api/cases", response_model=List[CaseResponse])
async def get_cases():
    """获取全部优秀案例"""
    _ensure_db()
    try:
        response = supabase.table("cases").select("*").order("sort_order").execute()
        return response.data
    except Exception as e:
        logger.error("获取案例列表失败: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


# --------------------------------------------------------
# 校区 API
# --------------------------------------------------------


@app.get("/api/campuses/{slug}", response_model=CampusResponse)
async def get_campus(slug: str):
    """
    获取指定校区的详细信息
    slug 可选值: florence | milan
    """
    _ensure_db()
    try:
        response = (
            supabase.table("campuses")
            .select("*")
            .eq("slug", slug)
            .execute()
        )
        if not response.data:
            raise HTTPException(status_code=404, detail=f"校区 '{slug}' 不存在")
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        logger.error("获取校区信息失败: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


# --------------------------------------------------------
# 学生反馈 API
# --------------------------------------------------------


@app.get("/api/testimonials/{campus_slug}", response_model=List[TestimonialResponse])
async def get_testimonials(campus_slug: str):
    """获取指定校区的学生反馈"""
    _ensure_db()
    try:
        response = (
            supabase.table("testimonials")
            .select("*")
            .eq("campus_slug", campus_slug)
            .order("sort_order")
            .execute()
        )
        return response.data
    except Exception as e:
        logger.error("获取学生反馈失败: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


# --------------------------------------------------------
# 联系表单 API
# --------------------------------------------------------


@app.post("/api/contact")
async def submit_contact(form: ContactForm):
    """提交联系表单到 Supabase 的 contacts 表"""
    _ensure_db()
    try:
        data = {
            "name": form.name,
            "phone": form.phone,
            "message": form.message,
        }
        response = supabase.table("contacts").insert(data).execute()
        return {"success": True, "data": response.data}
    except Exception as e:
        logger.error("提交联系表单失败: %s", e)
        raise HTTPException(status_code=500, detail=str(e))
