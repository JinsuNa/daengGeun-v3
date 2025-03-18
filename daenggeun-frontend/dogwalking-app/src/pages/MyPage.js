"use client"

/**
 * 마이페이지 컴포넌트
 *
 * 이 컴포넌트는 사용자의 개인 정보, 반려견 정보, 작성한 게시글 등을 관리할 수 있는 기능을 제공합니다.
 * 관리자의 경우 회원 관리와 게시글 관리 기능을 제공합니다.
 *
 * @component
 * @requires React
 * @requires react-router-dom
 */

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Community.css"

function MyPage({ isAuthenticated }) {
  const navigate = useNavigate()

  // 상태 관리
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("info")
  const [adminActiveTab, setAdminActiveTab] = useState("users")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    petName: "",
    petAge: "",
    petGender: "",
    petBreed: "",
    petPersonality: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 인증 상태 확인
  useEffect(() => {
    // 로그인하지 않은 사용자는 로그인 페이지로 리디렉션
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/mypage" } })
      return
    }

    // 사용자 정보 로드 (실제로는 API에서 가져올 것)
    setTimeout(() => {
      // 로컬 스토리지에서 사용자 정보 확인
      const storedEmail = localStorage.getItem("email");
      const storedNickname = localStorage.getItem("nickname");

      if (!storedEmail) {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        navigate("/login")
        return
      }

      // 임시 사용자 데이터
      const userData = {
        id: 1,
        name: storedNickname || "사용자",  // nickname은 원래 문자열이므로 바로 할당
        email: storedEmail || "ppotto.dog@gmail.com",
        isAdmin: storedEmail === "admin@danggeun.com",
        profileImage: "/placeholder.svg?height=200&width=200",
        bio: "강아지를 사랑하는 평범한 견주입니다. 주로 한강공원에서 산책을 즐겨요.",
        phone: "010-1234-5678",
        address: "서울시 강남구",
        petName: "초코",
        petBreed: "포메라니안",
        petAge: 3,
        petGender: "남아",
        petPersonality: "활발하고 친절해요",
      }

      setUser(userData)
      setIsAdmin(userData.isAdmin)

      // 폼 데이터 초기화
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        bio: userData.bio,
        petName: userData.petName,
        petAge: userData.petAge,
        petGender: userData.petGender,
        petBreed: userData.petBreed,
        petPersonality: userData.petPersonality,
      })

      setIsLoading(false)
    }, 500)
  }, [isAuthenticated, navigate])

  // 내 게시글 데이터 (실제로는 API에서 가져올 것)
  const myPosts = [
    {
      id: 1,
      title: "강아지 산책 코스 추천해주세요",
      category: "자유게시판",
      date: "2023-10-15",
    },
    {
      id: 2,
      title: "강아지 장난감 나눔합니다",
      category: "나눔게시판",
      date: "2023-10-20",
    },
  ]

  // 관리자용 사용자 목록 (실제로는 API에서 가져올 것)
  const userList = [
    {
      id: 1,
      name: "김철수",
      email: "user1@example.com",
      joinDate: "2023-09-01",
      status: "활성",
    },
    {
      id: 2,
      name: "이영희",
      email: "user2@example.com",
      joinDate: "2023-09-05",
      status: "활성",
    },
    {
      id: 3,
      name: "박지민",
      email: "user3@example.com",
      joinDate: "2023-09-10",
      status: "정지",
    },
  ]

  // 관리자용 게시글 목록 (실제로는 API에서 가져올 것)
  const allPosts = [
    {
      id: 1,
      title: "강아지 산책 코스 추천해주세요",
      author: "김철수",
      category: "자유게시판",
      date: "2023-10-15",
      status: "정상",
    },
    {
      id: 2,
      title: "강아지 장난감 나눔합니다",
      author: "이영희",
      category: "나눔게시판",
      date: "2023-10-20",
      status: "정상",
    },
    {
      id: 3,
      title: "불법 광고 게시글",
      author: "박지민",
      category: "자유게시판",
      date: "2023-10-25",
      status: "신고됨",
    },
  ]

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  // 관리자 탭 변경 핸들러
  const handleAdminTabChange = (tab) => {
    setAdminActiveTab(tab)
  }

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 실제 구현 시에는 API 호출로 대체
    // 예시:
    /*
    const updateUserData = async () => {
      try {
        const response = await axios.put('http://localhost:8080/api/users/profile', formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (response.data.success) {
          alert('정보가 성공적으로 업데이트되었습니다.');
          setUser({
            ...user,
            ...formData,
          });
        }
      } catch (error) {
        console.error('사용자 정보 업데이트 실패:', error);
        alert('정보 업데이트에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsSubmitting(false);
      }
    };
    
    updateUserData();
    */

    // 임시 구현 (백엔드 연동 전까지만 사용)
    setTimeout(() => {
      alert("정보가 성공적으로 업데이트되었습니다.")
      setUser({
        ...user,
        ...formData,
      })
      setIsSubmitting(false)
    }, 1000)
  }

  // 회원 상세 보기 핸들러
  const handleViewUser = (userId) => {
    alert(`회원 ID: ${userId} 상세 정보 보기`)
  }

  // 게시글 상세 보기 핸들러
  const handleViewPost = (postId) => {
    alert(`게시글 ID: ${postId} 상세 정보 보기`)
  }

  // 게시글 삭제 핸들러
  const handleDeletePost = (postId) => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      alert(`게시글 ID: ${postId} 삭제 완료`)
    }
  }

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="loading">로딩 중...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <p>로그인이 필요합니다.</p>
          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            로그인 페이지로 이동
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{isAdmin ? "관리자 페이지" : "마이페이지"}</h1>

      {isAdmin ? (
        // 관리자 페이지
        <div className="tabs">
          <div className="tabs-list">
            <div
              className={`tab ${adminActiveTab === "users" ? "active" : ""}`}
              onClick={() => handleAdminTabChange("users")}
            >
              회원 관리
            </div>
            <div
              className={`tab ${adminActiveTab === "posts" ? "active" : ""}`}
              onClick={() => handleAdminTabChange("posts")}
            >
              게시글 관리
            </div>
          </div>

          <div className={`tab-content ${adminActiveTab === "users" ? "active" : ""}`}>
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">회원 목록</h2>
                <p className="card-description">전체 회원 정보를 관리합니다</p>
              </div>
              <div className="card-content">
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>가입일</th>
                        <th>상태</th>
                        <th>관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.joinDate}</td>
                          <td>
                            <span
                              className={`status-badge ${user.status === "활성" ? "status-active" : "status-inactive"}`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-outline btn-sm" onClick={() => handleViewUser(user.id)}>
                              상세
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className={`tab-content ${adminActiveTab === "posts" ? "active" : ""}`}>
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">게시글 관리</h2>
                <p className="card-description">전체 게시글을 관리합니다</p>
              </div>
              <div className="card-content">
                <div className="filters">
                  <button
                    className={`filter-button ${selectedCategory === "all" ? "active" : ""}`}
                    onClick={() => handleCategoryChange("all")}
                  >
                    전체보기
                  </button>
                  <button
                    className={`filter-button ${selectedCategory === "자유게시판" ? "active" : ""}`}
                    onClick={() => handleCategoryChange("자유게시판")}
                  >
                    자유게시판
                  </button>
                  <button
                    className={`filter-button ${selectedCategory === "나눔게시판" ? "active" : ""}`}
                    onClick={() => handleCategoryChange("나눔게시판")}
                  >
                    나눔게시판
                  </button>
                  <button
                    className={`filter-button ${selectedCategory === "소모임" ? "active" : ""}`}
                    onClick={() => handleCategoryChange("소모임")}
                  >
                    소모임
                  </button>
                  <button
                    className={`filter-button ${selectedCategory === "펫시터" ? "active" : ""}`}
                    onClick={() => handleCategoryChange("펫시터")}
                  >
                    펫시터
                  </button>
                  <button
                    className={`filter-button ${selectedCategory === "분실" ? "active" : ""}`}
                    onClick={() => handleCategoryChange("분실")}
                  >
                    분실
                  </button>
                </div>

                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>카테고리</th>
                        <th>작성일</th>
                        <th>상태</th>
                        <th>관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPosts
                        .filter((post) => selectedCategory === "all" || post.category === selectedCategory)
                        .map((post) => (
                          <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{post.category}</td>
                            <td>{post.date}</td>
                            <td>
                              <span
                                className={`status-badge ${
                                  post.status === "정상" ? "status-active" : "status-inactive"
                                }`}
                              >
                                {post.status}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="btn btn-outline btn-sm" onClick={() => handleViewPost(post.id)}>
                                  보기
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDeletePost(post.id)}>
                                  삭제
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 일반 사용자 마이페이지
        <div className="mypage-container">
          <div className="mypage-sidebar">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">프로필</h2>
              </div>
              <div className="card-content profile-content">
                <div className="profile-image-container">
                  <img src={user.profileImage || "/placeholder.svg"} alt={user.name} className="profile-image" />
                </div>
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-email">{user.email}</p>
                <p className="profile-bio">{user.bio}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary btn-block">프로필 수정</button>
              </div>
            </div>
          </div>

          <div className="mypage-content">
            <div className="tabs">
              <div className="tabs-list">
                <div className={`tab ${activeTab === "info" ? "active" : ""}`} onClick={() => handleTabChange("info")}>
                  내 정보
                </div>
                <div className={`tab ${activeTab === "dog" ? "active" : ""}`} onClick={() => handleTabChange("dog")}>
                  반려견 정보
                </div>
                <div
                  className={`tab ${activeTab === "posts" ? "active" : ""}`}
                  onClick={() => handleTabChange("posts")}
                >
                  내 게시글
                </div>
              </div>

              <div className={`tab-content ${activeTab === "info" ? "active" : ""}`}>
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-title">내 정보 수정</h2>
                    <p className="card-description">개인 정보를 수정할 수 있습니다</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="card-content">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          이름
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-input"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          이메일
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-input"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={true}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                          전화번호
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          className="form-input"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address" className="form-label">
                          주소
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="form-input"
                          value={formData.address}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="bio" className="form-label">
                          자기소개
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          className="form-textarea"
                          value={formData.bio}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        ></textarea>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                        {isSubmitting ? "저장 중..." : "저장하기"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className={`tab-content ${activeTab === "dog" ? "active" : ""}`}>
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-title">반려견 정보 수정</h2>
                    <p className="card-description">반려견 정보를 수정할 수 있습니다</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="card-content">
                      <div className="form-group">
                        <label htmlFor="petName" className="form-label">
                          이름
                        </label>
                        <input
                          type="text"
                          id="petName"
                          name="petName"
                          className="form-input"
                          value={formData.petName}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="petAge" className="form-label">
                            나이
                          </label>
                          <input
                            type="number"
                            id="petAge"
                            name="petAge"
                            className="form-input"
                            value={formData.petAge}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="petGender" className="form-label">
                            성별
                          </label>
                          <select
                            id="petGender"
                            name="petGender"
                            className="form-select"
                            value={formData.petGender}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          >
                            <option value="남아">남아</option>
                            <option value="여아">여아</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="petBreed" className="form-label">
                          견종
                        </label>
                        <input
                          type="text"
                          id="petBreed"
                          name="petBreed"
                          className="form-input"
                          value={formData.petBreed}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="petPersonality" className="form-label">
                          성격
                        </label>
                        <input
                          type="text"
                          id="petPersonality"
                          name="petPersonality"
                          className="form-input"
                          value={formData.petPersonality}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                        {isSubmitting ? "저장 중..." : "저장하기"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className={`tab-content ${activeTab === "posts" ? "active" : ""}`}>
                <div className="card">
                  <div className="card-header">
                    <h2 className="card-title">내 게시글</h2>
                    <p className="card-description">내가 작성한 게시글 목록입니다</p>
                  </div>
                  <div className="card-content">
                    {myPosts.length > 0 ? (
                      <div className="table-container">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>제목</th>
                              <th>카테고리</th>
                              <th>작성일</th>
                              <th>관리</th>
                            </tr>
                          </thead>
                          <tbody>
                            {myPosts.map((post) => (
                              <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.category}</td>
                                <td>{post.date}</td>
                                <td>
                                  <div className="action-buttons">
                                    <button className="btn btn-outline btn-sm">수정</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeletePost(post.id)}>
                                      삭제
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="empty-state">
                        <p>작성한 게시글이 없습니다</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyPage

