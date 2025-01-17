package com.jku.sso.demo.web.exception;

public class SimulationNotFoundException extends RuntimeException {
    public SimulationNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    public SimulationNotFoundException() { }
}
