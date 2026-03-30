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

        $class1 = SchoolClass::create([
            'name' => 'Class 9',
            'section' => 'A',
            'academic_year' => 2026,
            'description' => 'Class 9 Section A',
        ]);

        $class2 = SchoolClass::create([
            'name' => 'Class 9',
            'section' => 'B',
            'academic_year' => 2026,
            'description' => 'Class 9 Section B',
        ]);

        $class = SchoolClass::create([
            'name' => 'Class 10',
            'section' => 'A',
            'academic_year' => 2026,
            'description' => 'Class 10 Section A',
        ]);

        $student = Student::create([
            'user_id' => $studentUser->id,
            'class_id' => $class->id,
            'name' => 'Test Student',
            'roll_number' => '001',
            'date_of_birth' => '2010-01-15',
            'gender' => 'male',
            'phone' => '5555555555',
            'address' => 'Student Address',
            'admission_date' => now(),
        ]);

        $student->parents()->attach($parent->id, ['relation' => 'father']);

        $math = Subject::create(['name' => 'Mathematics', 'code' => 'MATH']);
        $science = Subject::create(['name' => 'Science', 'code' => 'SCI']);
        $english = Subject::create(['name' => 'English', 'code' => 'ENG']);
        $history = Subject::create(['name' => 'History', 'code' => 'HIST']);
        $geography = Subject::create(['name' => 'Geography', 'code' => 'GEO']);

        \DB::table('teacher_subject_class')->insert([
            ['teacher_id' => $teacher->id, 'subject_id' => $math->id, 'class_id' => $class->id, 'created_at' => now(), 'updated_at' => now()],
            ['teacher_id' => $teacher->id, 'subject_id' => $science->id, 'class_id' => $class->id, 'created_at' => now(), 'updated_at' => now()],
        ]);

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
            'name' => 'Class 10A',
            'type' => 'class',
            'class_id' => $class->id,
            'description' => 'Class 10A group',
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
