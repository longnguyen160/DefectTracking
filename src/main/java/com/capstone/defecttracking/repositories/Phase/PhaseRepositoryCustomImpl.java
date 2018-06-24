package com.capstone.defecttracking.repositories.Phase;

import com.capstone.defecttracking.models.Phase.Phase;
import com.capstone.defecttracking.models.Phase.PhaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class PhaseRepositoryCustomImpl implements PhaseRepositoryCustom {

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public Boolean didPhaseNameExisted(String name, String projectId) {
        Criteria criteria = new Criteria();

        criteria.andOperator(
            Criteria.where("name").is(name),
            Criteria.where("project").is(projectId)
        );
        Query query = new Query(criteria);

        return mongoTemplate.findOne(query, Phase.class) != null;
    }

    @Override
    public List<PhaseResponse> loadAllPhases(String projectId) {
        Criteria criteria = new Criteria();

        criteria.andOperator(
            Criteria.where("projectId").is(projectId),
            Criteria.where("completeDate").exists(false)
        );

        Query query = new Query(criteria);
        List<Phase> phaseList = mongoTemplate.find(query, Phase.class);

        return phaseList
            .stream()
            .map(phase -> new PhaseResponse(
                phase.getId(),
                phase.getName(),
                phase.getStartDate(),
                phase.getEndDate(),
                phase.getStarting(),
                phase.getIssueList()
            ))
            .collect(Collectors.toList());
    }
}
