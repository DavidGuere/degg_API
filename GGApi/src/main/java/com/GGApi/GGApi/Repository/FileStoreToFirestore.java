package com.GGApi.GGApi.Repository;

import com.GGApi.GGApi.Model.Foto;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class FileStoreToFirestore {



    public void saveFile(String orientation, String url) throws ExecutionException, InterruptedException {

        // Open connection to database
        Firestore myDatabase = FirestoreClient.getFirestore();
        // Get id of last: Query: select from "Fotos" collection all documents ordered by "id" incrementing and getting the last one
        Query lastImageId = myDatabase.collection("Fotos").orderBy("id", Query.Direction.valueOf("ASCENDING")).limitToLast(1);
        // Convert from Query to Foto Object and get id
        Foto tempFoto = lastImageId.get().get().toObjects(Foto.class).get(0);
        int lastId = tempFoto.getId();

        // Create  new foto object
        Foto imageData = new Foto();
//
        imageData.setURL(url);
        imageData.setOrientation(orientation);
        imageData.setId(lastId + 1);

        String docName = String.valueOf(imageData.getId());
//
        ApiFuture<WriteResult> saveImageData = myDatabase.collection("Fotos").document(docName).set(imageData);
    }
}
