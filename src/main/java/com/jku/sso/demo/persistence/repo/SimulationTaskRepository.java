package com.jku.sso.demo.persistence.repo;

import com.jku.sso.demo.persistence.model.SimulationTask;
import org.springframework.data.repository.CrudRepository;

public interface SimulationTaskRepository extends CrudRepository<SimulationTask, Long> {
}
