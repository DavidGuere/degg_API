package com.GGApi.GGApi.Repository;

public enum S3Buckets {
    PEOPLE("ggserver-people"),
    EVENTS("ggserver-events"),
    NATURE("ggserver-nature"),
    WORLD("ggserver-world");

    private final String bucketName;

    S3Buckets(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}
