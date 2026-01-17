package com.learn2code.backend.auth.dto;

public class LoginResponseDTO {

    private final Long id;
    private final String email;
    private final String username;
    private final String token;
    private final String role;

    public LoginResponseDTO(Long id, String email, String username, String token, String role) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.token = token;
        this.role = role;

    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

}
