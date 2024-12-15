package com.proyecto.microserviciotransporte.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transporte")
public class TransporteController {

    @GetMapping
    public String obtenerTransporte() {
        // Lógica para obtener información de transporte
        return "Información de transporte";
    }

    @PostMapping
    public String crearTransporte(@RequestBody String nuevoTransporte) {
        // Lógica para crear nueva información de transporte
        return "Nuevo transporte creado";
    }
}