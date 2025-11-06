package com.learn2code.backend.auth.dto;

public class LoginRequestDTO {

    private String email;
    private String password;

    // getter 
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    //setter
    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
