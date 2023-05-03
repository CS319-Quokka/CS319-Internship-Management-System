package modals;

import java.io.File;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class Instructor extends UserProfile {

    private List<Student> students;
    private File signature;
}