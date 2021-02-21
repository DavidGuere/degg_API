package com.GGApi.GGApi.Repository;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;
import java.util.Map;

@Service
public class FileStoreToAWS {

    private final AmazonS3 s3Client;

    @Autowired
    // Client injection from AmazonClientConfig bean
    public FileStoreToAWS(AmazonS3 s3Client) {
        this.s3Client = s3Client;
    }

    public String saveFile(String fileName, String bucketName, InputStream file, Map<String, String> metaData){

        // AWS metadata
        ObjectMetadata fileMetaData = new ObjectMetadata();
        fileMetaData.addUserMetadata("Content-Type", metaData.get("Content-Type"));
        try {
            s3Client.putObject(bucketName, fileName, file, fileMetaData);
        } catch (AmazonServiceException e){
            System.out.println(e.getErrorMessage());
        }
        // Create URL
        String serverZone = ServerInformation.ZONE.getServerInformation();
        String server = ServerInformation.SERVER.getServerInformation();
        String imageUrl = "https://" + bucketName + ".s3." + serverZone + "." + server + "/" + fileName;

        return imageUrl;

    }
}
