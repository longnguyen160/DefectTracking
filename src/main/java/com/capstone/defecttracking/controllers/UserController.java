package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.enums.Roles;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.Token.JwtAuthentication;
import com.capstone.defecttracking.models.Token.JwtAuthenticationResponse;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserDetailsSecurity;
import com.capstone.defecttracking.models.User.UserProfile;
import com.capstone.defecttracking.models.User.UserProfileRequest;
import com.capstone.defecttracking.security.CurrentUser;
import com.capstone.defecttracking.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.capstone.defecttracking.repositories.User.UserRepository;
import com.capstone.defecttracking.repositories.User.UserRepositoryCustom;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserRepositoryCustom userRepositoryCustom;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    private SimpMessagingTemplate template;

    @Inject
    public UserController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                user.getEmail(),
                user.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        JwtAuthentication jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        ServerResponse serverResponse;

        if (userRepositoryCustom.findByEmail(user.getEmail()) != null) {
            serverResponse = new ServerResponse(false, "Email is existed!!!");

            return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
        } else if (userRepositoryCustom.doesUsernameExisted(user.getUsername())) {
            serverResponse = new ServerResponse(false, "Username is existed!!!");

            return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRoles(String.valueOf(Roles.USER));
        userRepository.save(user);

        serverResponse = new ServerResponse(true, "User registered successfully");

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("/currentUser")
    public User getCurrentUser(@CurrentUser UserDetailsSecurity currentUser) {
        User user = userRepositoryCustom.findById(currentUser.getId());

        return new User(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getRoles(), user.getProfile());
    }

    @GetMapping("/loadAllUsers")
    public List<User> getAllUsers(@RequestParam(value = "input") String input) {
        return userRepositoryCustom.getAllUsers(input);
    }

    @PostMapping("/updateProfile")
    public ResponseEntity<?> updateProfile(@RequestBody UserProfileRequest profileRequest) {
        ServerResponse serverResponse;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsSecurity userDetailsSecurity = (UserDetailsSecurity) authentication.getPrincipal();

        if ((profileRequest.getEmail() == null && profileRequest.getProfile() == null)
            || !userRepositoryCustom.updateUserProfile(userDetailsSecurity.getId(), profileRequest.getProfile(), profileRequest.getEmail())) {
            serverResponse = new ServerResponse(false, "Update failed!!!");

            return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);

        }

        serverResponse = new ServerResponse(true, "Update profile successfully");

        template.convertAndSend("/topic/currentUser", serverResponse);

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }
}
