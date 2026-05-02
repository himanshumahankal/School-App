import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { ArrowLeft, Plus, MessageCircle, Users, Settings, Trash2, Pencil } from 'lucide-react';
import { useState } from 'react';

interface ChatGroup {
    id: number;
    name: string;
    type: string;
    permission: string;
    class: { id: number; name: string } | null;
    member_count: number;
}

interface PageProps {
    groups: { data: ChatGroup[]; total: number };
    classes: { id: number; name: string }[];
}

export default function ChatGroupsIndex() {
    const { groups, classes } = usePage<PageProps>().props;
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingGroup, setEditingGroup] = useState<ChatGroup | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        type: 'class',
        permission: 'interactive',
        class_id: '',
        description: '',
    });

    const filteredGroups = groups.data.filter(g => 
        g.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingGroup 
            ? route('admin.chat-groups.update', editingGroup.id)
            : route('admin.chat-groups.store');
        const method = editingGroup ? 'put' : 'post';
        
        router[method](url, formData);
        setShowModal(false);
        setEditingGroup(null);
        setFormData({ name: '', type: 'class', permission: 'interactive', class_id: '', description: '' });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this chat group?')) {
            router.delete(route('admin.chat-groups.destroy', id));
        }
    };

    const permissionLabels: Record<string, string> = {
        broadcast: 'Broadcast (Teacher only)',
        interactive: 'Interactive (Everyone)',
        readonly: 'Read Only (View only)',
    };

    return (
        <AppLayout>
            <Head title="Chat Groups" />
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
                <div className="mb-8 flex items-center gap-4">
                    <Link
                        href="/admin/dashboard"
                        className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-2.5 transition-all hover:border-slate-600 hover:bg-slate-700"
                    >
                        <ArrowLeft className="h-5 w-5 text-slate-400" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white">Chat Groups</h1>
                        <p className="mt-1 text-slate-400">Manage class chat groups</p>
                    </div>
                    <button
                        onClick={() => { setShowModal(true); setEditingGroup(null); setFormData({ name: '', type: 'class', permission: 'interactive', class_id: '', description: '' }); }}
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 font-medium text-white"
                    >
                        <Plus className="h-4 w-4" />
                        Create Group
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-800/20 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-blue-300">Total Groups</p>
                                <p className="text-3xl font-bold text-white">{groups.total}</p>
                            </div>
                            <MessageCircle className="h-8 w-8 text-blue-400" />
                        </div>
                    </div>
                    <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-600/20 to-green-800/20 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-300">Broadcast Groups</p>
                                <p className="text-3xl font-bold text-white">{groups.data.filter(g => g.permission === 'broadcast').length}</p>
                            </div>
                            <Users className="h-8 w-8 text-green-400" />
                        </div>
                    </div>
                    <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-purple-800/20 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-purple-300">Interactive Groups</p>
                                <p className="text-3xl font-bold text-white">{groups.data.filter(g => g.permission === 'interactive').length}</p>
                            </div>
                            <Settings className="h-8 w-8 text-purple-400" />
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50">
                    <div className="p-4 border-b border-slate-700/50">
                        <input
                            type="text"
                            placeholder="Search groups..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full max-w-sm rounded-xl border border-slate-600/50 bg-slate-900/50 py-2.5 px-4 text-white"
                        />
                    </div>
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-900/50">
                                <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Group</th>
                                <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Type</th>
                                <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Permission</th>
                                <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Members</th>
                                <th className="px-6 py-4 text-left text-xs text-slate-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {filteredGroups.map(group => (
                                <tr key={group.id} className="hover:bg-slate-700/30">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                                                <MessageCircle className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{group.name}</p>
                                                <p className="text-xs text-slate-500">{group.class?.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-lg text-xs bg-slate-700 text-slate-300">{group.type}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-lg text-xs ${
                                            group.permission === 'broadcast' ? 'bg-amber-500/20 text-amber-300' :
                                            group.permission === 'interactive' ? 'bg-green-500/20 text-green-300' :
                                            'bg-red-500/20 text-red-300'
                                        }`}>
                                            {permissionLabels[group.permission]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">{group.member_count}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => { setEditingGroup(group); setFormData({ name: group.name, type: group.type, permission: group.permission, class_id: group.class?.id?.toString() || '', description: '' }); setShowModal(true); }}
                                                className="p-2 hover:bg-slate-600/50 rounded-lg"
                                            >
                                                <Pencil className="h-4 w-4 text-slate-400" />
                                            </button>
                                            <button onClick={() => handleDelete(group.id)} className="p-2 hover:bg-red-500/20 rounded-lg">
                                                <Trash2 className="h-4 w-4 text-red-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700">
                            <h2 className="text-xl font-bold text-white mb-4">{editingGroup ? 'Edit' : 'Create'} Chat Group</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Group Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                    >
                                        <option value="class">Class</option>
                                        <option value="staff">Staff</option>
                                        <option value="personal">Personal</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Permission</label>
                                    <select
                                        value={formData.permission}
                                        onChange={(e) => setFormData({...formData, permission: e.target.value})}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                    >
                                        <option value="broadcast">Broadcast (Teacher only)</option>
                                        <option value="interactive">Interactive (Everyone)</option>
                                        <option value="readonly">Read Only (View only)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1">Class</label>
                                    <select
                                        value={formData.class_id}
                                        onChange={(e) => setFormData({...formData, class_id: e.target.value})}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 py-2.5 px-4 text-white"
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="flex gap-3">
                                    <button type="submit" className="flex-1 bg-blue-600 py-2.5 rounded-xl text-white font-medium">
                                        {editingGroup ? 'Update' : 'Create'}
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