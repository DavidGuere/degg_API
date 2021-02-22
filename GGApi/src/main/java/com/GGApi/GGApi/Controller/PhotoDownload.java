package com.GGApi.GGApi.Controller;

import com.GGApi.GGApi.Service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("api/v1/download")
@CrossOrigin(origins = "*")
public class PhotoDownload {

    PhotoService photoService;

    @Autowired
    public PhotoDownload(PhotoService photoService) {
        this.photoService = photoService;
    }

    @GetMapping("server/{server}")
    public List<String> sendData(@PathVariable("server") String server) throws ExecutionException, InterruptedException {
//
        return photoService.getFromServer(server);
    }
}
