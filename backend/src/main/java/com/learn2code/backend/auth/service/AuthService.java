package com.learn2code.backend.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn2code.backend.auth.dto.LoginRequestDTO;
import com.learn2code.backend.auth.dto.LoginResponseDTO;
import com.learn2code.backend.auth.jwt.JWTService;
import com.learn2code.backend.user.dto.UserRequestDTO;
import com.learn2code.backend.user.dto.UserResponseDTO;
import com.learn2code.backend.user.model.User;
import com.learn2code.backend.user.service.UserService;

@Service
public class AuthService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserService userService;

    public LoginResponseDTO loginUser(LoginRequestDTO loginRequestDTO) {

        User user = userService.validateLogin(
                loginRequestDTO.getEmail(),
                loginRequestDTO.getPassword()
        );

        // Generate JWT after validation
        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponseDTO(user.getId(), user.getEmail(), user.getUsername(), token, user.getRole());
    }

    public UserResponseDTO registerNewUser(UserRequestDTO request) {
        return userService.createUser(request);
    }

}
