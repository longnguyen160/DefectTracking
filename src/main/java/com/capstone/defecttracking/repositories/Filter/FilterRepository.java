/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.capstone.defecttracking.repositories.Filter;

import com.capstone.defecttracking.models.Filter.Filter;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author doanb
 */
public interface FilterRepository extends MongoRepository<Filter, String>{}
