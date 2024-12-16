package com.proyecto.microserviciotransporte.model;

public class Bus {
    private String id;
    private int x;
    private int y;
    private String direction;
    private String route;

    public Bus(String id, int x, int y, String direction, String route) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.route = route;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }
}