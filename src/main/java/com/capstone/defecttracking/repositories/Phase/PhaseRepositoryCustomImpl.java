package com.capstone.defecttracking.repositories.Phase;

import com.capstone.defecttracking.models.Issue.Issue;
import com.capstone.defecttracking.models.Issue.IssuePhaseResponse;
import com.capstone.defecttracking.models.Phase.Phase;
import com.capstone.defecttracking.models.Phase.PhaseIssueResponse;
import com.capstone.defecttracking.models.Phase.PhaseResponse;
import com.capstone.defecttracking.models.User.User;
import com.capstone.defecttracking.models.User.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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

    private UserResponse getUserResponse(String userId) {
        Query query = new Query(Criteria.where("_id").is(userId));
        User user = mongoTemplate.findOne(query, User.class);

        if (user.getProfile() == null) {
            return new UserResponse(user.getId(), user.getUsername());
        }

        return new UserResponse(user.getId(), user.getUsername(), user.getProfile().getAvatarURL());
    }

    @Override
    public PhaseIssueResponse loadActivePhase(String projectId) {
        Criteria criteria = new Criteria();

        criteria.andOperator(
            Criteria.where("projectId").is(projectId),
            Criteria.where("starting").is(true)
        );

        Query query = new Query(criteria);
        Phase phase = mongoTemplate.findOne(query, Phase.class);

        query = new Query(Criteria.where("_id").in(phase.getIssueList()));
        ArrayList<IssuePhaseResponse> issueList = mongoTemplate
            .find(query, Issue.class)
            .stream()
            .map(issue -> new IssuePhaseResponse(
                issue.getId(),
                issue.getIssueKey(),
                issue.getIssueName(),
                getUserResponse(issue.getAssignee()),
                issue.getPriority(),
                issue.getStatus()
            )).collect(Collectors.toCollection(ArrayList::new));

        return new PhaseIssueResponse(phase.getId(), phase.getName(), phase.getStartDate(), phase.getEndDate(), phase.getStarting(), issueList);
    }

    @Override
    public void updateIssueList(String phaseId, ArrayList<String> issueList) {
        Query query = new Query(Criteria.where("_id").is(phaseId));
        Update update = new Update();

        update.set("issueList", issueList);
        mongoTemplate.updateFirst(query, update, Phase.class);
    }
}
