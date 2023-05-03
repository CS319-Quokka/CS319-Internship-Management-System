import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Notification{

    private String title;
    private String content;
    private boolean isSeen;
    private Date date;


}