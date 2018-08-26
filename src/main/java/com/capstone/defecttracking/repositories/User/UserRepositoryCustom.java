package com.capstone.defecttracking.repositories.User;

import com.capstone.defecttracking.models.User.*;

import java.util.List;

public interface UserRepositoryCustom {
    User findByEmail(String email);
    User findById(String userId);
    Boolean doesUsernameExisted(String username);
    List<User> getAllUsers(String input, String projectId);
    Boolean updateUserProfile(String userId, UserProfile profile, String email);
    List<UserProjectResponse> getAllUsersInProject(String projectId);
    Boolean manageUser(UserActiveRequest userActiveRequest);
    List<UserResponse> searchUser(String value);
}
