package com.project.daeng_geun.service;


import com.project.daeng_geun.dto.UserDTO;
import com.project.daeng_geun.entity.User;
import com.project.daeng_geun.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    //    회원가입
    public String registerUser(UserDTO userDTO) {

//        비밀번호 확인
        if (!userDTO.getPassword().equals(userDTO.getRepeatPassword())) {
            return "비밀번호가 일치하지 않습니다.";
        }
//        이메일 중복 확인
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            return "이미 사용 중인 이메일 입니다.";
        }
//        닉네임 중복 확인
        if (userRepository.existsByNickname(userDTO.getUsername())) {
            return "이미 사용 중인 닉네임 입니다.";
        }

        User user = userDTO.toEntity();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "회원가입 성공";
    }

    //    로그인
    public Map<String,Object> loginUser(UserDTO userDTO) {
        Optional<User> optionalUser = userRepository.findByEmail(userDTO.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("userId", user.getId());
                response.put("email", user.getEmail());
                response.put("nickname", user.getNickname());

                return response;
            }
        }
        return new HashMap<>();
    }

}
