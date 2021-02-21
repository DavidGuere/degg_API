package com.GGApi.GGApi.Service;

import com.GGApi.GGApi.Repository.FileStoreToAWS;
import com.GGApi.GGApi.Repository.FileStoreToFirestore;
import com.GGApi.GGApi.Repository.S3Buckets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class PhotoService {

    private final FileStoreToAWS fileStoreToAWS;
    private final FileStoreToFirestore fileStoreToFirestore;

    @Autowired
    public PhotoService(FileStoreToAWS fileStoreToAWS, FileStoreToFirestore fileStoreToFirestore) {
        this.fileStoreToAWS = fileStoreToAWS;
        this.fileStoreToFirestore = fileStoreToFirestore;
    }

    public void saveToServer(MultipartFile file, String orientation, String server) throws ExecutionException, InterruptedException {
        UUID uniqueName = UUID.randomUUID();
        String name = uniqueName.toString() + ".jpg";
        String URL;
        String bucket;

        switch (server){
            case "People":
                bucket = S3Buckets.PEOPLE.getBucketName();
                break;
            case "Nature":
                bucket = S3Buckets.NATURE.getBucketName();
                break;
            case "Events":
                bucket = S3Buckets.EVENTS.getBucketName();
                break;
            case "World":
                bucket = S3Buckets.WORLD.getBucketName();
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + server);
        }

        Map<String, String> metaData = new HashMap<>();
        metaData.put("Content-Type", "image/jpg");
        try {
            URL = fileStoreToAWS.saveFile(name, bucket, file.getInputStream(), metaData);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

        fileStoreToFirestore.saveFile(orientation, URL, bucket);
    }
}
