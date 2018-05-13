package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.capstone.defecttracking.repositories.User.UserRepository;
import com.capstone.defecttracking.repositories.User.UserRepositoryCustom;

@RestController
public class UserController {

    @Autowired
    UserRepositoryCustom userRepositoryCustom;
    @Autowired
    UserRepository userRepository;

    @RequestMapping(method = RequestMethod.POST, value = "/signin")
    @CrossOrigin(origins = "http://localhost:3000")
    public boolean login(@RequestBody User user) {
        return userRepositoryCustom.login(user);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/signup")
    @CrossOrigin(origins = "http://localhost:3000")
    public User signUp(@RequestBody User user) {
        return userRepository.save(user);
    }
}
