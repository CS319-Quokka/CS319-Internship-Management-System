package modals;

import java.util.List;

public class GradeForm {

    private Student student;
    private Instructor instructor;
    private String courseCode;
    private List<GradeFormElement> elements;
    private String evaluationPhase;
    private String creationTime;
    private String overallEvaluation;

    public Student getStudent() {
        return student;
    }

    public Instructor getInstructor(){
        return instructor;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public List<GradeFormElement> getElements() {
        return elements;
    }

    public String getEvaluationPhase(){
        return evaluationPhase;
    }

    public String getCreationTime() {
        return creationTime;
    }

    public String getOverallEvaluation() {
        return overallEvaluation;
    }

    public boolean setStudent(Student student){
        this.student = student;
        return true;
    }

    public void setInstructor(Instructor instructor){
        this.instructor = instructor;
    }

    public void setCourseCode(String courseCode){
        this.courseCode = courseCode;
    }

}