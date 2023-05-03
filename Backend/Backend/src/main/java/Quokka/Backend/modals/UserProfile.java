package modals;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class UserProfile{


   private List<Notification> notifications;
   private List<Announcement> announcements;
}