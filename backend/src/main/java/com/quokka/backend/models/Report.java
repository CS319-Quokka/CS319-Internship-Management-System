package modals;

import java.io.File;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class Report {

    private File reportFile;
    private String revisionDescription;
    private Feedback feedback;
    private Date uploadDate;
    private String status;

}