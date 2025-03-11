package com.project.daeng_geun.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UserDTO {
    private Long id;
    private String password;
    private String email;
    private String name;
    private String phone;
    private String address;
    private String location;
}
