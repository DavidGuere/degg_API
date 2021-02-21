package com.GGApi.GGApi.Model;

public class Foto {

    private int id;
    private String URL;
    private String orientation;

    public Foto() {
    }

    public Foto(int id, String URL, String orientation) {
        this.id = id;
        this.URL = URL;
        this.orientation = orientation;
    }

    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

    public String getOrientation() {
        return orientation;
    }

    public void setOrientation(String orientation) {
        this.orientation = orientation;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
