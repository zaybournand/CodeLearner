package com.learn2code.backend.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learn2code.backend.auth.dto.LoginRequestDTO;
import com.learn2code.backend.auth.dto.LoginResponseDTO;
import com.learn2code.backend.auth.service.AuthService;
import com.learn2code.backend.user.dto.UserRequestDTO;
import com.learn2code.backend.user.dto.UserResponseDTO;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserRequestDTO request) {
        UserResponseDTO response = authService.registerNewUser(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        LoginResponseDTO response = authService.loginUser(request);
        return ResponseEntity.ok(response);
    }

}
