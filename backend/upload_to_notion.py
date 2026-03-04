import urllib.request
import urllib.error
import json
import os

NOTION_TOKEN = 'ntn_Q97152520095kxLnWlW7HESMr6hFdyUumDbzkqPlKNf9XG'
DATABASE_ID = '31824312fb298011bb2bc7aba8c86353'

HEADERS = {
    'Authorization': f'Bearer {NOTION_TOKEN}',
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
}

# 我们从前端代码里提炼出的 JSON 数据
data_to_upload = [
  {
    "section": "Hero",
    "title": "在文艺复兴的摇篮\\n开启你的艺术未来",
    "subtitle": "Renaissance & Future",
    "description": "专业意大利艺术留学预科教育，连接佛罗伦萨与世界，\\n为每一位追求纯粹艺术的灵魂开启通往顶尖美院之门。",
    "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBX2o-3Zwknhnc3FI0d_ODRa2ZIYBx3Xao1MRakoBthiEGxcmqWzko7lNm_9ZivJ_Y6K11gREKYqWysm-52RRxDrNMO3ALel2uOrOeumeMQV4wIg2hF-dN7y08xHSv6JnimLa028Gp0e9KwFliD6VZzeCJx8NpOQ5ggHmEYf_ZDJwBVI_1lwBFOj29L_OBwwzF9CCZJkjPD4ig-oDmYXWyoTJYhuUEPuMKFrZz0O0VYIlNlVXInfYuK5ycMXRfkiXBxdSHG9ZqxSvCp",
    "button_primary_text": "立即了解计划",
    "button_secondary_text": "浏览作品集课程"
  },
  {
    "section": "Campuses_Florence",
    "title": "佛罗伦萨主校区",
    "subtitle": "FLORENCE CAMPUS",
    "description": "毗邻百花大教堂，沉浸式感受文艺复兴的艺术气息，提供最纯正的意式艺术教育。",
    "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBcrlHoaQVhuR1sZUrMNYRzToTbwxbMts1qxtma1i_g9q85WNXgSZdDvvMeU7dY1_Iew52-wB_xXCmPH_FI5F5fskSPuTUq7ccHFOoa73SkMz68fU2c3y7pt0nKyjiN92YqOJcs1FhcfXEsPUf-48gyBH4g9GF0iQZqdNHhlKaObZkMuLpo6DXF23JcPCMO1N8qlHfnFlVFTnJT05M3y0K7NEjDrmu2d7mS0LWmNRMwN2Zm-IUzW6p5f0EEBrmevas2E8-DbmMO7MA4"
  },
  {
    "section": "Campuses_Milan",
    "title": "米兰设计中心",
    "subtitle": "MILAN CAMPUS",
    "description": "位于全球时尚与设计之都，紧密连接产业前沿，专注于设计与时尚类专业辅导。",
    "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuAVdoCq9YPv0NsUGrE10tY3GmgtphYVSr_pc2mA4oBECUTkqekNAuvbciEsgEwC2JXifkV83iZmSp1n6QwlASayhM-e8MRj_lCidVQV0NRruSAzsjGGeMTl9NSWjfW07o3G0UcDeLvxQNqPmMHjDx9bwPlGal7TmDmf-rM5Rx3nj_cedFTTc8ww8_F-lUcVgSV0g9G99B8K1uhGvjfsiNDyxcRS8Hy83M3l7x36n4fZFWwSTK2HK5RaIlsAgJW8q2HWIjY52w4GLZOA"
  },
  {
    "section": "Curriculum_01",
    "title": "艺术预科 Art Foundation",
    "subtitle": "01",
    "description": "零基础或基础薄弱学生，建立完整的西方艺术思维体系与基础技能。\\n\\nDuration: 6-8 个月\\nMethodology: 工坊式教学\\nCore Curriculum: 艺术史与现当代艺术理论, 基础造型与色彩实验, 创意思维与材料探索, 意大利语艺术词汇强化"
  },
  {
    "section": "Curriculum_02",
    "title": "升学辅导 Admission Coaching",
    "subtitle": "02",
    "description": "针对目标院校要求，完成高质量作品集创作及入学面试准备。\\n\\nDuration: 3-6 个月\\nMethodology: 1对1导师制\\nCore Curriculum: 个人艺术项目深度开发, 作品集排版与视觉呈现, 教授模拟面试与作品答辩, 院校申请与注册全程指导"
  },
  {
    "section": "Faculty_1",
    "title": "Prof. Alessandro",
    "subtitle": "前佛罗伦萨美院教授 / 雕塑系主任",
    "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBWpMeF83DNVODSolo9AT4t1LA9APKW8yU7TN9AASU9uqrzlnGy2oMY8QsQtw6Rhi2g5aKe1TfDCUKsORUZcuVAGetSgEF59JbQPjSACPPGQt0_SDsj6TdnEGIZBbpwNncGzTUWYrY6p7mUpYOdC2QtuLM3nnRLq9nv2o-TSmBJlVcIIEX_1gbbOtBeDFdcYTBtOkPcqlvNB99vkr9RHOaR_hy6RIW3__eECse0H7cfarfLPf7eBP7jGiOpZO56Bdt6Gy4kQFIgIru9"
  },
  {
    "section": "Faculty_2",
    "title": "Dr. Beatrice",
    "subtitle": "米兰理工大学建筑学博士 / 独立设计师",
    "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBjgxnWEBdrBYTCanFJ7bbbqe43j3X3i9jXQTqohTCfxPXX9WzK_wu_t3ni0Kw5YQhgs6LikP_akBpx198mxBgkvi3JoWFkocB6mT1mQI-ypYBeu0G_X4WP70_UC3XtE6onGmpuJJJLxfQDqdBM3mmSCfKDwE2cfQiGp1aVqqBiREvlg6albCGEaKAew96_Td5SKNIT1nuGkbD_1qTkDEjzBtFBJ-1DECGBdEUdqDDgFCMFp6ykraPDUSxXUVMDYGKRLjDjAIHO10SC"
  },
  {
    "section": "Faculty_3",
    "title": "Giulia M.",
    "subtitle": "马兰欧尼时装学院资深导师 / 品牌主理人",
    "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBO_cePkZLJ38MgRYiLQqtsnDkSCCdWGg2iIWpSBjCGz1O5ygFTjKh1El9M5suvNuwHCQOTZ_p4id7qxp-qxFFQcK20-iwGQ9ZHi_jrLFhkE4YgGCN8kkiHxjq4l29-SDA85I3zKkJPFSuKBojMpnWv3u94GzkPITxX2YNspXbNE8TjV7UZ2_DOvdG2WDqQx_V0K4WS_mAhmnc8-61t9ybnAxi_oXYxZXx7knknaGDZ1JufnyQz8T4hCrhlnyhyCUB8PEsZ3y9w8sxs"
  }
]

