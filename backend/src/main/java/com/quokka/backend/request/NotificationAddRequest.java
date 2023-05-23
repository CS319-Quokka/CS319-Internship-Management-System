package com.quokka.backend.request;

import lombok.Data;

import java.util.Date;

@Data
public class NotificationAddRequest {

    private String title;
    private String content;
    private Date date;

}
