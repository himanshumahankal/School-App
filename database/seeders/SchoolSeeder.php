<?php

namespace Database\Seeders;

use App\Models\ChatGroup;
use App\Models\ChatGroupMember;
use App\Models\ParentModel;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        $adminUser = User::create([
            'name' => 'Admin',
            'email' => 'admin@school.com',
            'password' => Hash::make('123456'),
            'role' => 'admin',
        ]);

        $teacherUser = User::create([
            'name' => 'Test Teacher',
            'email' => 'test_teacher@school.com',
            'password' => Hash::make('123456'),
            'role' => 'teacher',
        ]);

        $teacher = Teacher::create([
            'user_id' => $teacherUser->id,
            'employee_id' => 'EMP001',
            'name' => 'Test Teacher',
            'qualification' => 'M.Sc',
            'phone' => '1234567890',
            'joining_date' => now(),
            'address' => 'Teacher Address',
        ]);

        $parentUser = User::create([
            'name' => 'Test Parent',
            'email' => 'test_parent@school.com',
            'password' => Hash::make('123456'),
            'role' => 'parent',
        ]);

        $parent = ParentModel::create([
            'user_id' => $parentUser->id,
            'name' => 'Test Parent',
            'email' => 'test_parent@school.com',
            'phone' => '9876543210',
            'occupation' => 'Business',
            'address' => 'Parent Address',
        ]);

        $studentUser = User::create([
            'name' => 'Test Student',
            'email' => 'test_student@school.com',
            'password' => Hash::make('123456'),
            'role' => 'student',
        ]);

        $classes = [];
        $sections = ['A', 'B', 'C'];

        for ($classNum = 1; $classNum <= 10; $classNum++) {
            foreach ($sections as $section) {
                $classes[] = SchoolClass::create([
                    'name' => 'Class '.$classNum,
                    'section' => $section,
                    'academic_year' => 2026,
                    'description' => 'Class '.$classNum.' Section '.$section,
                ]);
            }
        }

        $testStudent = Student::create([
            'user_id' => $studentUser->id,
            'class_id' => $classes[0]->id,
            'name' => 'Test Student',
            'roll_number' => '001',
            'date_of_birth' => '2010-01-15',
            'gender' => 'male',
            'phone' => '5555555555',
            'address' => 'Student Address',
            'admission_date' => now(),
        ]);

        $testStudent->parents()->attach($parent->id, ['relation' => 'father']);

        $studentNames = [
            'Aarav Patel', 'Aadhira Sharma', 'Aarush Gupta', 'Ananya Singh', 'Arjun Verma',
            'Diya Kapoor', 'Vivaan Reddy', 'Ishita Nair', 'Reyansh Kumar', 'Kavya Joshi',
            'Shriya Mehta', 'Aditya Iyer', 'Anika Chatterjee', 'Kabir Malhotra', 'Myra Das',
            'Rudra Banerjee', 'Prisha Khatri', 'Shaurya Shah', 'Ira Saxena', 'Ritwik Gupta',
            'Aarohi Desai', 'Vihaan Rao', 'Navya Menon', 'Ayaan Khan', 'Saisha Patel',
            'Madhav Bhatt', 'Riya Deshmukh', 'Hiranv Reddy', 'Anvi Sharma', 'Ritij Grover',
            'Yashika Tiwari', 'Devansh Agarwal', 'Shreya Mishra', 'Omkar Kulkarni', 'Ananya Yadav',
            'Kian Shah', 'Myra Singh', 'Lakshit Verma', 'Ishani Patel', 'Aarnav Kumar',
            'Kriti Choudhary', 'Parthiv Mehta', 'Nayantara Bose', 'Rian Kapoor', 'Samaira Jain',
            'Arin Srivastava', 'Tanvi Mukherjee', 'Yug Dey', 'Rhea Banerjee', 'Harshvardhan Rao',
        ];

        $genders = ['male', 'female'];
        $studentIndex = 0;
        $rollNumber = 1;
        $globalStudentIndex = 0;

        foreach ($classes as $class) {
            $studentsInClass = rand(15, 25);

            for ($i = 0; $i < $studentsInClass; $i++) {
                $studentName = $studentNames[$studentIndex % count($studentNames)];
                $firstName = explode(' ', $studentName)[0];
                $email = strtolower(str_replace(' ', '.', $firstName)).$globalStudentIndex.'@student.com';

                $studentUser = User::create([
                    'name' => $studentName,
                    'email' => $email,
                    'password' => Hash::make('123456'),
                    'role' => 'student',
                ]);

                $year = rand(2008, 2015);
                $month = rand(1, 12);
                $day = rand(1, 28);

                $student = Student::create([
                    'user_id' => $studentUser->id,
                    'class_id' => $class->id,
                    'name' => $studentName,
                    'roll_number' => str_pad($rollNumber, 3, '0', STR_PAD_LEFT),
                    'date_of_birth' => sprintf('%d-%02d-%02d', $year, $month, $day),
                    'gender' => $genders[array_rand($genders)],
                    'phone' => '555'.rand(1000000, 9999999),
                    'address' => rand(1, 999).' Main Street, Neral',
                    'admission_date' => now()->subDays(rand(30, 365)),
                ]);

                if ($studentIndex % 3 == 0) {
                    $student->parents()->attach($parent->id, ['relation' => 'father']);
                }

                $rollNumber++;
                $studentIndex++;
                $globalStudentIndex++;
            }

            $rollNumber = 1;
        }

        $math = Subject::create(['name' => 'Mathematics', 'code' => 'MATH']);
        $science = Subject::create(['name' => 'Science', 'code' => 'SCI']);
        $english = Subject::create(['name' => 'English', 'code' => 'ENG']);
        $history = Subject::create(['name' => 'History', 'code' => 'HIST']);
        $geography = Subject::create(['name' => 'Geography', 'code' => 'GEO']);
        $hindi = Subject::create(['name' => 'Hindi', 'code' => 'HIN']);
        $marathi = Subject::create(['name' => 'Marathi', 'code' => 'MAR']);

        foreach ($classes as $class) {
            \DB::table('teacher_subject_class')->insert([
                ['teacher_id' => $teacher->id, 'subject_id' => $math->id, 'class_id' => $class->id, 'created_at' => now(), 'updated_at' => now()],
                ['teacher_id' => $teacher->id, 'subject_id' => $science->id, 'class_id' => $class->id, 'created_at' => now(), 'updated_at' => now()],
                ['teacher_id' => $teacher->id, 'subject_id' => $english->id, 'class_id' => $class->id, 'created_at' => now(), 'updated_at' => now()],
            ]);
        }

        $announcementGroup = ChatGroup::create([
            'name' => 'Announcements',
            'type' => 'announcement',
            'description' => 'School announcements',
        ]);
        ChatGroupMember::create([
            'chat_group_id' => $announcementGroup->id,
            'user_id' => $adminUser->id,
            'role' => 'admin',
        ]);

        $discussionGroup = ChatGroup::create([
            'name' => 'Discussion',
            'type' => 'discussion',
            'description' => 'General discussion',
        ]);
        ChatGroupMember::create([
            'chat_group_id' => $discussionGroup->id,
            'user_id' => $adminUser->id,
            'role' => 'admin',
        ]);
        ChatGroupMember::create([
            'chat_group_id' => $discussionGroup->id,
            'user_id' => $parentUser->id,
            'role' => 'member',
        ]);

        $complaintGroup = ChatGroup::create([
            'name' => 'Complaints',
            'type' => 'complaint',
            'description' => 'Parent complaints and feedback',
        ]);
        ChatGroupMember::create([
            'chat_group_id' => $complaintGroup->id,
            'user_id' => $adminUser->id,
            'role' => 'admin',
        ]);
        ChatGroupMember::create([
            'chat_group_id' => $complaintGroup->id,
            'user_id' => $parentUser->id,
            'role' => 'member',
        ]);

        $classGroup = ChatGroup::create([
            'name' => 'Class 1A',
            'type' => 'class',
            'class_id' => $classes[0]->id,
            'description' => 'Class 1A group',
        ]);
        ChatGroupMember::create([
            'chat_group_id' => $classGroup->id,
            'user_id' => $adminUser->id,
            'role' => 'admin',
        ]);
        ChatGroupMember::create([
            'chat_group_id' => $classGroup->id,
            'user_id' => $teacherUser->id,
            'role' => 'admin',
        ]);
        ChatGroupMember::create([
            'chat_group_id' => $classGroup->id,
            'user_id' => $studentUser->id,
            'role' => 'member',
        ]);
        ChatGroupMember::create([
            'chat_group_id' => $classGroup->id,
            'user_id' => $parentUser->id,
            'role' => 'member',
        ]);
    }
}
