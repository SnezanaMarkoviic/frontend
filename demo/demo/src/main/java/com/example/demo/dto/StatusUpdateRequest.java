package com.example.demo.dto;

public class StatusUpdateRequest {
    private String status;
    private Long userId;

    public String getStatus() {return status;}
    public void setStatus(String status) {this.status = status;}

    public Long getUserId() {return userId;}
    public void setUserId(Long userId) {this.userId = userId;}
}