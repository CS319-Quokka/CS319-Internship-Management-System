package modals;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class Company {
    private String name;
    private List<Student> studentList;
}