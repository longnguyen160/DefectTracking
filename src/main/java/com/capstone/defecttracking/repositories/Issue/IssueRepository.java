package com.capstone.defecttracking.repositories.Issue;

import com.capstone.defecttracking.models.Issue.Issue;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IssueRepository extends MongoRepository<Issue, String> {
}
