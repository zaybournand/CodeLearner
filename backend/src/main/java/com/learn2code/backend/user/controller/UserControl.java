package com.learn2code.backend.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.GetExchange;

import com.learn2code.backend.user.model.User;
import com.learn2code.backend.user.service.userService;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private userService userService;

    //retrieve all users
    @GetMapping
    public Iterable<User> getALLUser() {
        return userService.findAll();
    }

    //create a new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userService.findByID(id).orElseThrow() -> new RuntimeException("User not found for this id::" + id);

        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());

        final User updateUser = userService.save(user);
        return ResponseEntity.ok(updateUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserId(@PathVariable Long id) {
        User user = userService.findBy(id).orElseThrow(() -> new RuntimeException("User not found for this id::" + id));
        return ResponseEntity.ok().body(user);
    }

}
