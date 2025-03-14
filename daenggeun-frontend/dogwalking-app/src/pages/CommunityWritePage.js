"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Community.css"

function CommunityWritePage({ isAuthenticated }) {
  const navigate = useNavigate()

  // 상태 관리
  const [formData, setFormData] = useState({
    category: "내용유게시판",
    title: "",
    content: "",
    tags: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 인증 상태 확인
  useEffect(() => {
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
  }

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // API 호출 로직
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        navigate("/community")
      } else {
        throw new Error("게시글 등록에 실패했습니다.")
      }
    } catch (error) {
      console.error("게시글 등록 실패:", error)
      alert("게시글 등록에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="write-page">
      <div className="writeImage">
      <img src="/favicon.png" alt="" />
      <h1 className="write-title">글쓰기</h1>
      </div>
    
      <p className="write-subtitle">커뮤니티에 새 글을 작성합니다</p>

      <form onSubmit={handleSubmit} className="write-form">
        <div className="form-group">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
            disabled={isSubmitting}
          >
            <option value="내용유게시판">내용유게시판</option>
            <option value="소모임">소모임</option>
            <option value="펫시터">펫시터</option>
            <option value="분실">강아지 분실</option>
            <option value="자유">자유게시판</option>
          </select>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="제목을 입력하세요"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <textarea
            name="content"
            placeholder="내용을 입력하세요"
            value={formData.content}
            onChange={handleChange}
            className="form-textarea"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="tags"
            placeholder="태그를 입력하세요 (예: 소형견, 강남구, 산책모임)"
            value={formData.tags}
            onChange={handleChange}
            className="form-input"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate(-1)} disabled={isSubmitting}>
            취소
          </button>
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? "저장 중..." : "저장하기"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommunityWritePage
