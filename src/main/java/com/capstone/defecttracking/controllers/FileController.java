package com.capstone.defecttracking.controllers;

import com.capstone.defecttracking.models.File.FileResponse;
import com.capstone.defecttracking.models.Server.ServerResponse;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsCriteria;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/files")
public class FileController {
    private final GridFsTemplate gridFsTemplate;

    @Autowired
    public FileController(GridFsTemplate gridFsTemplate) {
        this.gridFsTemplate = gridFsTemplate;
    }

    @PostMapping("/uploadFile")
    public ArrayList<String> uploadFile(@RequestBody MultipartFile[] files) {
        ArrayList<String> listIds = new ArrayList<>();

        for (MultipartFile file : files) {
            String name = file.getOriginalFilename();

            try {
                String fileId = gridFsTemplate.store(file.getInputStream(), name, file.getContentType()).toString();

                listIds.add(fileId);
            } catch(IOException error) {
                error.printStackTrace();
            }
        }
        return listIds;
    }

    @GetMapping("/list")
    public List<FileResponse> getList(@RequestParam(value = "fileIds") ArrayList<String> fileIds) {
        List<GridFSFile> list = new ArrayList<>();

        return gridFsTemplate
            .find(Query.query(GridFsCriteria.where("_id").in(fileIds)))
            .into(list)
            .stream()
            .map(file -> new FileResponse(file.getObjectId().toHexString(), file.getMetadata().get("_contentType").toString(), file.getFilename(), file.getLength()))
            .collect(Collectors.toList());
    }

    @GetMapping("/load")
    public FileResponse loadFile(@RequestParam(value = "fileId") String fileId) {
        GridFSFile file = gridFsTemplate.findOne(Query.query(GridFsCriteria.where("_id").is(fileId)));

        return new FileResponse(fileId, file.getMetadata().get("_contentType").toString(), file.getFilename(), file.getLength());
    }

    @GetMapping("/")
    public HttpEntity<byte[]> downloadFile(@RequestParam(value = "fileId") String fileId) {
        MongoClient mongoClient = new MongoClient(new MongoClientURI("${spring.data.mongodb.uri}"));
        Query query = new Query(GridFsCriteria.where("_id").is(fileId));
        GridFSFile file = gridFsTemplate.findOne(query);
        HttpHeaders headers = new HttpHeaders();

        try {
            MongoDatabase database = mongoClient.getDatabase("defect-tracking");
            GridFSBucket gridFSBucket = GridFSBuckets.create(database);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            headers.add(HttpHeaders.CONTENT_TYPE, file.getMetadata().get("_contentType").toString());
            gridFSBucket.downloadToStream(file.getFilename(), baos);

            return new HttpEntity<>(baos.toByteArray(), headers);
        } catch (Exception error) {
            error.printStackTrace();
            return null;
        }
    }

    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<?> deleteFile(@PathVariable("fileId") String fileId) {
        ServerResponse serverResponse = new ServerResponse(true, "Delete file successfully");
        Query query = new Query(GridFsCriteria.where("_id").is(fileId));

        gridFsTemplate.delete(query);
        return new ResponseEntity(serverResponse, HttpStatus.ACCEPTED);
    }
}
