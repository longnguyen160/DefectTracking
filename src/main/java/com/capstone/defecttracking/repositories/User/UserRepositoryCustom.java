package com.capstone.defecttracking.repositories.User;

import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserActiveRequest;
import com.capstone.defecttracking.models.User.UserProfile;
import com.capstone.defecttracking.models.User.UserProjectResponse;

import java.util.List;

public interface UserRepositoryCustom {
    User findByEmail(String email);
    User findById(String userId);
    Boolean doesUsernameExisted(String username);
    List<User> getAllUsers(String input, String projectId);
    Boolean updateUserProfile(String userId, UserProfile profile, String email);
    List<UserProjectResponse> getAllUsersInProject(String projectId);
    Boolean manageUser(UserActiveRequest userActiveRequest);
}
