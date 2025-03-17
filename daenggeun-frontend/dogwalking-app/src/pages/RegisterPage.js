"use client"

import { useState, useEffect, useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/AuthPages.css"
import axios from "axios"
import { isValidPassword, doPasswordsMatch } from "../utils/validation"

// 주소 검색 모달 컴포넌트
function AddressModal({ isOpen, onClose }) {
  const openPostcode = useCallback(() => {
    new window.daum.Postcode({
      oncomplete: (data) => {
        const fullAddress = data.roadAddress || data.jibunAddress
        const districtMatch = fullAddress.match(/([가-힣]+구)/)
        const district = districtMatch ? districtMatch[1] : ""

        onClose({ address: fullAddress, location: district })
      },
    }).open()
  }, [onClose])

  useEffect(() => {
    let script
    if (isOpen) {
      // 카카오 주소 검색 API 스크립트 로드
      script = document.createElement("script")
      script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
      script.async = true
      script.onload = openPostcode
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
    return () => {
      if (script) {
        document.body.removeChild(script)
      }
    }
  }, [isOpen, openPostcode])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">주소 검색</h3>
          <button className="modal-close" onClick={() => onClose(null)}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div id="postcode-container" style={{ height: "400px" }}></div>
        </div>
      </div>
    </div>
  )
}

function RegisterPage({ onLogin }) {
  const navigate = useNavigate()

  // 상태 관리
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "", // 백엔드에서 사용하는 필드명으로 변경
    username: "", // 백엔드에서는 nickname으로 사용
    phone: "",
    address: "",
    location: "",
  })

  const [petData, setPetData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "남아",
    personality: "",
  })

  const [validation, setValidation] = useState({
    email: { isValid: false, message: "" },
    password: { isValid: false, message: "" },
    repeatPassword: { isValid: false, message: "" },
    formIsValid: false,
  })

  const [profileImage, setProfileImage] = useState(null)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState("")
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (formData.password) {
      setValidation((prev) => ({
        ...prev,
        password: {
          isValid: isValidPassword(formData.password),
          message: isValidPassword(formData.password)
            ? "사용 가능한 비밀번호입니다."
            : "비밀번호는 6~12자리로 입력해주세요.",
        },
      }))
    }

    if (formData.repeatPassword) {
      setValidation((prev) => ({
        ...prev,
        repeatPassword: {
          isValid: doPasswordsMatch(formData.password, formData.repeatPassword),
          message: doPasswordsMatch(formData.password, formData.repeatPassword)
            ? "비밀번호가 일치합니다."
            : "비밀번호가 일치하지 않습니다.",
        },
      }))
    }
  }, [formData.password, formData.repeatPassword])

  // 전체 폼 유효성 검사
  useEffect(() => {
    const isFormValid =
      formData.email.trim() !== "" &&
      formData.username.trim() !== "" &&
      validation.password.isValid &&
      validation.repeatPassword.isValid

    setValidation((prev) => ({ ...prev, formIsValid: isFormValid }))
  }, [formData, validation.password.isValid, validation.repeatPassword.isValid])

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

    // 회원가입 에러 메시지 초기화
    if (registerError) {
      setRegisterError("")
    }
  }

  // 펫 정보 변경 핸들러
  const handlePetChange = (e) => {
    const { name, value } = e.target
    setPetData({
      ...petData,
      [name]: value,
    })
  }

  // 주소 검색 모달 열기
  const handleOpenAddressModal = () => {
    setIsAddressModalOpen(true)
  }

  // 주소 선택 완료 핸들러
  const handleAddressComplete = (addressData) => {
    if (addressData) {
      setFormData({
        ...formData,
        address: addressData.address,
        location: addressData.location,
      })
    }
    setIsAddressModalOpen(false)
  }

  // 파일 입력 핸들러
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0])
    }
  }

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 유효성 검사
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요."
    }

    if (!formData.username.trim()) {
      newErrors.username = "닉네임을 입력해주세요."
    }

    if (!validation.password.isValid) {
      newErrors.password = "비밀번호는 6~12자리로 입력해주세요."
    }

    if (!validation.repeatPassword.isValid) {
      newErrors.repeatPassword = "비밀번호가 일치하지 않습니다."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      // 백엔드 API 호출을 위한 데이터 준비
      const userData = {
        email: formData.email,
        password: formData.password,
        repeatPassword: formData.repeatPassword,
        username: formData.username, // 백엔드에서는 nickname으로 사용
        phone: formData.phone,
        address: formData.address,
        location: formData.location,
      }

      // Spring Boot 백엔드 API 호출
      const response = await axios.post("/api/user/register", userData)

      if (response.data === "회원가입 성공") {
        // 회원가입 성공 시 로그인 페이지로 이동
        alert("회원가입이 완료되었습니다. 로그인해주세요.")
        navigate("/login")
      } else {
        setRegisterError(response.data || "회원가입에 실패했습니다. 다시 시도해주세요.")
      }
    } catch (error) {
      setRegisterError(error.response?.data || "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <div className="auth-tabs-list">
            <Link to="/login" className="auth-tab">
              로그인
            </Link>
            <div className="auth-tab active">회원가입</div>
          </div>
        </div>

        <div className="auth-tab-content active">
          <div className="auth-card">
            <div className="auth-card-header">
              <h2 className="auth-card-title">회원가입</h2>
              <p className="auth-card-description">댕근의 새로운 회원이 되어보세요.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-card-content">
                {registerError && <div className="auth-alert auth-alert-error">{registerError}</div>}

                {/* 이메일 입력 필드 */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>

                {/* 닉네임 입력 필드 */}
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    닉네임
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className={`form-input ${errors.username ? "error" : ""}`}
                    placeholder="닉네임"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {errors.username && <p className="form-error">{errors.username}</p>}
                </div>

                {/* 비밀번호 입력 필드 */}
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-input ${errors.password ? "error" : formData.password && validation.password.isValid ? "valid" : ""}`}
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {formData.password && (
                    <p className={`${validation.password.isValid ? "form-success" : "form-error"}`}>
                      {validation.password.message}
                    </p>
                  )}
                  <p className="form-hint">비밀번호는 6~12자리로 입력해주세요.</p>
                </div>

                {/* 비밀번호 확인 필드 */}
                <div className="form-group">
                  <label htmlFor="repeatPassword" className="form-label">
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    id="repeatPassword"
                    name="repeatPassword"
                    className={`form-input ${errors.repeatPassword ? "error" : formData.repeatPassword && validation.repeatPassword.isValid ? "valid" : ""}`}
                    placeholder="비밀번호 확인"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  {formData.repeatPassword && (
                    <p className={`${validation.repeatPassword.isValid ? "form-success" : "form-error"}`}>
                      {validation.repeatPassword.message}
                    </p>
                  )}
                </div>

                {/* 전화번호 입력 필드 */}
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    전화번호 (선택)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                {/* 주소 검색 필드 */}
                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    주소 (선택)
                  </label>
                  <div className="address-input-group">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="form-input"
                      placeholder="주소 검색을 클릭하세요"
                      value={formData.address}
                      readOnly
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="address-search-button"
                      onClick={handleOpenAddressModal}
                      disabled={isLoading}
                    >
                      🔍 검색
                    </button>
                  </div>
                  {formData.location && (
                    <p className="form-hint">지역: {formData.location} (자동으로 설정되었습니다)</p>
                  )}
                </div>

                {/* 프로필 이미지 업로드 */}
                <div className="form-group">
                  <label htmlFor="profileImage" className="form-label">
                    프로필 사진 (선택)
                  </label>
                  <div className="profile-upload">
                    <div className="profile-image-preview">
                      {profileImage ? (
                        <img
                          src={URL.createObjectURL(profileImage) || "/placeholder.svg"}
                          alt="프로필 미리보기"
                          className="profile-image"
                        />
                      ) : (
                        <span className="profile-placeholder">👤</span>
                      )}
                    </div>
                    <div className="profile-upload-input">
                      <input
                        type="file"
                        id="profileImage"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={isLoading}
                        className="form-input"
                      />
                      <p className="profile-upload-hint">JPG, PNG 형식의 이미지를 업로드해주세요.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="auth-card-footer">
                <button
                  type="submit"
                  className="auth-button auth-button-primary"
                  disabled={isLoading || !validation.formIsValid}
                >
                  {isLoading ? "가입 중..." : "회원가입"}
                </button>

                <p className="auth-footer-text">
                  이미 계정이 있으신가요?{" "}
                  <Link to="/login" className="auth-link">
                    로그인
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* 주소 검색 모달 */}
      <AddressModal isOpen={isAddressModalOpen} onClose={handleAddressComplete} />
    </div>
  )
}

export default RegisterPage

