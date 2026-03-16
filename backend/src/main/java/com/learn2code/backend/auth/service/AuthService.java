package com.learn2code.backend.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn2code.backend.auth.dto.LoginRequestDTO;
import com.learn2code.backend.auth.dto.LoginResponseDTO;
import com.learn2code.backend.user.dto.UserRequestDTO;
import com.learn2code.backend.user.dto.UserResponseDTO;
import com.learn2code.backend.user.model.User;
import com.learn2code.backend.user.service.UserService;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    public LoginResponseDTO loginUser(LoginRequestDTO loginRequestDTO) {

        // 1. Fetch the REAL database User object using the method we just made
        User user = userService.findByEmail(loginRequestDTO.getEmail());

        // 2. Build the DTO to send to Next.js
        return new LoginResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                user.getRole()
        );
    }

    public UserResponseDTO registerNewUser(UserRequestDTO request) {
        return userService.createUser(request);
    }
}
