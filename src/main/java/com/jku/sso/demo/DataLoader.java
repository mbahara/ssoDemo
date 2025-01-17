package com.jku.sso.demo;

import com.jku.sso.demo.persistence.model.SimulationTask;
import com.jku.sso.demo.persistence.model.OptimizationJob;
import com.jku.sso.demo.persistence.repo.SimulationTaskRepository;
import com.jku.sso.demo.persistence.repo.OptimizationJobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final OptimizationJobRepository optimizationJobRepository;
    private final SimulationTaskRepository simulationTaskRepository;

    public DataLoader(OptimizationJobRepository optimizationJobRepository, SimulationTaskRepository simulationTaskRepository) {
        this.optimizationJobRepository = optimizationJobRepository;
        this.simulationTaskRepository = simulationTaskRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Load initial data into the database
        optimizationJobRepository.save(new OptimizationJob(
                "Spring Optimization Job",
                "Optimization of spring stiffness"
        ));

        optimizationJobRepository.save(new OptimizationJob(
                "Beam Deflection",
                "Optimization of beam deflection"
        ));

        optimizationJobRepository.save(new OptimizationJob(
                "Cost","Material cost minimization"
        ));

        optimizationJobRepository.save(new OptimizationJob(
                "Drag", "Aerodynamic drag optimization"

        ));

        optimizationJobRepository.save(new OptimizationJob(
                "Thermal Job", "Thermal efficiency improvement"
        ));

        optimizationJobRepository.save(new OptimizationJob(
                "ML","Machine learning model optimization"
        ));

        optimizationJobRepository.save(new OptimizationJob(
                "Battery", "Battery life improvement"

        ));

        optimizationJobRepository.save(new OptimizationJob(
                "Loading Job", "Load balancing optimization"

        ));

        optimizationJobRepository.save(new OptimizationJob(
                "Fuel", "Fuel efficiency maximization"

        ));

        optimizationJobRepository.save(new OptimizationJob(
                "Vibration Job", "Vibration reduction in machinery"

        ));

        // simulation data

        simulationTaskRepository.save(new SimulationTask("Flow Simulation"));
        simulationTaskRepository.save(new SimulationTask("Heat Transfer Simulation"));
        simulationTaskRepository.save(new SimulationTask("Stress Analysis"));
        simulationTaskRepository.save(new SimulationTask("CFD Simulation"));
        simulationTaskRepository.save(new SimulationTask("Structural Analysis"));
        simulationTaskRepository.save(new SimulationTask("Electric Circuit Simulation"));
        simulationTaskRepository.save(new SimulationTask("Magnetic Field Simulation"));
        simulationTaskRepository.save(new SimulationTask("Acoustic Wave Simulation"));
        simulationTaskRepository.save(new SimulationTask("Optical Lens Simulation"));
        simulationTaskRepository.save(new SimulationTask("Thermal Expansion Simulation"));

    }
}