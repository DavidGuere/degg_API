package com.GGApi.GGApi.Service;

import ch.qos.logback.core.util.FileUtil;
import com.GGApi.GGApi.Repository.FileStoreToAWS;
import com.GGApi.GGApi.Repository.S3Buckets;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PhotoService {

    private final FileStoreToAWS fileStoreToAWS;

    @Autowired
    public PhotoService(FileStoreToAWS fileStoreToAWS) {
        this.fileStoreToAWS = fileStoreToAWS;
    }

    public void saveToPeople(MultipartFile file){
        UUID uniqueName = UUID.randomUUID();

        Map<String, String> metaData = new HashMap<>();
        metaData.put("Content-Type", file.getContentType());
        try {
            fileStoreToAWS.saveFile(uniqueName.toString(), S3Buckets.PEOPLE.getBucketName(), file.getInputStream(), metaData);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

    }

}
