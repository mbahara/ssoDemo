package com.jku.sso.demo.web;

import com.jku.sso.demo.persistence.model.SimulationTask;
import com.jku.sso.demo.persistence.repo.SimulationTaskRepository;
import com.jku.sso.demo.web.exception.SimulationTaskIdMismatchException;
import com.jku.sso.demo.web.exception.SimulationNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulations")
public class SimulationTaskController {
    @Autowired
    private SimulationTaskRepository simulationTaskRepository;

    @GetMapping
    public Iterable<SimulationTask> findAll() {
        return simulationTaskRepository.findAll();
    }

    @GetMapping("/{id}")
    public SimulationTask findOne(@PathVariable long id) {
        return simulationTaskRepository.findById(id).orElseThrow(SimulationNotFoundException::new);
    }

    @PostMapping
    //@PreAuthorize("hasRole('ROLE_admin_simulator')")
    @ResponseStatus(HttpStatus.CREATED)
    public SimulationTask create(@RequestBody SimulationTask simulationTask) {
		return simulationTaskRepository.save(simulationTask);
    }

    @DeleteMapping("/{id}")
    //@PreAuthorize("hasRole('ROLE_admin_simulator')")
    public void delete(@PathVariable long id) {
        simulationTaskRepository.findById(id)
                .orElseThrow(SimulationNotFoundException::new);
        simulationTaskRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    //@PreAuthorize("hasRole('ROLE_admin_simulator')")
    public SimulationTask updateBook(@RequestBody SimulationTask simulationTask, @PathVariable long id) {
        if (simulationTask.getId() != id) {
            throw new SimulationTaskIdMismatchException();
        }
        simulationTaskRepository.findById(id)
                .orElseThrow(SimulationNotFoundException::new);
        return simulationTaskRepository.save(simulationTask);
    }
}
