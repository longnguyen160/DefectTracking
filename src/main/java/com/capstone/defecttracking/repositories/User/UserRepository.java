package com.capstone.defecttracking.repositories.User;

import com.capstone.defecttracking.models.User.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

}
