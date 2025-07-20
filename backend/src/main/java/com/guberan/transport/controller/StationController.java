package com.guberan.transport.controller;


import com.guberan.transport.model.StationBoardResponse;
import com.guberan.transport.service.TransportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/station")
public class StationController {

    private final TransportService service;

    public StationController(TransportService service) {
        this.service = service;
    }

    @GetMapping("/{name}")
    public StationBoardResponse getStationBoard(@PathVariable String name) {
        StationBoardResponse response = service.getDepartures(name);
        return response;
    }
}
