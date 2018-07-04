/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Status;

import com.capstone.defecttracking.models.Status.Status;

import java.util.List;

/**
 *
 * @author doanb
 */
public interface StatusRepositoryCustom {
    List<Status> loadAllStatus(String role);
    Boolean didStatusExisted(String name);
    Boolean updateStatus(Status status);
    Boolean updateStatusDefault(String statusId);
}