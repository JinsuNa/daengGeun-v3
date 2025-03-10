"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "../styles/Community.css"

function MarketItemPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // 상태 관리
  const [item, setItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // 상품 데이터 로드 (실제로는 API에서 가져올 것)
  useEffect(() => {
    // 실제 구현 시에는 API 호출로 대체
    // 예시:
    /*
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:8080/api/market/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('상품 데이터 가져오기 실패:', error);
        setError('상품 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItem();
    */

    // 임시 구현 (백엔드 연동 전까지만 사용)
    setTimeout(() => {
      // 임시 상품 데이터
      const dummyItem = {
        id: Number.parseInt(id),
        title: "로얄 캐닌 미니 인도어 시니어 3키로 2개(가격내림)",
        price: 72000,
        location: "서울 역북동",
        description: `며칠전에 배송 받았는데 잘못 주문했어요...
3키로짜리 두개네 하나를 묶어버려서 반품이 안될것같아 판매합니다ㅠㅠ
지퍼팩으로 되어있어 새거나 다름없어요...
한번도 먹이지 않았습니다당🤣🤣🤣
구매가보다 저렴하게 내놔요😇😊
가까우면 가져다 드릴게요!`,
        image: "/placeholder.svg?height=600&width=600",
        createdAt: "2024-03-07",
        seller: {
          name: "취미있는사람",
          avatar: "/placeholder.svg?height=100&width=100",
          temperature: 43.0,
        },
      }

      setItem(dummyItem)
      setIsLoading(false)
    }, 500)
  }, [id])

  // 채팅하기 버튼 클릭 핸들러
  const handleChatClick = () => {
    navigate(`/chat?seller=${item.seller.name}`)
  }

  // 가격 포맷팅 함수
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  if (isLoading) {
    return <div className="page-container">로딩 중...</div>
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-state">
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate("/market")}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="page-container">
        <div className="error-state">
          <p>상품을 찾을 수 없습니다.</p>
          <button className="btn btn-primary" onClick={() => navigate("/market")}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="product-detail">
        {/* 상품 이미지 */}
        <div>
          <img src={item.image || "/placeholder.svg"} alt={item.title} className="product-detail-image" />
        </div>

        {/* 상품 정보 */}
        <div>
          {/* 판매자 정보 */}
          <div className="seller-info">
            <div className="seller-avatar">
              <img src={item.seller.avatar || "/placeholder.svg"} alt={item.seller.name} />
            </div>
            <div className="seller-details">
              <p className="seller-name">{item.seller.name}</p>
              <p className="seller-location">{item.location}</p>
            </div>
            <div className="seller-rating">
              <span className="seller-temperature">{item.seller.temperature}°C</span>
              <span className="temperature-label">매너온도</span>
            </div>
          </div>

          {/* 상품 상세 정보 */}
          <div className="product-detail-header">
            <h1 className="product-detail-title">{item.title}</h1>
            <p className="product-detail-price">{formatPrice(item.price)}원</p>
            <div className="product-detail-meta">
              <div className="product-location">
                <span className="product-location-icon">📍</span>
                <span>{item.location}</span>
              </div>
              <span>•</span>
              <span>등록일: {item.createdAt}</span>
            </div>
          </div>

          {/* 상품 설명 */}
          <div className="product-detail-description">{item.description}</div>

          {/* 액션 버튼 */}
          <div className="action-buttons">
            <button className="action-button action-button-primary" onClick={handleChatClick}>
              <span className="action-button-icon">💬</span>
              채팅하기
            </button>
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 (모바일용) */}
      <div className="fixed-bottom">
        <div className="fixed-bottom-content">
          <button className="action-button action-button-primary" onClick={handleChatClick}>
            <span className="action-button-icon">💬</span>
            채팅하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default MarketItemPage

