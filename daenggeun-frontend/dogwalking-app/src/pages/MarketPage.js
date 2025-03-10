"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../styles/Community.css"

function MarketPage() {
  // 상태 관리
  const [items, setItems] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredItems, setFilteredItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // 상품 데이터 로드 (실제로는 API에서 가져올 것)
  useEffect(() => {
    // 실제 구현 시에는 API 호출로 대체
    // 예시:
    /*
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:8080/api/market/items');
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error('상품 데이터 가져오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItems();
    */

    // 임시 더미 데이터
    const dummyItems = [
      {
        id: 1,
        title: "강아지 장난감 세트",
        price: 15000,
        location: "서울 강남구",
        image: "/placeholder.svg?height=300&width=300",
        createdAt: "2024-03-07",
        seller: {
          name: "멍멍이맘",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 2,
        title: "강아지 사료 팝니다",
        price: 30000,
        location: "서울 서초구",
        image: "/placeholder.svg?height=300&width=300",
        createdAt: "2024-03-07",
        seller: {
          name: "초코파파",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 3,
        title: "강아지 옷 (S 사이즈)",
        price: 12000,
        location: "서울 송파구",
        image: "/placeholder.svg?height=300&width=300",
        createdAt: "2024-03-06",
        seller: {
          name: "댕댕이집사",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 4,
        title: "강아지 하네스 (미사용)",
        price: 18000,
        location: "서울 마포구",
        image: "/placeholder.svg?height=300&width=300",
        createdAt: "2024-03-05",
        seller: {
          name: "산책러버",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 5,
        title: "강아지 캐리어 (중형견용)",
        price: 45000,
        location: "서울 용산구",
        image: "/placeholder.svg?height=300&width=300",
        createdAt: "2024-03-04",
        seller: {
          name: "여행가자",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 6,
        title: "강아지 목욕 용품 세트",
        price: 22000,
        location: "서울 강동구",
        image: "/placeholder.svg?height=300&width=300",
        createdAt: "2024-03-03",
        seller: {
          name: "깨끗해요",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 7,
        title: "강아지 간식 모음",
        price: 10000,
        location: "서울 노원구",
        image: "/placeholder.svg?height=300&width=300",
        createdAt: "2024-03-02",
        seller: {
          name: "간식맘",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        id: 8,
        title: "강아지 자동급식기",
        price: 35000,
        location: "서울 중랑구",
        image: "/placeholder.svg?height=300&width=300",
        createdAt: "2024-03-01",
        seller: {
          name: "편리해요",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
    ]

    // 데이터 로드 시뮬레이션
    setTimeout(() => {
      setItems(dummyItems)
      setFilteredItems(dummyItems)
      setIsLoading(false)
    }, 500)
  }, [])

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    // 검색어 필터링
    if (value) {
      const searchLower = value.toLowerCase()
      const filtered = items.filter(
        (item) => item.title.toLowerCase().includes(searchLower) || item.location.toLowerCase().includes(searchLower),
      )
      setFilteredItems(filtered)
    } else {
      setFilteredItems(items)
    }
  }

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">댕근마켓</h1>
        <Link to="/market/write" className="btn btn-primary">
          글쓰기
        </Link>
      </div>

      {/* 검색 바 */}
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="찾으시는 물품을 검색해보세요"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* 상품 목록 */}
      {isLoading ? (
        <div className="loading">로딩 중...</div>
      ) : filteredItems.length > 0 ? (
        <div className="product-grid">
          {filteredItems.map((item) => (
            <Link key={item.id} to={`/market/${item.id}`} className="product-card">
              <div className="product-image-container">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="product-image" />
              </div>
              <div className="product-info">
                <h3 className="product-title">{item.title}</h3>
                <p className="product-price">{formatPrice(item.price)}원</p>
                <div className="product-meta">
                  <div className="product-location">
                    <span className="product-location-icon">📍</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>검색 결과가 없습니다.</p>
        </div>
      )}

      {/* 더보기 버튼 */}
      {filteredItems.length > 0 && (
        <div className="pagination">
          <button className="btn btn-outline">더 보기</button>
        </div>
      )}
    </div>
  )
}

export default MarketPage

