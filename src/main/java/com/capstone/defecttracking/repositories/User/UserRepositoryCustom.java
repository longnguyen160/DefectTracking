package com.capstone.defecttracking.repositories.User;

import com.capstone.defecttracking.models.User;

public interface UserRepositoryCustom {
    public User findByUsername(String name);
    public boolean login(User user);
}
