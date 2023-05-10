package com.quokka.backend.service;

import com.quokka.backend.exception.*;
import com.quokka.backend.models.*;
import com.quokka.backend.repository.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Service
public class UserManagementService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final TeachingAssistantRepository teachingAssistantRepository;
    private final InstructorRepository instructorRepository;
    private final SummerTrainingCoordinatorRepository summerTrainingCoordinatorRepository;
    private final AdministrativeAssistantRepository administrativeAssistantRepository;

    @Autowired
    public UserManagementService(UserRepository userRepository, StudentRepository studentRepository,
                                 TeachingAssistantRepository teachingAssistantRepository,
                                 InstructorRepository instructorRepository,
                                 SummerTrainingCoordinatorRepository summerTrainingCoordinatorRepository,
                                 AdministrativeAssistantRepository administrativeAssistantRepository){

        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.teachingAssistantRepository = teachingAssistantRepository;
        this.instructorRepository = instructorRepository;
        this.summerTrainingCoordinatorRepository = summerTrainingCoordinatorRepository;
        this.administrativeAssistantRepository = administrativeAssistantRepository;
    }

    public boolean addStudent(Student student) throws StudentAlreadyExistsException {

        Optional<Student> studentOpt = studentRepository.findById(student.getId());
        if(studentOpt.isPresent()){

            throw new StudentAlreadyExistsException("Student with id " + student.getId() + " already exists!");
        }

        studentRepository.save(student);
        return true;
    }

    public boolean addTeachingAssistant(TeachingAssistant teachingAssistant) throws TeachingAssistantAlreadyExistsException {

        Optional<TeachingAssistant> teachingAssistantOpt = teachingAssistantRepository.findById(teachingAssistant.getId());
        if(teachingAssistantOpt.isPresent()){

            throw new TeachingAssistantAlreadyExistsException("Teaching Assistant with id " + teachingAssistant.getId() +
                    " already exists!");
        }

        teachingAssistantRepository.save(teachingAssistant);
        return true;
    }

    public boolean addInstructor(Instructor instructor) throws InstructorAlreadyExistsException {

        Optional<Instructor> instructorOpt = instructorRepository.findById(instructor.getId());
        if(instructorOpt.isPresent()){

            throw new InstructorAlreadyExistsException("Instructor with id: " + instructor.getId() + " already exists!");
        }

        instructorRepository.save(instructor);
        return true;
    }

    public boolean addSummerTrainingCoordinator(SummerTrainingCoordinator summerTrainingCoordinator)
        throws SummerTrainingCoordinatorAlreadyExistsException {

        Optional<SummerTrainingCoordinator> summerTrainingCoordinatorOpt =
                summerTrainingCoordinatorRepository.findById(summerTrainingCoordinator.getId());
        if(summerTrainingCoordinatorOpt.isPresent()){

            throw new SummerTrainingCoordinatorAlreadyExistsException("Summer Training Coordinator with id " +
                    summerTrainingCoordinator.getId() + " already exists!");
        }

        summerTrainingCoordinatorRepository.save(summerTrainingCoordinator);
        return true;
    }

    public boolean addAdministrativeAssistant(AdministrativeAssistant administrativeAssistant)
        throws AdministrativeAssistantAlreadyExistsException {

        Optional<AdministrativeAssistant> administrativeAssistantOpt =
                administrativeAssistantRepository.findById(administrativeAssistant.getId());
        if(administrativeAssistantOpt.isPresent()){

            throw new AdministrativeAssistantAlreadyExistsException("Administrative Assistant with id " +
                    administrativeAssistant.getId() + " already exists!");
        }

        administrativeAssistantRepository.save(administrativeAssistant);
        return true;
    }

    public boolean removeStudentByID(Long id) throws StudentDoesNotExistException {

        Optional<Student> studentOpt = studentRepository.findById(id);
        if(!studentOpt.isPresent()){

            throw new StudentDoesNotExistException("Student with id " + id + " does not exist. It cannot be removed!");
        }

        studentRepository.deleteById(id);
        return true;
    }

    public boolean removeTeachingAssistantByID(Long id) throws TeachingAssistantDoesNotExistException {

        Optional<TeachingAssistant> teachingAssistantOpt = teachingAssistantRepository.findById(id);
        if(!teachingAssistantOpt.isPresent()){

            throw new TeachingAssistantDoesNotExistException("Teaching Assistant with id " + id +
                    " does not exist. It cannot be removed!");
        }

        for(int i = 0; i < teachingAssistantRepository.findById(id).get().getStudents().size(); i++){

            teachingAssistantRepository.findById(id).get().getStudents().get(i).setTeachingAssistant(null);
        }

        teachingAssistantRepository.deleteById(id);
        return true;
    }

    public boolean removeInstructorByID(Long id) throws InstructorDoesNotExistException {

        Optional<Instructor> instructorOpt = instructorRepository.findById(id);
        if(!instructorOpt.isPresent()){

            throw new InstructorDoesNotExistException("Instructor with id " + id +
                    " does not exist. It cannot be removed!");
        }

        for(int i = 0; i < instructorRepository.findById(id).get().getStudents().size(); i++){

            instructorRepository.findById(id).get().getStudents().get(i).setInstructor(null);
        }

        instructorRepository.deleteById(id);
        return true;
    }

    public boolean removeSummerTrainingCoordinatorByID(Long id) throws SummerTrainingCoordinatorDoesNotExistException {

        Optional<SummerTrainingCoordinator> summerTrainingCoordinatorOpt =
                summerTrainingCoordinatorRepository.findById(id);
        if(!summerTrainingCoordinatorOpt.isPresent()){

            throw new SummerTrainingCoordinatorDoesNotExistException("Summer Training Coordinator with id " + id +
                    " does not exist. It cannot be removed!");
        }

        summerTrainingCoordinatorRepository.deleteById(id);
        return true;
    }

    public boolean removeAdministrativeAssistantByID(Long id) throws AdministrativeAssistantDoesNotExistException {

        Optional<AdministrativeAssistant> administrativeAssistantOpt = administrativeAssistantRepository.findById(id);
        if(!administrativeAssistantOpt.isPresent()){

            throw new AdministrativeAssistantDoesNotExistException("Administrative Assistant with id " + id +
                    " does not exist. It cannot be removed!");
        }

        administrativeAssistantRepository.deleteById(id);
        return true;
    }

    public boolean removeAllStudents(){

        studentRepository.deleteAll();
        return true;
    }

    public boolean removeAllTeachingAssistants(){

        teachingAssistantRepository.deleteAll();
        return true;
    }

    public boolean removeAllInstructors(){

        instructorRepository.deleteAll();
        return true;
    }

    public boolean removeAllSummerTrainingCoordinators(){

        summerTrainingCoordinatorRepository.deleteAll();
        return true;
    }

    public boolean removeAllAdministrativeAssistants(){

        administrativeAssistantRepository.deleteAll();
        return true;
    }

    public List<Student> getAllStudents(){

        return studentRepository.findAll();
    }

    public List<TeachingAssistant> getAllTeachingAssistants(){

        return teachingAssistantRepository.findAll();
    }

    public List<Instructor> getAllInstructors(){

        return instructorRepository.findAll();
    }

    public List<SummerTrainingCoordinator> getAllSummerTrainingCoordinators(){

        return summerTrainingCoordinatorRepository.findAll();
    }

    public List<AdministrativeAssistant> getAllAdministrativeAssistants(){

        return administrativeAssistantRepository.findAll();
    }

    public Student getStudentByID(Long id) throws StudentDoesNotExistException {

        Optional<Student> studentOpt = studentRepository.findById(id);
        if(!studentOpt.isPresent()){

            throw new StudentDoesNotExistException("Student with id " + id +
                    " does not exist. It cannot be returned!");
        }

        return studentRepository.findById(id).get();
    }

    public TeachingAssistant getTeachingAssistantByID(Long id) throws TeachingAssistantDoesNotExistException {

        Optional<TeachingAssistant> teachingAssistantOpt = teachingAssistantRepository.findById(id);
        if(!teachingAssistantOpt.isPresent()){

            throw new TeachingAssistantDoesNotExistException("Teaching Assistant with id " + id +
                    " does not exist. It cannot be returned!");
        }

        return teachingAssistantRepository.findById(id).get();
    }

    public Instructor getInstructorByID(Long id) throws InstructorDoesNotExistException {

        Optional<Instructor> instructorOpt = instructorRepository.findById(id);
        if(!instructorOpt.isPresent()){

            throw new InstructorDoesNotExistException("Instructor with id " + id +
                    " does not exist. It cannot be returned!");
        }

        return instructorRepository.findById(id).get();
    }

    public SummerTrainingCoordinator getSummerTrainingCoordinatorByID(Long id)
            throws SummerTrainingCoordinatorDoesNotExistException {

        Optional<SummerTrainingCoordinator> summerTrainingCoordinatorOpt =
                summerTrainingCoordinatorRepository.findById(id);
        if(!summerTrainingCoordinatorOpt.isPresent()){

            throw new SummerTrainingCoordinatorDoesNotExistException("Summer Training Coordinator with id " + id +
                    " does not exist. It cannot be returned!");
        }

        return summerTrainingCoordinatorRepository.findById(id).get();
    }

    public AdministrativeAssistant getAdministrativeAssistantByID(Long id) throws AdministrativeAssistantDoesNotExistException {

        Optional<AdministrativeAssistant> administrativeAssistantOpt = administrativeAssistantRepository.findById(id);
        if(!administrativeAssistantOpt.isPresent()){

            throw new AdministrativeAssistantDoesNotExistException("Administrative Assistant with id " + id +
                    " does not exist. It cannot be returned!");
        }

        return administrativeAssistantRepository.findById(id).get();
    }

    public boolean editStudentByID(Long id, Student editedStudent) throws StudentDoesNotExistException, NullEntityException {

        Optional<Student> studentOpt = studentRepository.findById(id);
        if(!studentOpt.isPresent()){

            throw new StudentDoesNotExistException("Student with id " + id +
                    " does not exist. It cannot be edited!");
        }

        if(editedStudent == null){

            throw new NullEntityException("Student cannot be modified with a null entity!");
        }

        if(!studentRepository.findById(id).get().getCourseCode().equals(editedStudent.getCourseCode())){

            studentRepository.findById(id).get().setCourseCode(editedStudent.getCourseCode());
        }
        if(!studentRepository.findById(id).get().getLetterGrade().equals(editedStudent.getLetterGrade())){

            studentRepository.findById(id).get().setLetterGrade(editedStudent.getLetterGrade());
        }
        if(!studentRepository.findById(id).get().getCompanyName().equals(editedStudent.getCompanyName())){

            studentRepository.findById(id).get().setCompanyName(editedStudent.getCompanyName());
        }
        if(!studentRepository.findById(id).get().getInstructor().equals(editedStudent.getInstructor())){

            studentRepository.findById(id).get().setInstructor(editedStudent.getInstructor());
        }
        if(!studentRepository.findById(id).get().getTeachingAssistant().equals(editedStudent.getTeachingAssistant())){

            studentRepository.findById(id).get().setTeachingAssistant(editedStudent.getTeachingAssistant());
        }
        if(!studentRepository.findById(id).get().getCompanyEvaluationForm().equals(editedStudent.getCompanyEvaluationForm())){

            studentRepository.findById(id).get().setCompanyEvaluationForm(editedStudent.getCompanyEvaluationForm());
        }
        if(!studentRepository.findById(id).get().getReports().equals(editedStudent.getReports())){

            studentRepository.findById(id).get().setReports(editedStudent.getReports());
        }
        if(!studentRepository.findById(id).get().getGradeForm().equals(editedStudent.getGradeForm())){

            studentRepository.findById(id).get().setGradeForm(editedStudent.getGradeForm());
        }

        return true;
    }

    public boolean editTeachingAssistantByID(Long id, TeachingAssistant editedTeachingAssistant)
            throws TeachingAssistantDoesNotExistException, NullEntityException {

        Optional<TeachingAssistant> teachingAssistantOpt = teachingAssistantRepository.findById(id);
        if(!teachingAssistantOpt.isPresent()){

            throw new TeachingAssistantDoesNotExistException("Teaching Assistant with id " + id +
                    " does not exist. It cannot be edited!");
        }

        if(editedTeachingAssistant == null){

            throw new NullEntityException("Teaching Assistant cannot be modified with a null entity!");
        }

        if(!teachingAssistantRepository.findById(id).get().getStudents().equals(editedTeachingAssistant.getStudents())){

            teachingAssistantRepository.findById(id).get().setStudents(editedTeachingAssistant.getStudents());
        }
        return true;
    }
    public boolean editInstructorByID(Long id, Instructor editedInstructor)
            throws InstructorDoesNotExistException, NullEntityException {

        Optional<Instructor> instructorOpt = instructorRepository.findById(id);
        if(!instructorOpt.isPresent()){

            throw new InstructorDoesNotExistException("Instructor with id " + id +
                    " does not exist. It cannot be edited!");
        }

        if(editedInstructor == null){

            throw new NullEntityException("Instructor cannot be modified with a null entity!");
        }

        if(!instructorRepository.findById(id).get().getStudents().equals(editedInstructor.getStudents())){

            instructorRepository.findById(id).get().setStudents(editedInstructor.getStudents());
        }
        if(!instructorRepository.findById(id).get().getSignature().equals(editedInstructor.getSignature())){

            instructorRepository.findById(id).get().setSignature(editedInstructor.getSignature());
        }
        return true;
    }
    public boolean editSummerTrainingCoordinatorByID(Long id, SummerTrainingCoordinator editedSummerTrainingCoordinator)
            throws SummerTrainingCoordinatorDoesNotExistException, NullEntityException {

        Optional<SummerTrainingCoordinator> summerTrainingCoordinatorOpt =
            summerTrainingCoordinatorRepository.findById(id);
        if(!summerTrainingCoordinatorOpt.isPresent()){

            throw new SummerTrainingCoordinatorDoesNotExistException("Summer Training Coordinator with id " + id +
                    " does not exist. It cannot be edited!");
        }

        if(editedSummerTrainingCoordinator == null){

            throw new NullEntityException("Summer Training Coordinator cannot be modified with a null entity!");
        }

        if(!summerTrainingCoordinatorRepository.findById(id).get().getMadeAnnouncements()
                .equals(editedSummerTrainingCoordinator.getMadeAnnouncements())){

            summerTrainingCoordinatorRepository.findById(id).get()
                    .setMadeAnnouncements(editedSummerTrainingCoordinator.getMadeAnnouncements());
        }
        return true;
    }
    public boolean editAdministrativeAssistantByID(Long id, AdministrativeAssistant editedAdministrativeAssistant)
            throws AdministrativeAssistantDoesNotExistException, NullEntityException {

        Optional<AdministrativeAssistant> administrativeAssistantOpt =
                administrativeAssistantRepository.findById(id);
        if(!administrativeAssistantOpt.isPresent()){

            throw new AdministrativeAssistantDoesNotExistException("Administrative Assistant with id " + id +
                    " does not exist. It cannot be edited!");
        }

        if(editedAdministrativeAssistant == null){

            throw new NullEntityException("Administrative Assistant cannot be modified with a null entity!");
        }

        if(!administrativeAssistantRepository.findById(id).get().getStudentList()
                .equals(editedAdministrativeAssistant.getStudentList())){

            administrativeAssistantRepository.findById(id).get()
                    .setStudentList(editedAdministrativeAssistant.getStudentList());
        }
        if(!administrativeAssistantRepository.findById(id).get().getTeachingAssistantList()
                .equals(editedAdministrativeAssistant.getTeachingAssistantList())){

            administrativeAssistantRepository.findById(id).get()
                    .setTeachingAssistantList(editedAdministrativeAssistant.getTeachingAssistantList());
        }
        if(!administrativeAssistantRepository.findById(id).get().getInstructorList()
                .equals(editedAdministrativeAssistant.getInstructorList())){

            administrativeAssistantRepository.findById(id).get()
                    .setInstructorList(editedAdministrativeAssistant.getInstructorList());
        }
        if(!administrativeAssistantRepository.findById(id).get().getCompanyList()
                .equals(editedAdministrativeAssistant.getCompanyList())){

            administrativeAssistantRepository.findById(id).get()
                    .setCompanyList(editedAdministrativeAssistant.getCompanyList());
        }
        if(!administrativeAssistantRepository.findById(id).get().getMadeAnnouncementList()
                .equals(editedAdministrativeAssistant.getMadeAnnouncementList())){

            administrativeAssistantRepository.findById(id).get()
                    .setMadeAnnouncementList(editedAdministrativeAssistant.getMadeAnnouncementList());
        }
        return true;
    }
}