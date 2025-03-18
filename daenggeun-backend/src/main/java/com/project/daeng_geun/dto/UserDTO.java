package com.project.daeng_geun.dto;

import com.project.daeng_geun.entity.User;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserDTO {
    private Long id;
    private String email;
    private String password;
    private String nickname;
    private String phone;
    private String address;
    private String location;
    private String petName;
    private String petBreed;
    private Integer petAge;
    private String petGender;
    private String petPersonality;
    private String image;

    public static UserDTO fromEntity(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .password(user.getPassword())
                .nickname(user.getNickname())
                .address(user.getAddress())
                .location(user.getLocation())
                .image(user.getImage())
                .petName(user.getPetName())
                .petBreed(user.getPetBreed())
                .petAge(user.getPetAge())
                .petGender(user.getPetGender())
                .petPersonality(user.getPetPersonality())
                .build();
    }
}
