package com.proyecto.microserviciotransporte.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TransporteBoardController {

    @GetMapping("/transporte")
    public String showCity() {
        return "index";
    }
}