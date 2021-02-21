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

    public void saveToPeople(MultipartFile file, String orientation) throws ExecutionException, InterruptedException {
        UUID uniqueName = UUID.randomUUID();
        String name = uniqueName.toString() + ".jpg";
        String URL;

        Map<String, String> metaData = new HashMap<>();
        metaData.put("Content-Type", "image/jpg");
        try {
            URL = fileStoreToAWS.saveFile(name, S3Buckets.PEOPLE.getBucketName(), file.getInputStream(), metaData);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

        fileStoreToFirestore.saveFile(orientation, URL);
    }
}
