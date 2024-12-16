package com.proyecto.microserviciotransporte.controller;

import com.proyecto.microserviciotransporte.service.TransportService;
import com.proyecto.microserviciotransporte.model.Bus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TransporteController {

    private final TransportService transportService;

    public TransporteController(TransportService transportService) {
        this.transportService = transportService;
    }

    @GetMapping("/transporte/buses")
    public List<Bus> getBuses() {
        transportService.moveBuses(); // Actualizar posiciones de buses
        return transportService.getBuses();
    }
}