import axios from "axios"

const API_BASE_URL="http://localhost:8080/api/match"

// 랜덤한 카드 두개 가져오기
export const getRandomUsers =() => axios.get(`${API_BASE_URL}/random`)
// 선택한 댕댕이 like +1씩 증가시키기
export const likeCount = (id) => axios.post(`${API_BASE_URL}/like/${id}`)
// like가 많은 순서대로 3개 출력
export const topLiked = () => axios.get(`${API_BASE_URL}/top-liked`)