package com.quokka.backend.controller;

import com.quokka.backend.repository.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EvaluationController {

    @Autowired
    private EvaluationRepository evaluationRepository;
}
