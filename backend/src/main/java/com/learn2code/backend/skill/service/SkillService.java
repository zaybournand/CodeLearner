package com.learn2code.backend.skill.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learn2code.backend.skill.model.Skill;
import com.learn2code.backend.skill.repository.SkillRepository;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    // Get all Languages/Skills
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    // Create a new Language/Skill 
    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    // Get a specific skill by ID 
    public Skill getSkillById(Long id) {
        return skillRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + id));
    }
}
