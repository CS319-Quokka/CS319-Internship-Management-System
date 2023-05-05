package quokka.backend.models;
import quokka.backend.models.*;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class AdministrativeAssistant extends UserProfile {
    private List<Student> studentList;

    private List<Instructor> instructorList;

    private List<TeachingAssistant> teachingAssistantList;

    private List<Company> companyList;

    private List<Announcement> madeAnnouncementList;
}