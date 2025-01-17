package com.jku.sso.demo.web;

import com.jku.sso.demo.persistence.model.OptimizationJob;
import com.jku.sso.demo.persistence.repo.OptimizationJobRepository;
import com.jku.sso.demo.web.exception.OptimizationJobIdMismatchException;
import com.jku.sso.demo.web.exception.OptimizationJobNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/optimizers")
public class OptimizationJobController {
    @Autowired
    private OptimizationJobRepository optimizationJobRepository;

    @GetMapping
    public Iterable<OptimizationJob> findAll() {
        return optimizationJobRepository.findAll();
    }

    @GetMapping("/{id}")
    public OptimizationJob findOne(@PathVariable long id) {
        return optimizationJobRepository.findById(id).orElseThrow(OptimizationJobNotFoundException::new);
    }

    @PostMapping
    //@PreAuthorize("hasRole('ROLE_admin_optimizer')")
    @ResponseStatus(HttpStatus.CREATED)
    public OptimizationJob create(@RequestBody OptimizationJob optimizationJob) {
		return optimizationJobRepository.save(optimizationJob);
    }

    @DeleteMapping("/{id}")
    //@PreAuthorize("hasRole('ROLE_admin_optimizer')")
    public void delete(@PathVariable long id) {
        optimizationJobRepository.findById(id)
                .orElseThrow(OptimizationJobNotFoundException::new);
        optimizationJobRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    //@PreAuthorize("hasRole('ROLE_admin_optimizer')")
    public OptimizationJob updateOptimizationJob(@RequestBody OptimizationJob optimizationJob, @PathVariable long id) {
        if (optimizationJob.getId() != id) {
            throw new OptimizationJobIdMismatchException();
        }
        optimizationJobRepository.findById(id)
                .orElseThrow(OptimizationJobNotFoundException::new);
        return optimizationJobRepository.save(optimizationJob);
    }
}
