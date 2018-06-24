package com.capstone.defecttracking.repositories.Phase;

import com.capstone.defecttracking.models.Phase.Phase;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PhaseRepository extends MongoRepository<Phase, String> {
}
