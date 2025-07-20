package com.guberan.transport.service;

import com.guberan.transport.model.StationBoardResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class TransportService {
    public StationBoardResponse getDepartures(String stationName) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://transport.opendata.ch/v1/stationboard?station=" + stationName + "&limit=5";
        return restTemplate.getForObject(url, StationBoardResponse.class);
    }
}