def create_notion_page(item):
    url = 'https://api.notion.com/v1/pages'
    
    # 构建 properties
    properties = {
        "Title": {
            "title": [
                {
                    "text": {
                        "content": item.get("section", "")
                    }
                }
            ]
        }
    }
    
    if "subtitle" in item:
        properties["Subtitle"] = {
            "rich_text": [
                {
                    "text": {
                        "content": item["subtitle"]
                    }
                }
            ]
        }
        
    if "title" in item:
        properties["Heading"] = {
            "rich_text": [
                {
                    "text": {
                        "content": item["title"]
                    }
                }
            ]
        }
        
    if "description" in item:
        properties["Description"] = {
            "rich_text": [
                {
                    "text": {
                        "content": item["description"]
                    }
                }
            ]
        }
        
    if "image_url" in item:
        properties["Image URL"] = {
            "url": item["image_url"]  # 修改为 URL 类型
        }
        
    if "button_primary_text" in item:
        properties["Button Primary"] = {
            "rich_text": [
                {
                    "text": {
                        "content": item["button_primary_text"]
                    }
                }
            ]
        }
        
    if "button_secondary_text" in item:
        properties["Button Secondary"] = {
            "rich_text": [
                {
                    "text": {
                        "content": item["button_secondary_text"]
                    }
                }
            ]
        }

    data = {
        "parent": { "database_id": DATABASE_ID },
        "properties": properties
    }
    
    req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers=HEADERS, method='POST')
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            print(f"✅ 成功导入区块: {item.get('section')}")
            return True
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"❌ 导入失败: {item.get('section')} | 状态码: {e.code} | 错误信息: {error_body}")
        return False
    except Exception as e:
        print(f"❌ 导入出错: {item.get('section')} | 错误信息: {str(e)}")
        return False

def main():
    print(f"开始批量上传，共计 {len(data_to_upload)} 条记录...")
    success_count = 0
    for item in data_to_upload:
        if create_notion_page(item):
            success_count += 1
            
    print(f"\\n🎉 上传完毕！成功: {success_count}/{len(data_to_upload)}")

if __name__ == '__main__':
    main()
