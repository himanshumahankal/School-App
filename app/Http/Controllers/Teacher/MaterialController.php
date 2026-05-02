<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Material;
use App\Models\Teacher;
use App\Models\SchoolClass;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MaterialController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $teacher = Teacher::where('user_id', $user->id)->first();
        
        $teacherClassIds = $teacher?->classes()->distinct()->pluck('school_classes.id') ?? [];
        $teacherSubjectIds = $teacher?->subjects()->distinct()->pluck('subjects.id') ?? [];
        
        $query = Material::with(['class', 'subject'])
            ->whereIn('class_id', $teacherClassIds)
            ->whereIn('subject_id', $teacherSubjectIds);
        
        if ($request->has('search') && $request->search) {
            $query->where('title', 'like', '%'.$request->search.'%');
        }
        
        if ($request->has('class_id') && $request->class_id) {
            $query->where('class_id', $request->class_id);
        }
        
        if ($request->has('subject_id') && $request->subject_id) {
            $query->where('subject_id', $request->subject_id);
        }
        
        $materials = $query->orderBy('created_at', 'desc')->get()->map(function ($material) {
            return [
                'id' => $material->id,
                'title' => $material->title,
                'description' => $material->description,
                'file_type' => $material->file_type,
                'file_path' => $material->file_path,
                'video_url' => $material->video_url,
                'created_at' => $material->created_at,
                'class' => ['id' => $material->class->id, 'name' => $material->class->name],
                'subject' => ['id' => $material->subject->id, 'name' => $material->subject->name],
            ];
        });
        
        $teacherClasses = $teacher ? $teacher->classes()->get() : collect([]);
        $teacherSubjects = $teacher ? $teacher->subjects()->get() : collect([]);
        
        // Get unique classes using Laravel's unique on collection
        $classes = $teacherClasses->unique('name')->map(function($c) {
            return ['id' => (string)$c->id, 'name' => $c->name];
        })->values()->toArray();
        
        $subjects = $teacherSubjects->unique('id')->map(function($s) {
            return ['id' => (string)$s->id, 'name' => $s->name];
        })->values()->toArray();
        
        return inertia('teacher/materials', [
            'materials' => ['data' => $materials, 'total' => (int)$materials->count()],
            'classes' => $classes,
            'subjects' => $subjects,
            'filters' => $request->only(['search', 'class_id', 'subject_id']),
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        $teacher = Teacher::where('user_id', $user->id)->first();
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'class_id' => 'required|exists:school_classes,id',
            'subject_id' => 'required|exists:subjects,id',
            'file_type' => 'required|in:pdf,video,notes,link',
            'file_path' => 'nullable|file|mimes:pdf|max:10240',
            'video_url' => 'nullable|url',
            'notes_content' => 'nullable|string',
        ]);
        
        $filePath = null;
        if ($request->hasFile('file_path')) {
            $filePath = $request->file('file_path')->store('materials', 'public');
        }
        
        Material::create([
            'subject_id' => $validated['subject_id'],
            'class_id' => $validated['class_id'],
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'file_type' => $validated['file_type'],
            'file_path' => $filePath,
            'video_url' => $validated['video_url'] ?? null,
        ]);
        
        return redirect()->route('teacher.materials')
            ->with('success', 'Material uploaded successfully');
    }

    public function update(Request $request, Material $material)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file_type' => 'required|in:pdf,video,notes,link',
            'video_url' => 'nullable|url',
        ]);
        
        $material->update($validated);
        
        return redirect()->route('teacher.materials')
            ->with('success', 'Material updated successfully');
    }

    public function destroy(Material $material)
    {
        if ($material->file_path) {
            Storage::disk('public')->delete($material->file_path);
        }
        $material->delete();
        
        return redirect()->route('teacher.materials')
            ->with('success', 'Material deleted successfully');
    }
}