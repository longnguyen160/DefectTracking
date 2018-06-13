package com.capstone.defecttracking.repositories.User;

import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserProfile;

import java.util.List;

public interface UserRepositoryCustom {
    User findByEmail(String email);
    User findById(String userId);
    Boolean doesUsernameExisted(String username);
    List<User> getAllUsers(String input);
    Boolean updateUserProfile(String userId, UserProfile profile, String email);
}
