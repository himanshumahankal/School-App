<?php

namespace Database\Seeders;

use App\Models\ChatGroup;
use App\Models\ChatGroupMember;
use App\Models\SchoolClass;
use App\Models\User;
use Illuminate\Database\Seeder;

class ChatGroupSeeder extends Seeder
{
    public function run(): void
    {
        $teachers = User::where('role', 'teacher')->get();
        $parents = User::where('role', 'parent')->get();
        $students = User::where('role', 'student')->get();
        $admins = User::where('role', 'admin')->get();
        $classes = SchoolClass::all();

        $createdGroups = [];

        // Teacher Group (Admin + Teachers)
        $teacherGroup = ChatGroup::firstOrCreate(
            ['name' => 'Teacher Group'],
            [
                'type' => 'teacher_admin',
                'description' => 'Communication between Admin and Teachers',
            ]
        );
        $createdGroups[] = $teacherGroup->id;
        
        foreach ($admins as $admin) {
            ChatGroupMember::firstOrCreate([
                'chat_group_id' => $teacherGroup->id,
                'user_id' => $admin->id,
            ], ['role' => 'admin']);
        }
        foreach ($teachers as $teacher) {
            ChatGroupMember::firstOrCreate([
                'chat_group_id' => $teacherGroup->id,
                'user_id' => $teacher->id,
            ], ['role' => 'member']);
        }

        // Parent-Teacher Group (Admin + Teachers + Parents)
        $parentTeacherGroup = ChatGroup::firstOrCreate(
            ['name' => 'Parent-Teacher Group'],
            [
                'type' => 'discussion',
                'description' => 'General discussion between Parents and Teachers',
            ]
        );
        $createdGroups[] = $parentTeacherGroup->id;

        foreach ($admins as $admin) {
            ChatGroupMember::firstOrCreate([
                'chat_group_id' => $parentTeacherGroup->id,
                'user_id' => $admin->id,
            ], ['role' => 'admin']);
        }
        foreach ($teachers as $teacher) {
            ChatGroupMember::firstOrCreate([
                'chat_group_id' => $parentTeacherGroup->id,
                'user_id' => $teacher->id,
            ], ['role' => 'member']);
        }
        foreach ($parents as $parent) {
            ChatGroupMember::firstOrCreate([
                'chat_group_id' => $parentTeacherGroup->id,
                'user_id' => $parent->id,
            ], ['role' => 'member']);
        }

        // Class-wise Groups
        foreach ($classes as $class) {
            $classGroup = ChatGroup::firstOrCreate(
                ['name' => $class->name . ' Group'],
                [
                    'type' => 'class',
                    'class_id' => $class->id,
                    'description' => 'Class ' . $class->name . ' discussions',
                ]
            );
            $createdGroups[] = $classGroup->id;

            // Add students of this class
            $classStudents = $students->where('class_id', $class->id);
            foreach ($classStudents as $student) {
                ChatGroupMember::firstOrCreate([
                    'chat_group_id' => $classGroup->id,
                    'user_id' => $student->id,
                ], ['role' => 'member']);
            }

            // Add parents of students in this class
            $classParentIds = $classStudents->pluck('parent_id')->filter()->unique();
            foreach ($classParentIds as $parentId) {
                if ($parentId) {
                    ChatGroupMember::firstOrCreate([
                        'chat_group_id' => $classGroup->id,
                        'user_id' => $parentId,
                    ], ['role' => 'member']);
                }
            }

            // Add teacher of this class
            if ($class->class_teacher_id) {
                ChatGroupMember::firstOrCreate([
                    'chat_group_id' => $classGroup->id,
                    'user_id' => $class->class_teacher_id,
                ], ['role' => 'member']);
            }

            // Add admins
            foreach ($admins as $admin) {
                ChatGroupMember::firstOrCreate([
                    'chat_group_id' => $classGroup->id,
                    'user_id' => $admin->id,
                ], ['role' => 'admin']);
            }
        }

        echo "Created " . count($createdGroups) . " chat groups\n";
    }
}