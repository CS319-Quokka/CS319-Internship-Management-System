package modals;

import java.io.File;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class Feedback {
    private UserProfile sender;
    private File annotatedPDFfile;

    private String feedbackDescription;

    private Date date;

}