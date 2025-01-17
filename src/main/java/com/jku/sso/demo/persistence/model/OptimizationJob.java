package com.jku.sso.demo.persistence.model;

import jakarta.persistence.*;

@Entity
public class OptimizationJob {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String jobName;

    @Column
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    public OptimizationJob() {}

    public OptimizationJob(String jobName, String description) {
        this.jobName = jobName;
        this.description = description;
        this.status = Status.PENDING;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Optimization Job #" + id +
                "{ jobName='" + jobName + '\'' +
                ", description='" + description + '\'' +
                ", status=" + status +
                '}';
    }
}
