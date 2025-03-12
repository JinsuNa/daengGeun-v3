package com.project.daeng_geun.dto;


import com.project.daeng_geun.entity.Pet;
import com.project.daeng_geun.entity.User;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchDTO {

    private Long id;
    private Long likeCount;
    private String name;
    private String breed;
    private Integer age;
    private String gender;
    private String personality;
    private String image;
    private String location;


    public static MatchDTO fromEntity(User user)
    {
        Pet pet = user.getPet();

        return MatchDTO.builder()
                .id(user.getId())
                .likeCount(user.getLikeCount())
                .name(pet.getName())
                .breed(pet.getBreed())
                .age(pet.getAge())
                .gender(pet.getGender())
                .personality(pet.getPersonality())
                .image(pet.getImage())
                .location(user.getLocation())
                .build();
    }

}
