package com.GGApi.GGApi.Repository;

public enum ServerInformation {
    ZONE("eu-north-1"),
    SERVER("amazonaws.com");

    private final String serverInformation;

    ServerInformation(String serverInformation) {
        this.serverInformation = serverInformation;
    }

    public String getServerInformation() {
        return serverInformation;
    }
}
