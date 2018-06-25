package com.capstone.defecttracking.repositories.Phase;

import com.capstone.defecttracking.models.Phase.PhaseResponse;

import java.util.ArrayList;
import java.util.List;

public interface PhaseRepositoryCustom {
    Boolean didPhaseNameExisted(String name, String projectId);
    List<PhaseResponse> loadAllPhases(String projectId);
    void updateIssueList(String phaseId, ArrayList<String> issueList);
}
