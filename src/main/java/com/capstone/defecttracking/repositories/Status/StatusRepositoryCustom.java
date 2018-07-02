/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Status;

import com.capstone.defecttracking.models.Status.Status;
import com.capstone.defecttracking.models.Status.StatusResponse;
import java.util.List;

/**
 *
 * @author doanb
 */
public interface StatusRepositoryCustom {
    List<StatusResponse> loadAllStatus();
    Boolean didStatusExisted(String name);
    Boolean removeStatus(String id);
    Boolean UpdateStatus(Status status);
}
