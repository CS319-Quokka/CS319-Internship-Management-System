package modals;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter

public class TeachingAssistant extends UserProfile{

    private List<Student> students;
}