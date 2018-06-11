package com.capstone.defecttracking.repositories.Project;

import com.capstone.defecttracking.models.Project.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectRepository extends MongoRepository<Project, String> {

}
