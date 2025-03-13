package com.project.daeng_geun.service;

import com.project.daeng_geun.dto.LoginRequestDTO;
import com.project.daeng_geun.dto.LoginResponseDTO;
import com.project.daeng_geun.dto.UserDTO;
import com.project.daeng_geun.entity.User;
import com.project.daeng_geun.repository.UserRepository;
import com.project.daeng_geun.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final S3Service s3Service;

    // 🔹 회원가입 로직
    public ResponseEntity<Map<String, Object>> register(UserDTO userDTO, MultipartFile image) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            response.put("success", false);
            response.put("message", "이미 사용 중인 이메일입니다.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        String imageUrl = (image != null) ? s3Service.uploadFile(image) : null;

        // 🔹 사용자 저장
        User user = User.builder()
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .nickname(userDTO.getUsername())
                .address(userDTO.getAddress())
                .location(userDTO.getLocation())
                .petName(userDTO.getPetName())
                .petBreed(userDTO.getPetBreed())
                .petAge(userDTO.getPetAge())
                .petGender(userDTO.getPetGender())
                .petPersonality(userDTO.getPetPersonality())
                .image(imageUrl)
                .build();

        userRepository.save(user);

        // 🔹 JWT 토큰 생성
        String token = jwtUtil.generateToken(user.getEmail(), user.getId());

        // 🔹 JSON 형식으로 응답 생성
        response.put("success", true);
        response.put("message", "회원가입 성공!");
        response.put("user", user);
        response.put("token", token);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 🔹 로그인 로직
    public ResponseEntity<Map<String, Object>> login(LoginRequestDTO loginRequest) {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
        if (userOptional.isEmpty()) {
            response.put("success", false);
            response.put("message", "이메일 또는 비밀번호가 일치하지 않습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            response.put("success", false);
            response.put("message", "이메일 또는 비밀번호가 일치하지 않습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getId());

        // ✅ JSON 응답 생성
        response.put("success", true);
        response.put("message", "로그인 성공!");
        response.put("userId", user.getId());
        response.put("email", user.getEmail());
        response.put("nickname", user.getNickname());
        response.put("token", token);

        return ResponseEntity.ok(response);
    }

    // 🔹 모든 사용자 조회
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 🔹 특정 사용자 조회
    public ResponseEntity<User> getUserById(Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // 🔹 사용자 정보 수정
    public ResponseEntity<User> updateUser(Long id, UserDTO updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setEmail(updatedUser.getEmail());
            user.setNickname(updatedUser.getUsername());
            user.setAddress(updatedUser.getAddress());
            user.setLocation(updatedUser.getLocation());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // 🔹 사용자 삭제
    public ResponseEntity<Void> deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
