package com.project.daeng_geun.dto;

import com.project.daeng_geun.entity.Match;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class ChatDTO {
    private Long id;
    private SenderReceiverDTO sender;
    private SenderReceiverDTO receiver;
    private String message;
    private String status;
    private LocalDateTime createdAt;

    public static ChatDTO fromEntity(Match match) {
        return ChatDTO.builder()
                .id(match.getId())
                .sender(SenderReceiverDTO.fromEntity(match.getSender()))
                .receiver(SenderReceiverDTO.fromEntity(match.getReceiver()))
                .message(match.getMessage())
                .status(match.getStatus())
                .createdAt(match.getCreatedAt())
                .build();
    }
}