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

        //ToDo
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

        //ToDo
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

        //ToDo
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

        //ToDo
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

        //ToDo
        return true;
    }
}