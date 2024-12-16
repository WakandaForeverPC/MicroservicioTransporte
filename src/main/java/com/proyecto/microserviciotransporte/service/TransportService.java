package com.proyecto.microserviciotransporte.service;

import com.proyecto.microserviciotransporte.model.Bus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransportService {
    private List<Bus> buses;
    private final int GRID_WIDTH = 9;
    private final int GRID_HEIGHT = 7;

    public TransportService() {
        buses = new ArrayList<>();

        // Initialize test buses
        buses.add(new Bus("bus1", 1, 0, "EAST", "Route1"));
        buses.add(new Bus("bus2", 7, 7, "WEST", "Route2"));
    }

    public synchronized void moveBuses() {
        for (Bus bus : buses) {
            switch (bus.getRoute()) {
                case "Route1":
                    moveBusRoute1(bus);
                    break;

                case "Route2":
                    moveBusRoute2(bus);
                    break;
            }
        }
    }

    private void moveBusRoute1(Bus bus) {
        if (bus.getX() == 1 && bus.getY() < 3) {
            bus.setY(bus.getY() + 1);
            bus.setDirection("SOUTH");
        } else if (bus.getX() < 5 && bus.getY() == 3) {
            bus.setX(bus.getX() + 1);
            bus.setDirection("EAST");
        } else if (bus.getX() == 5 && bus.getY() < 6) {
            bus.setY(bus.getY() + 1);
            bus.setDirection("SOUTH");
        } else {
            // Reset to initial position
            bus.setX(1);
            bus.setY(0);
            bus.setDirection("EAST");
        }
    }

    private void moveBusRoute2(Bus bus) {
        if (bus.getX() == 7 && bus.getY() > 3) {
            bus.setY(bus.getY() - 1);
            bus.setDirection("NORTH");
        } else if (bus.getX() > 3 && bus.getY() == 3) {
            bus.setX(bus.getX() - 1);
            bus.setDirection("WEST");
        } else if (bus.getX() == 3 && bus.getY() > 0) {
            bus.setY(bus.getY() - 1);
            bus.setDirection("NORTH");
        } else {
            // Reset to initial position
            bus.setX(7);
            bus.setY(7);
            bus.setDirection("WEST");
        }
    }

    public synchronized List<Bus> getBuses() {
        return buses;
    }
}