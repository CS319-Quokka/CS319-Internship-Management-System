package com.quokka.backend.controller;

import com.quokka.backend.Auth.AuthResponse;
import com.quokka.backend.models.TeachingAssistant;
import com.quokka.backend.models.User;
import com.quokka.backend.models.UserAccount;
import com.quokka.backend.request.*;
import com.quokka.backend.service.AccountService;
import com.quokka.backend.service.EmailSenderService;
import com.quokka.backend.service.UserManagementService;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountService accountService;
    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    private UserManagementService userManagementService;

    @PostMapping("/api/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UserAccount userAccount) {

        AuthResponse response = new AuthResponse();
        try {

            boolean isLoginSuccessful = accountService.checkCredentials(userAccount.getEmail(), userAccount.getPassword());
            if (isLoginSuccessful) {

                UserAccount user = accountService.findByEmail(userAccount.getEmail()); // get the user object

                response.setId(user.getId());
                response.setEmail(user.getEmail());
                return ResponseEntity.ok(response);
            }
            else {

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        }
        catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/addAccounts")
    public ResponseEntity<String> addAccounts(@RequestParam("file") MultipartFile file) {
        try {
            // Parse the file
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            while (rows.hasNext()) {
                Row currentRow = rows.next();

                // Skip header
                if (currentRow.getRowNum() == 0) {
                    continue;
                }

                Cell emailCell = currentRow.getCell(0);
                Cell firstNameCell = currentRow.getCell(1);
                Cell lastNameCell = currentRow.getCell(2);
                Cell departmentCell = currentRow.getCell(3);
                Cell roleCell = currentRow.getCell(4);
                Cell courseCodeCell = currentRow.getCell(5);
                Cell companyNameCell = currentRow.getCell(6);
                Cell instructorIdCell = currentRow.getCell(7);
                Cell teachingAssistantIdCell = currentRow.getCell(8);

                UserAccount userAccount = new UserAccount();
                userAccount.setEmail(emailCell.getStringCellValue());
                userAccount.setFirstName(firstNameCell.getStringCellValue());
                userAccount.setLastName(lastNameCell.getStringCellValue());
                userAccount.setDepartment(departmentCell.getStringCellValue());

                // Generate password
                String password = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 15);

                // Set the generated password to the userAccount
                userAccount.setPassword(password);
                emailSenderService.sendMail(userAccount.getEmail(), "Your password is: " + password,
                        "Internship Management System Password");
                accountService.addUserAccount(userAccount);

                if (roleCell.getStringCellValue().equals("Student")) {
                    StudentAddRequest studentAddRequest = new StudentAddRequest();

                    studentAddRequest.setAccountId(userAccount.getId());
                    studentAddRequest.setCourseCode(courseCodeCell.getStringCellValue());
                    studentAddRequest.setCompanyName(companyNameCell.getStringCellValue());
                    studentAddRequest.setInstructorId((long) instructorIdCell.getNumericCellValue()); // ??
                    studentAddRequest.setTeachingAssistantId((long) teachingAssistantIdCell.getNumericCellValue()); // ??
                    userManagementService.addStudent(studentAddRequest);
                } else if (roleCell.getStringCellValue().equals("Teaching Assistant")) {
                    TeachingAssistantAddRequest teachingAssistantAddRequest = new TeachingAssistantAddRequest();
                    teachingAssistantAddRequest.setAccountId(userAccount.getId());
                    userManagementService.addTeachingAssistant(teachingAssistantAddRequest);
                } else if (roleCell.getStringCellValue().equals("Instructor")) {
                    InstructorAddRequest instructorAddRequest = new InstructorAddRequest();
                    instructorAddRequest.setAccountId(userAccount.getId());
                    userManagementService.addInstructor(instructorAddRequest);
                } else if (roleCell.getStringCellValue().equals("Summer Training Coordinator")) {
                    SummerTrainingCoordinatorAddRequest summerTrainingCoordinatorAddRequest = new SummerTrainingCoordinatorAddRequest();
                    summerTrainingCoordinatorAddRequest.setAccountId(userAccount.getId());
                    userManagementService.addSummerTrainingCoordinator(summerTrainingCoordinatorAddRequest);
                } else if (roleCell.getStringCellValue().equals("Administrative Assistant")) {
                    AdministrativeAssistantAddRequest administrativeAssistantAddRequest = new AdministrativeAssistantAddRequest();
                    administrativeAssistantAddRequest.setAccountId(userAccount.getId());
                    userManagementService.addAdministrativeAssistant(administrativeAssistantAddRequest);
                }
            }
            workbook.close();
            return new ResponseEntity<>("Accounts added successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping
    public UserAccount addAccount(@RequestBody UserAccount userAccount){

        String password = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 15);

        // Set the generated password to the userAccount
        userAccount.setPassword(password);
        emailSenderService.sendMail(userAccount.getEmail(), "Your password is: " + password,
                "Internship Management System Password");
        return accountService.addUserAccount(userAccount);
    }

    @GetMapping
    public List<UserAccount> getAllAccounts(@RequestParam Optional<String> department){

        return accountService.getAllAccounts( department);
    }

    @GetMapping("/get_account/{id}")
    public UserAccount getAccountById(@PathVariable Long id){

        return accountService.getAccountById(id);
    }

    @GetMapping("/get_account_by_email/{email}")
    public UserAccount getAccountByEmail(@PathVariable String email){

        return accountService.getAccountByEmail(email);
    }

    @PutMapping("/{id}")
    public UserAccount editAccount(@PathVariable Long id, @RequestBody UserAccount newAccount){

        return accountService.editAccount(id, newAccount);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id){

        List<User> usersList = userManagementService.getProfilesByAccountId(id);
        for(User user : usersList){

            if(user.getRole().equals("Student")){

                userManagementService.removeStudentByID(user.getId());
            } else if(user.getRole().equals("Teaching Assistant")){

                userManagementService.removeTeachingAssistantByID(user.getId());
            } else if(user.getRole().equals("Instructor")){

                userManagementService.removeInstructorByID(user.getId());
            } else if(user.getRole().equals("Summer Training Coordinator")){

                userManagementService.removeSummerTrainingCoordinatorByID(user.getId());
            } else if(user.getRole().equals("Administrative Assistant")){

                userManagementService.removeAdministrativeAssistantByID(user.getId());
            }
        }
        accountService.deleteAccount(id);
        return new ResponseEntity<>("Account deleted successfully", HttpStatus.OK);
    }

    @DeleteMapping
    public void deleteAllAccounts(){

        userManagementService.removeAllStudents();
        userManagementService.removeAllInstructors();
        userManagementService.removeAllAdministrativeAssistants();
        userManagementService.removeAllTeachingAssistants();
        userManagementService.removeAllSummerTrainingCoordinators();
        accountService.deleteAllAccounts();
    }

    @PatchMapping("/{id}")
    public int changePassword(@PathVariable Long id, ChangePasswordRequest request){

        return accountService.changePassword(id, request);
    }
}
