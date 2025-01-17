package com.jku.sso.demo.persistence.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class SimulationTask {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String taskName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime submittedAt;

    public SimulationTask() {}

    public SimulationTask(String taskName) {
        this.taskName = taskName;
        this.status = Status.PENDING;
        this.submittedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    @Override
    public String toString() {
        return "Simulation Task #" + id +
                "{ taskName='" + taskName + '\'' +
                ", status=" + status +
                ", submittedAt=" + submittedAt +
                '}';
    }
}
