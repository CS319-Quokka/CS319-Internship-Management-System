package modals;

import java.io.File;
import java.util.List;

public class Student extends UserProfile{

    private String courseCode;
    private String letterGrade;
    private String companyName;
    private File companyEvaluationForm;
    private List<Report> reports;
    private List<GradeForm> gradeFormList;
}