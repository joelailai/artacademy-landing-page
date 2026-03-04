"""
ArtAcademy API 数据模型（Pydantic Schema）
用于请求参数校验和响应序列化
"""
from pydantic import BaseModel
from typing import List, Optional


class ContactForm(BaseModel):
    """联系表单提交请求"""
    name: str
    phone: str
    message: Optional[str] = None


class CourseResponse(BaseModel):
    """课程数据响应"""
    id: int
    slug: str
    category: str
    name: str
    tag: Optional[str] = None
    duration: str
    format: str
    content: str
    target: str
    sort_order: int


class FacultyResponse(BaseModel):
    """师资数据响应"""
    id: int
    name: str
    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    sort_order: int


class CaseResponse(BaseModel):
    """优秀案例数据响应"""
    id: int
    name: str
    school: str
    major: str
    image_url: Optional[str] = None
    tags: List[str] = []
    sort_order: int


class CampusCourse(BaseModel):
    """校区课程子项"""
    name: str
    description: str


class CampusInstitution(BaseModel):
    """校区针对院校子项"""
    name: str
    name_it: str
    featured: bool = False


class CampusResponse(BaseModel):
    """校区数据响应"""
    id: int
    slug: str
    name: str
    subtitle: Optional[str] = None
    address: str
    description: Optional[str] = None
    courses: List[CampusCourse] = []
    institutions: List[CampusInstitution] = []
    gallery_images: List[str] = []


class TestimonialResponse(BaseModel):
    """学生反馈数据响应"""
    id: int
    campus_slug: str
    content: str
    student_name: str
    admission_info: Optional[str] = None
    avatar_url: Optional[str] = None
    sort_order: int
