package com.GGApi.GGApi.Repository;

import com.GGApi.GGApi.Model.Foto;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import netscape.javascript.JSObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class FileStoreToFirestore {



    public void saveFile(String orientation, String url, String collection) throws ExecutionException, InterruptedException {

        // Open connection to database
        Firestore myDatabase = FirestoreClient.getFirestore();
        // Get id of last: Query: select from the collection all documents ordered by "id" incrementing and getting the last one
        Query lastImageId = myDatabase.collection(collection).orderBy("id", Query.Direction.valueOf("ASCENDING")).limitToLast(1);
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

        ApiFuture<WriteResult> saveImageData = myDatabase.collection(collection).document(docName).set(imageData);
    }

    public List<String> getData(String collection) throws ExecutionException, InterruptedException {
        Firestore myDatabase = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = myDatabase.collection(collection).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        Gson json = new Gson();
        List<String> data = new ArrayList<>();
        for (QueryDocumentSnapshot document: documents) {
            String response = json.toJson(document.toObject(Foto.class));
            data.add(response);
            System.out.println(response);
        }


        return data;
    }
}
