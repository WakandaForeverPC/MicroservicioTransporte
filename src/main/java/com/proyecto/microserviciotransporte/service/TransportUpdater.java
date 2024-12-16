package com.proyecto.microserviciotransporte.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TransportUpdater {

    private final TransportService transportService;
    private final TransportWebSocketService transportWebSocketService;

    public TransportUpdater(TransportService transportService, TransportWebSocketService transportWebSocketService) {
        this.transportService = transportService;
        this.transportWebSocketService = transportWebSocketService;
    }

    @Scheduled(fixedRate = 2000)
    public void updateTransport() {
        transportService.moveBuses();
        transportWebSocketService.sendTransportUpdates();
    }
}