"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/Community.css"

function CommunityPage() {
  // 상태 관리
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // 게시글 데이터 로드 (실제로는 API에서 가져올 것)
  useEffect(() => {
    // 실제 구현 시에는 API 호출로 대체
    // 예시:
    /*
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8080/api/posts');
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('게시글 데이터 가져오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
    */

    // 임시 더미 데이터
    const dummyPosts = [
      {
        id: 1,
        title: "서울 강남구 소형견 산책 모임 멤버 모집합니다",
        content:
          "안녕하세요! 강남구에서 소형견 산책 모임을 운영하고 있습니다. 매주 토요일 오전에 모여서 함께 산책해요.",
        author: "강아지맘",
        date: "2023-11-05",
        comments: 12,
        views: 234,
        category: "소모임",
        tags: ["소형견", "강남구", "산책모임"],
      },
      {
        id: 2,
        title: "주말에만 가능한 펫시터 구합니다",
        content: "다음 주 주말(11/18~19) 여행 가는 동안 우리 강아지를 돌봐줄 펫시터를 찾고 있어요.",
        author: "여행가고싶다",
        date: "2023-11-07",
        comments: 5,
        views: 120,
        category: "펫시터",
        tags: ["펫시팅", "주말", "단기"],
      },
      {
        id: 3,
        title: "강아지를 찾습니다! 분당구 정자동 부근",
        content:
          "어제 저녁 8시경 정자동 카페 앞에서 말티즈 강아지를 잃어버렸습니다. 목걸이는 파란색이고 이름은 '몽이'입니다.",
        author: "찾아주세요",
        date: "2023-11-08",
        comments: 28,
        views: 452,
        category: "분실",
        tags: ["분당구", "말티즈", "실종"],
      },
      {
        id: 4,
        title: "강아지 수제간식 만드는 법 공유해요",
        content: "우리 아이가 좋아하는 수제간식 레시피를 공유합니다. 재료도 간단하고 만들기도 쉬워요!",
        author: "간식요리사",
        date: "2023-11-06",
        comments: 15,
        views: 310,
        category: "자유",
        tags: ["수제간식", "레시피", "건강"],
      },
      {
        id: 5,
        title: "강아지 장난감 추천해주세요",
        content: "우리 강아지가 장난감을 너무 좋아하는데, 튼튼하고 재미있는 장난감 추천 부탁드려요.",
        author: "장난감수집가",
        date: "2023-11-04",
        comments: 20,
        views: 280,
        category: "자유",
        tags: ["장난감", "추천"],
      },
      {
        id: 6,
        title: "서초구 반려견 동반 카페 추천",
        content: "서초구에서 반려견과 함께 갈 수 있는 카페를 소개합니다. 넓은 공간과 맛있는 음료가 있어요.",
        author: "카페투어러",
        date: "2023-11-03",
        comments: 8,
        views: 195,
        category: "자유",
        tags: ["반려견동반", "카페", "서초구"],
      },
    ]

    // 데이터 로드 시뮬레이션
    setTimeout(() => {
      setPosts(dummyPosts)
      setFilteredPosts(dummyPosts)
      setIsLoading(false)
    }, 500)
  }, [])

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    filterPosts(tab, searchTerm)
  }

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    filterPosts(activeTab, value)
  }

  // 게시글 필터링 함수
  const filterPosts = (category, search) => {
    let filtered = [...posts]

    // 카테고리 필터링
    if (category !== "all") {
      filtered = filtered.filter((post) => post.category === category)
    }

    // 검색어 필터링
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower) ||
          (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchLower))),
      )
    }

    setFilteredPosts(filtered)
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">커뮤니티</h1>
        <Link to="/community/write" className="btn btn-primary">
          글쓰기
        </Link>
      </div>

      {/* 탭 메뉴 */}
      <div className="tabs">
        <div className="tabs-list">
          <div className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => handleTabChange("all")}>
            전체
          </div>
          <div className={`tab ${activeTab === "소모임" ? "active" : ""}`} onClick={() => handleTabChange("소모임")}>
            소모임
          </div>
          <div className={`tab ${activeTab === "펫시터" ? "active" : ""}`} onClick={() => handleTabChange("펫시터")}>
            펫시터
          </div>
          <div className={`tab ${activeTab === "분실" ? "active" : ""}`} onClick={() => handleTabChange("분실")}>
            강아지 분실
          </div>
          <div className={`tab ${activeTab === "자유" ? "active" : ""}`} onClick={() => handleTabChange("자유")}>
            자유게시판
          </div>
        </div>

        {/* 검색 바 */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder={`${activeTab === "all" ? "전체" : activeTab} 게시글 검색`}
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* 게시글 목록 */}
      {isLoading ? (
        <div className="loading">로딩 중...</div>
      ) : filteredPosts.length > 0 ? (
        <div className="card-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="card">
              <div className="card-header">
                <div className="flex-between">
                  <h2 className="card-title">
                    <Link to={`/community/post/${post.id}`}>{post.title}</Link>
                  </h2>
                  <span className={`badge badge-primary`}>{post.category}</span>
                </div>
                <div className="card-meta">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <div className="card-content">
                <p className="card-description">{post.content}</p>
                {post.tags && (
                  <div className="tags">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="card-footer">
                <div className="flex gap-4">
                  <span>조회 {post.views}</span>
                  <span>댓글 {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>검색 결과가 없습니다.</p>
        </div>
      )}

      {/* 더보기 버튼 */}
      {filteredPosts.length > 0 && (
        <div className="pagination">
          <button className="btn btn-outline">더 보기</button>
        </div>
      )}
    </div>
  )
}

export default CommunityPage

