package quokka.backend.models;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class UserAccount{


    private List<UserProfile> profileList;
    private String name;
    private String email;
    private int id;
    private String department;
    private String password;

}