package modals;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class GradeFormElement {

    private String type;
    private String status;
    private List<String> questions;
    private List<String> answers;
}