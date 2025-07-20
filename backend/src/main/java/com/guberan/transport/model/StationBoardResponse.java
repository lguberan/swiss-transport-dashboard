package com.guberan.transport.model;


import java.util.List;

public class StationBoardResponse {
    public List<StationBoard> stationboard;

    public static class StationBoard {
        public String name;
        public String to;
        public Stop stop;
    }

    public static class Stop {
        public String departure;
    }
}