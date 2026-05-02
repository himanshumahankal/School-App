import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { ArrowLeft, Plus, Search, FileText, Video, Link as LinkIcon, Trash2, Pencil, FileBox, Download, X, FolderOpen } from 'lucide-react';
import { useState } from 'react';

interface Material {
    id: number;
    title: string;
    description: string;
    file_type: string;
    file_path: string;
    video_url: string;
    created_at: string;
    class: { id: number; name: string };
    subject: { id: number; name: string };
}

interface PageProps {
    materials: { data: Material[]; total: number };
    classes: { id: number; name: string }[];
    subjects: { id: number; name: string }[];
    filters: { search?: string; class_id?: string; subject_id?: string };
}

export default function TeacherMaterials() {
    const { materials, classes, subjects, filters } = usePage<PageProps>().props;
    const [search, setSearch] = useState(filters.search || '');
    const [selectedClass, setSelectedClass] = useState(filters.class_id || '');
    const [selectedSubject, setSelectedSubject] = useState(filters.subject_id || '');
    const [showModal, setShowModal] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        class_id: '',
        subject_id: '',
        file_type: 'notes',
        video_url: '',
    });

    const filteredMaterials = materials.data.filter(m => {
        const matchesSearch = !search || m.title.toLowerCase().includes(search.toLowerCase());
        const matchesClass = !selectedClass || m.class.id.toString() === selectedClass;
        const matchesSubject = !selectedSubject || m.subject.id.toString() === selectedSubject;
        return matchesSearch && matchesClass && matchesSubject;
    });

    const fileTypeIcons: Record<string, any> = {
        pdf: FileText,
        video: Video,
        notes: FileBox,
        link: LinkIcon,
    };

    const handleFilter = (key: string, value: string) => {
        const params: any = {};
        if (key === 'search') params.search = value;
        else if (key === 'class') params.class_id = value;
        else if (key === 'subject') params.subject_id = value;
        router.get('/teacher/materials', params, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this material?')) {
            router.delete(route('teacher.materials.destroy', id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingMaterial 
            ? route('teacher.materials.update', editingMaterial.id)
            : route('teacher.materials.store');
        
        if (editingMaterial) {
            router.put(url, formData, {
                onSuccess: () => {
                    setShowModal(false);
                    setEditingMaterial(null);
                    resetForm();
                },
            });
        } else {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description || '');
            data.append('class_id', formData.class_id);
            data.append('subject_id', formData.subject_id);
            data.append('file_type', formData.file_type);
            data.append('video_url', formData.video_url || '');
            if (selectedFile) {
                data.append('file_path', selectedFile);
            }
            
            router.post(url, data, {
                forceFormData: true,
                onStart: () => setUploadProgress(true),
                onFinish: () => setUploadProgress(false),
                onSuccess: () => {
                    setShowModal(false);
                    setEditingMaterial(null);
                    resetForm();
                },
            });
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', class_id: '', subject_id: '', file_type: 'notes', video_url: '' });
        setSelectedFile(null);
    };

    return (
        <AppLayout>
            <Head title="Study Materials" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
                <div className="mb-8 flex items-center gap-4">
                    <Link
                        href="/teacher/dashboard"
                        className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-2.5 transition-all hover:border-slate-600 hover:bg-slate-700"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-400" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white">Study Materials</h1>
                        <p className="mt-1 text-slate-400">Upload and manage class materials</p>
                    </div>
                    <button
                        onClick={() => { setShowModal(true); setEditingMaterial(null); resetForm(); }}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 px-5 py-2.5 font-medium text-white"
                    >
                        <Plus className="h-4 w-4" />
                        Upload Material
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-purple-300">Total Materials</p>
                                <p className="text-3xl font-bold text-white">{materials.total}</p>
                            </div>
                            <FolderOpen className="h-8 w-8 text-purple-400" />
                        </div>
                    </div>
                    <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600/20 to-red-800/20 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-300">PDF Files</p>
                                <p className="text-3xl font-bold text-white">{materials.data.filter(m => m.file_type === 'pdf').length}</p>
                            </div>
                            <FileText className="h-8 w-8 text-red-400" />
                        </div>
                    </div>
                    <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-300">Videos</p>
                                <p className="text-3xl font-bold text-white">{materials.data.filter(m => m.file_type === 'video').length}</p>
                            </div>
                            <Video className="h-8 w-8 text-blue-400" />
                        </div>
                    </div>
                    <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-600/20 to-green-800/20 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-300">Notes</p>
                                <p className="text-3xl font-bold text-white">{materials.data.filter(m => m.file_type === 'notes').length}</p>
                            </div>
                            <FileBox className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 mb-6">
                    <div className="p-4 flex flex-wrap gap-4">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search materials..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); handleFilter('search', e.target.value); }}
                                className="w-full rounded-xl border border-slate-600/50 bg-slate-900/50 py-2.5 pl-10 pr-4 text-white"
                            />
                        </div>
                        <select
                            value={selectedClass}
                            onChange={(e) => { setSelectedClass(e.target.value); handleFilter('class', e.target.value); }}
                            className="min-w-[150px] rounded-xl border border-slate-600/50 bg-slate-900/50 py-2.5 px-4 text-white"
                        >
                            <option value="">All Classes</option>
                            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <select
                            value={selectedSubject}
                            onChange={(e) => { setSelectedSubject(e.target.value); handleFilter('subject', e.target.value); }}
                            className="min-w-[150px] rounded-xl border border-slate-600/50 bg-slate-900/50 py-2.5 px-4 text-white"
                        >
                            <option value="">All Subjects</option>
                            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMaterials.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <FolderOpen className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                            <p className="text-xl text-slate-400">No materials found</p>
                            <p className="text-slate-500">Upload your first material</p>
                        </div>
                    ) : (
                        filteredMaterials.map(material => {
                            const Icon = fileTypeIcons[material.file_type] || FileText;
                            return (
                                <div key={material.id} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-purple-500/30 transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => { setEditingMaterial(material); setFormData({ title: material.title, description: material.description || '', class_id: material.class.id.toString(), subject_id: material.subject.id.toString(), file_type: material.file_type, video_url: material.video_url || '' }); setShowModal(true); }}
                                                className="p-2 hover:bg-slate-700 rounded-lg"
                                            >
                                                <Pencil className="h-4 w-4 text-slate-400" />
                                            </button>
                                            <button onClick={() => handleDelete(material.id)} className="p-2 hover:bg-red-500/20 rounded-lg">
                                                <Trash2 className="h-4 w-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-white mb-1">{material.title}</h3>
                                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">{material.description || 'No description'}</p>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-1 rounded-lg text-xs bg-purple-500/20 text-purple-300">{material.class.name}</span>
                                        <span className="px-2 py-1 rounded-lg text-xs bg-blue-500/20 text-blue-300">{material.subject.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>{material.created_at}</span>
                                        {material.file_path && (
                                            <a href={`/storage/${material.file_path}`} download className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                                                <Download className="h-3 w-3" />
                                                Download
                                            </a>
                                        )}
                                        {material.video_url && (
                                            <a href={material.video_url} target="_blank" className="flex items-center gap-1 text-red-400 hover:text-red-300">
                                                <Video className="h-3 w-3" />
                                                Watch
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-lg border border-slate-700 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">{editingMaterial ? 'Edit' : 'Upload'} Material</h2>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-700 rounded-lg">
                                    <X className="h-5 w-5 text-slate-400" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                        rows={3}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Class</label>
                                        <select
                                            value={formData.class_id}
                                            onChange={(e) => setFormData({...formData, class_id: e.target.value})}
                                            className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                            required
                                        >
                                            <option value="">Select Class</option>
                                            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Subject</label>
                                        <select
                                            value={formData.subject_id}
                                            onChange={(e) => setFormData({...formData, subject_id: e.target.value})}
                                            className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                            required
                                        >
                                            <option value="">Select Subject</option>
                                            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Material Type</label>
                                    <select
                                        value={formData.file_type}
                                        onChange={(e) => setFormData({...formData, file_type: e.target.value})}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                    >
                                        <option value="pdf">PDF File</option>
                                        <option value="video">Video URL</option>
                                        <option value="notes">Notes</option>
                                        <option value="link">External Link</option>
                                    </select>
                                </div>
                                {(formData.file_type === 'video' || formData.file_type === 'link') && (
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">URL</label>
                                        <input
                                            type="url"
                                            value={formData.video_url}
                                            onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                                            placeholder="https://..."
                                            className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                        />
                                    </div>
                                )}
                                {formData.file_type === 'pdf' && (
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1">Upload PDF</label>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                            className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                        />
                                        {selectedFile && (
                                            <p className="mt-1 text-xs text-green-400">Selected: {selectedFile.name}</p>
                                        )}
                                    </div>
                                )}
                                <div className="flex gap-3 pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={uploadProgress}
                                        className="flex-1 bg-purple-600 py-2.5 rounded-xl text-white font-medium disabled:opacity-50"
                                    >
                                        {uploadProgress ? 'Uploading...' : (editingMaterial ? 'Update' : 'Upload')}
                                    </button>
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-slate-600 py-2.5 rounded-xl text-slate-300">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}