"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Community.css"

function CommunityWritePage({ isAuthenticated }) {
  const navigate = useNavigate()

  // 상태 관리
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 인증 상태 확인
  useEffect(() => {
    // 로그인하지 않은 사용자는 로그인 페이지로 리디렉션
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/community/write" } })
    }
  }, [isAuthenticated, navigate])

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // 카테고리 변경 핸들러
  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
    })

    // 에러 메시지 초기화
    if (errors.category) {
      setErrors({
        ...errors,
        category: "",
      })
    }
  }

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault()

    // 유효성 검사
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요."
    }

    if (!formData.category) {
      newErrors.category = "카테고리를 선택해주세요."
    }

    if (!formData.content.trim()) {
      newErrors.content = "내용을 입력해주세요."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    // 실제 구현 시에는 API 호출로 대체
    // 예시:
    /*
    const submitPost = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/posts', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.data.success) {
          navigate('/community');
        }
      } catch (error) {
        console.error('게시글 등록 실패:', error);
        setErrors({
          submit: '게시글 등록에 실패했습니다. 다시 시도해주세요.',
        });
      } finally {
        setIsSubmitting(false);
      }
    };
    
    submitPost();
    */

    // 임시 구현 (백엔드 연동 전까지만 사용)
    setTimeout(() => {
      setIsSubmitting(false)
      navigate("/community")
    }, 1000)
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h1 className="page-title">글쓰기</h1>
        <p className="page-description">커뮤니티에 새 글을 작성합니다</p>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="card-content">
              {/* 제목 입력 필드 */}
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  제목
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  placeholder="제목을 입력하세요"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.title && <p className="form-error">{errors.title}</p>}
              </div>

              {/* 카테고리 선택 필드 */}
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  카테고리
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  disabled={isSubmitting}
                >
                  <option value="">카테고리를 선택하세요</option>
                  <option value="소모임">소모임</option>
                  <option value="펫시터">펫시터</option>
                  <option value="분실">강아지 분실</option>
                  <option value="자유">자유게시판</option>
                </select>
                {errors.category && <p className="form-error">{errors.category}</p>}
              </div>

              {/* 내용 입력 필드 */}
              <div className="form-group">
                <label htmlFor="content" className="form-label">
                  내용
                </label>
                <textarea
                  id="content"
                  name="content"
                  className="form-textarea"
                  placeholder="내용을 입력하세요"
                  value={formData.content}
                  onChange={handleChange}
                  disabled={isSubmitting}
                ></textarea>
                {errors.content && <p className="form-error">{errors.content}</p>}
              </div>

              {/* 태그 입력 필드 */}
              <div className="form-group">
                <label htmlFor="tags" className="form-label">
                  태그
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  className="form-input"
                  placeholder="태그를 입력하세요 (쉼표로 구분)"
                  value={formData.tags}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <p className="form-hint">예: 소형견, 강남구, 산책모임</p>
              </div>

              {/* 제출 에러 메시지 */}
              {errors.submit && <div className="auth-alert auth-alert-error">{errors.submit}</div>}
            </div>

            <div className="card-footer">
              <div className="form-footer">
                <button type="button" className="btn btn-outline" onClick={() => navigate(-1)} disabled={isSubmitting}>
                  취소
                </button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "저장 중..." : "저장하기"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CommunityWritePage

