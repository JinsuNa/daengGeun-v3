package com.project.daeng_geun.dto;



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

        return MatchDTO.builder()
                .id(user.getId())
                .likeCount(user.getLikeCount())
                .name(user.getNickname())
                .breed(user.getPetBreed())
                .age(user.getPetAge())
                .gender(user.getPetGender())
                .personality(user.getPetPersonality())
                .image(user.getImage())
                .location(user.getLocation())
                .build();
    }

}
