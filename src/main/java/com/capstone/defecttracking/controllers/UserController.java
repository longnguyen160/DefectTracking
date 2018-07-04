package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.enums.Roles;
import com.capstone.defecttracking.models.Filter.Filter;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.capstone.defecttracking.models.Token.JwtAuthentication;
import com.capstone.defecttracking.models.Token.JwtAuthenticationResponse;
import com.capstone.defecttracking.models.User.*;
import com.capstone.defecttracking.repositories.Filter.FilterRepository;
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
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsCriteria;

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

    @Autowired
    FilterRepository filterrepository;

    private SimpMessagingTemplate template;

    @Inject
    public UserController(SimpMessagingTemplate template) {
        this.template = template;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody User user) {
        ServerResponse serverResponse;
        if (user.isIsactive()) {
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
                   serverResponse = new ServerResponse(false, "Your account has been locked!!!");

        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);

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
        user.setIsactive(true);
        String userId = userRepository.save(user).getId();
        filterrepository.save(new Filter(userId));

        serverResponse = new ServerResponse(true, "User registered successfully");

        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }

    @GetMapping("/currentUser")
    public User getCurrentUser(@CurrentUser UserDetailsSecurity currentUser) {
        User user = userRepositoryCustom.findById(currentUser.getId());

        return new User(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(), user.getRoles(), user.getProfile());
    }

    @GetMapping("/loadAllUsers")
    public List<User> getAllUsers(@RequestParam(value = "input") String input, @RequestParam(value = "projectId") String projectId) {
        return userRepositoryCustom.getAllUsers(input, projectId);
    }

    @GetMapping("/loadAllUsersInProject")
    public List<UserProjectResponse> getAllUsersInProject(@RequestParam(value = "projectId") String projectId) {
        return userRepositoryCustom.getAllUsersInProject(projectId);
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

    @PostMapping("admin/activeUser")
    public ResponseEntity<?> activeUser(@RequestBody String userId, boolean isActive) {
        ServerResponse serverResponse;
        if (userRepositoryCustom.activeOrBanUser(userId, isActive)) {
            serverResponse = new ServerResponse(true, "change permission successfully");
            return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
        }
        serverResponse = new ServerResponse(true, "change permission fail");
        return new ResponseEntity(serverResponse, HttpStatus.BAD_REQUEST);
    }

}
