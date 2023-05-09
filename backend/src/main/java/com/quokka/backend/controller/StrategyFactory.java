package com.quokka.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Component
public class StrategyFactory {
    private Map<StrategyEnum, GradeFormStrategy> strategies;

    @Autowired
    public StrategyFactory(Set<GradeFormStrategy> strategySet) {
        createStrategy(strategySet);
    }

    public GradeFormStrategy findStrategy(StrategyEnum strategyName) {
        return strategies.get(strategyName);
    }
    private void createStrategy(Set<GradeFormStrategy> strategySet) {
        strategies = new HashMap<StrategyEnum, GradeFormStrategy>();
        strategySet.forEach(strategy ->strategies.put(strategy.getStrategyName(), strategy));
    }
}
