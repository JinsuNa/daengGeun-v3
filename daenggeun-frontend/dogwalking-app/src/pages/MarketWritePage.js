"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Community.css"

function MarketWritePage({ isAuthenticated }) {
  const navigate = useNavigate()

  // 상태 관리
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImages, setPreviewImages] = useState([])

  // 인증 상태 확인
  useEffect(() => {
    // 로그인하지 않은 사용자는 로그인 페이지로 리디렉션
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/market/write" } })
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

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    // 최대 5개까지만 업로드 가능
    if (formData.images.length + files.length > 5) {
      setErrors({
        ...errors,
        images: "이미지는 최대 5개까지 업로드할 수 있습니다.",
      })
      return
    }

    // 이미지 미리보기 생성
    const newPreviewImages = [...previewImages]
    const newImages = [...formData.images]

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        newPreviewImages.push(e.target.result)
        setPreviewImages(newPreviewImages)
      }
      reader.readAsDataURL(file)
      newImages.push(file)
    })

    setFormData({
      ...formData,
      images: newImages,
    })

    // 에러 메시지 초기화
    if (errors.images) {
      setErrors({
        ...errors,
        images: "",
      })
    }
  }

  // 이미지 삭제 핸들러
  const handleRemoveImage = (index) => {
    const newPreviewImages = [...previewImages]
    const newImages = [...formData.images]

    newPreviewImages.splice(index, 1)
    newImages.splice(index, 1)

    setPreviewImages(newPreviewImages)
    setFormData({
      ...formData,
      images: newImages,
    })
  }

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault()

    // 유효성 검사
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요."
    }

    if (!formData.price.trim()) {
      newErrors.price = "가격을 입력해주세요."
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "유효한 가격을 입력해주세요."
    }

    if (!formData.description.trim()) {
      newErrors.description = "설명을 입력해주세요."
    }

    if (formData.images.length === 0) {
      newErrors.images = "최소 1개 이상의 이미지를 업로드해주세요."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    // 실제 구현 시에는 API 호출로 대체
    // 예시:
    /*
    const submitItem = async () => {
      try {
        // 이미지 업로드를 위한 FormData 생성
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('description', formData.description);
        
        // 이미지 파일 추가
        formData.images.forEach((image, index) => {
          formDataToSend.append(`images[${index}]`, image);
        });
        
        const response = await axios.post('http://localhost:8080/api/market/items', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.data.success) {
          navigate('/market');
        }
      } catch (error) {
        console.error('상품 등록 실패:', error);
        setErrors({
          submit: '상품 등록에 실패했습니다. 다시 시도해주세요.',
        });
      } finally {
        setIsSubmitting(false);
      }
    };
    
    submitItem();
    */

    // 임시 구현 (백엔드 연동 전까지만 사용)
    setTimeout(() => {
      setIsSubmitting(false)
      navigate("/market")
    }, 1000)
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h1 className="page-title">상품 등록</h1>
        <p className="page-description">판매할 상품 정보를 입력해주세요</p>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="card-content">
              {/* 이미지 업로드 */}
              <div className="form-group">
                <label className="form-label">상품 이미지</label>
                <div className="image-upload-grid">
                  {/* 이미지 미리보기 */}
                  {previewImages.map((preview, index) => (
                    <div key={index} className="image-upload-item">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`상품 이미지 ${index + 1}`}
                        className="image-preview"
                      />
                      <button type="button" className="image-remove" onClick={() => handleRemoveImage(index)}>
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* 이미지 업로드 버튼 */}
                  {previewImages.length < 5 && (
                    <label className="image-upload-item">
                      <span className="image-upload-icon">+</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="image-upload-input"
                        onChange={handleImageUpload}
                        multiple
                        disabled={isSubmitting}
                      />
                    </label>
                  )}
                </div>
                <p className="form-hint">최대 5장까지 업로드할 수 있습니다. (JPG, PNG 형식)</p>
                {errors.images && <p className="form-error">{errors.images}</p>}
              </div>

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
                  placeholder="상품 제목을 입력하세요"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.title && <p className="form-error">{errors.title}</p>}
              </div>

              {/* 가격 입력 필드 */}
              <div className="form-group">
                <label htmlFor="price" className="form-label">
                  가격
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-input"
                  placeholder="가격을 입력하세요"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                {errors.price && <p className="form-error">{errors.price}</p>}
              </div>

              {/* 설명 입력 필드 */}
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  설명
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  placeholder="상품 설명을 입력하세요"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={isSubmitting}
                ></textarea>
                {errors.description && <p className="form-error">{errors.description}</p>}
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
                  {isSubmitting ? "등록 중..." : "등록하기"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MarketWritePage

