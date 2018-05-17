package com.capstone.defecttracking.services;

import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserDetailsSecurity;
import com.capstone.defecttracking.repositories.User.UserRepositoryCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepositoryCustom userRepositoryCustom;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User currentUser = userRepositoryCustom.findByEmail(email);

        return UserDetailsSecurity.create(currentUser);
    }


    @Transactional
    public UserDetails loadUserById(String userId) throws UsernameNotFoundException {
        User currentUser = userRepositoryCustom.findById(userId);

        return UserDetailsSecurity.create(currentUser);
    }
}
