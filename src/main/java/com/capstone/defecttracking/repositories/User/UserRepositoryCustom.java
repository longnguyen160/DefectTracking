package com.capstone.defecttracking.repositories.User;

import com.capstone.defecttracking.models.User.User;

public interface UserRepositoryCustom {
    User findByEmail(String email);
    User findById(String userId);
    Boolean doesUsernameExisted(String username);
}
