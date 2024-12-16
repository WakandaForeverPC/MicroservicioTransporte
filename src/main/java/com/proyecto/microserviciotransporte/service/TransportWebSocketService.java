package com.proyecto.microserviciotransporte.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class TransportWebSocketService {

    private final SimpMessagingTemplate template;
    private final TransportService transportService;

    public TransportWebSocketService(SimpMessagingTemplate template, TransportService transportService) {
        this.template = template;
        this.transportService = transportService;
    }

    @Scheduled(fixedRate = 2000)
    public void sendTransportUpdates() {
        template.convertAndSend("/topic/transport-buses", transportService.getBuses());
    }
}