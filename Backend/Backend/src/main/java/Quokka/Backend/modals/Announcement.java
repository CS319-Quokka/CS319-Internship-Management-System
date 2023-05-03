package modals;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class Announcement {
    private String title;
    private String content;
    private String senderName;
    private Date date;
    private boolean isSeen;
}