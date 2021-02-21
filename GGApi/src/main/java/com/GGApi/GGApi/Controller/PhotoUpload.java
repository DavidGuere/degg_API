package com.GGApi.GGApi.Controller;

import com.GGApi.GGApi.Service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.concurrent.ExecutionException;

@RequestMapping("/api/v1/upload")
@RestController
// Enabling communication with port 3000
@CrossOrigin(origins = "*")
public class PhotoUpload {

    private PhotoService photoService;

    @Autowired
    public PhotoUpload(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping(path = "/image/{orientation}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadImage(@RequestParam("image") MultipartFile image, @PathVariable("orientation") String orientation ) throws ExecutionException, InterruptedException {

        photoService.saveToPeople(image, orientation);
    }

//    @GetMapping
//    public void asd() throws ExecutionException, InterruptedException {
//        photoService.getSomething();
//    }
}
