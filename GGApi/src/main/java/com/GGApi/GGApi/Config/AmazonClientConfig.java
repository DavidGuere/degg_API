package com.GGApi.GGApi.Config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmazonClientConfig {

    // Access to AWS management console
    @Bean
    public AmazonS3 s3Client(){
        AWSCredentials awsCredentials = new BasicAWSCredentials("", "");

        return AmazonS3ClientBuilder.standard().withRegion("eu-north-1").withCredentials(new AWSStaticCredentialsProvider(awsCredentials)).build();
    }
}
