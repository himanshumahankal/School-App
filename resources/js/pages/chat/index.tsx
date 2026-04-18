import AppLayout from '@/layouts/app-layout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { MessageCircle, MoreVertical, Search, Send, User, Users, Menu, Phone, Video, Circle, Loader2, ArrowLeft, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface ChatGroup {
    id: number;
    name: string;
    type: string;
    description?: string;
    latest_message?: {
        message: string;
        user_name: string;
        created_at: string;
    };
}

interface ChatMessage {
    id: number;
    message: string;
    user_id: number;
    user_name: string;
    created_at: string;
    likes_count: number;
    liked_by_user: boolean;
    liked_by_names: string[];
}

export default function ChatIndex() {
    const { auth } = usePage().props as any;
    
    const [groups, setGroups] = useState<ChatGroup[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [filter, setFilter] = useState<'all' | 'Student' | 'Parent'>('all');
    const [isMobileView, setIsMobileView] = useState(false);
    const [likingId, setLikingId] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, reset } = useForm({
        message: '',
    });

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        if (selectedGroupId) {
            fetchMessages(selectedGroupId);
        }
    }, [selectedGroupId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchGroups = async () => {
        try {
            const res = await fetch('/chat/groups', { 
                headers: { 
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                } 
            });
            const data = await res.json();
            setGroups(data);
        } catch (error) {
            console.error('Failed to fetch groups:', error);
        }
    };

    const fetchMessages = async (groupId: number) => {
        setLoadingMessages(true);
        try {
            const res = await fetch(`/chat/group/${groupId}`, { 
                headers: { 
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                } 
            });
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoadingMessages(false);
        }
    };

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.message.trim() || !selectedGroupId) return;

        try {
            const res = await fetch('/chat/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    group_id: selectedGroupId,
                    message: data.message,
                }),
            });
            const result = await res.json();
            
            if (result.id) {
                setData('message', '');
                fetchMessages(selectedGroupId);
            }
        } catch (error) {
            console.error('Failed to send:', error);
        }
    };

    const toggleLike = async (messageId: number) => {
        if (likingId) return;
        setLikingId(messageId);
        
        try {
            const res = await fetch('/chat/like', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ message_id: messageId }),
            });
            const result = await res.json();
            
            setMessages(prev => prev.map(msg => 
                msg.id === messageId 
                ? { 
                    ...msg, 
                    likes_count: result.likes_count, 
                    liked_by_user: result.liked,
                    liked_by_names: result.liked_by_names
                  }
                : msg
            ));
        } catch (error) {
            console.error('Failed to like:', error);
        } finally {
            setLikingId(null);
        }
    };

    const filteredGroups = groups.filter(g => {
        const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase());
        let matchesFilter = true;
        if (filter === 'Student') matchesFilter = g.type?.toLowerCase().includes('student');
        if (filter === 'Parent') matchesFilter = g.type?.toLowerCase().includes('parent');
        return matchesSearch && matchesFilter;
    });

    const selectedGroup = groups.find(g => g.id === selectedGroupId);

    const formatTime = (date: string) => {
        const d = new Date(date);
        const now = new Date();
        const diff = now.getTime() - d.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (days === 1) return 'Yesterday';
        if (days < 7) return d.toLocaleDateString([], { weekday: 'short' });
        return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    return (
        <AppLayout>
            <Head title="Chat" />
            
            <div className="flex h-[calc(100vh-65px)] bg-[#0d1117] overflow-hidden">
                {/* Left Sidebar */}
                <div className={`w-[320px] flex flex-col bg-[#161b22] border-r border-[#30363d] ${isMobileView && selectedGroup ? 'hidden' : ''} ${isMobileView ? 'absolute inset-0 z-10' : ''}`}>
                    {/* Header */}
                    <div className="h-16 flex items-center justify-between px-5 border-b border-[#30363d]">
                        <h1 className="text-xl font-bold text-gray-100">Messages</h1>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-[#21262d] hover:bg-[#30363d] transition-colors">
                            <Menu className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Search & Filter */}
                    <div className="p-4 space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="Search conversations..." 
                                className="w-full bg-[#21262d] border border-[#30363d] rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            {['all', 'Student', 'Parent'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as typeof filter)}
                                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                                        filter === f 
                                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' 
                                        : 'bg-[#21262d] text-gray-400 hover:bg-[#30363d]'
                                    }`}
                                >
                                    {f === 'all' ? 'All' : f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chat List */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredGroups.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                <MessageCircle className="w-12 h-12 mb-3 opacity-50" />
                                <p className="text-sm">No conversations yet</p>
                            </div>
                        ) : (
                            filteredGroups.map((group) => (
                                <div 
                                    key={group.id}
                                    onClick={() => {
                                        setSelectedGroupId(group.id);
                                        if (isMobileView) setIsMobileView(false);
                                    }}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-[#21262d] ${
                                        selectedGroupId === group.id ? 'bg-[#21262d] border-l-4 border-rose-500' : ''
                                    }`}
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-sm font-semibold text-gray-200 truncate">{group.name}</h3>
                                            {group.latest_message && (
                                                <span className="text-xs text-gray-500 shrink-0">
                                                    {formatTime(group.latest_message.created_at)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 truncate mt-0.5">
                                            {group.latest_message?.message || 'No messages yet'}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Chat Area */}
                <div className={`flex-1 flex flex-col ${isMobileView && !selectedGroup ? 'hidden' : ''}`}>
                    {selectedGroup ? (
                        <>
                            {/* Header */}
                            <div className="h-16 flex items-center justify-between px-5 bg-[#161b22] border-b border-[#30363d]">
                                <div className="flex items-center gap-3">
                                    {isMobileView && (
                                        <button onClick={() => setSelectedGroupId(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#21262d]">
                                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                                        </button>
                                    )}
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-base font-semibold text-gray-100">{selectedGroup.name}</h2>
                                        <p className="text-xs text-gray-500 flex items-center gap-1">
                                            <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                                            {selectedGroup.type}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#21262d] transition-colors">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                    </button>
                                    <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#21262d] transition-colors">
                                        <Video className="w-5 h-5 text-gray-400" />
                                    </button>
                                    <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#21262d] transition-colors">
                                        <Search className="w-5 h-5 text-gray-400" />
                                    </button>
                                    <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#21262d] transition-colors">
                                        <MoreVertical className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-5 bg-[#0d1117]">
                                {loadingMessages ? (
                                    <div className="flex items-center justify-center h-full">
                                        <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        <p className="text-sm">No messages yet. Start the conversation!</p>
                                    </div>
                                ) : (
                                    messages.map((msg) => (
                                        <div 
                                            key={msg.id}
                                            className={`flex mb-3 ${msg.user_id === auth.user.id ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl shadow-sm ${
                                                msg.user_id === auth.user.id 
                                                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-br-md' 
                                                : 'bg-[#21262d] text-gray-200 rounded-bl-md'
                                            }`}>
                                                {msg.user_id !== auth.user.id && (
                                                    <div className="text-xs font-medium text-rose-400 mb-1">
                                                        {msg.user_name}
                                                    </div>
                                                )}
                                                <p className="text-sm leading-relaxed">{msg.message}</p>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className={`text-[10px] ${msg.user_id === auth.user.id ? 'text-white/70' : 'text-gray-500'}`}>
                                                        {formatTime(msg.created_at)}
                                                    </span>
                                                    <button 
                                                        onClick={() => toggleLike(msg.id)}
                                                        disabled={likingId === msg.id}
                                                        className={`flex items-center gap-1 text-[10px] transition-colors ${
                                                            msg.liked_by_user 
                                                            ? 'text-rose-400' 
                                                            : 'text-gray-500 hover:text-rose-400'
                                                        }`}
                                                    >
                                                        <Heart 
                                                            className={`w-3 h-3 ${msg.liked_by_user ? 'fill-rose-400' : ''}`} 
                                                        />
                                                        {msg.likes_count > 0 && (
                                                            <span>{msg.likes_count}</span>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={sendMessage} className="h-20 flex items-center px-5 gap-3 bg-[#161b22] border-t border-[#30363d]">
                                <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#21262d] transition-colors">
                                    <svg viewBox="0 0 24 24" width="20" height="20" className="text-gray-500">
                                        <path fill="currentColor" d="M19.005 12.908L11.534 20.4c-2.101 2.1-5.509 2.1-7.61 0-2.101-2.1-2.101-5.51 0-7.61l7.61-7.61a5.047 5.047 0 017.13 0c1.97 1.97 1.97 5.16 0 7.13l-7.61 7.61c-1.31 1.31-3.44 1.31-4.75 0-1.31-1.31-1.31-3.44 0-4.75l6.38-6.38a.75.75 0 011.06 1.06l-6.38 6.38c-.73.73-.73 1.91 0 2.64.73.73 1.91.73 2.64 0l7.61-7.61a3.54 3.54 0 000-5.01 3.54 3.54 0 00-5.01 0l-7.61 7.61a4.01 4.01 0 000 5.67 4.01 4.01 0 005.67 0l7.471-7.471a.75.75 0 111.061 1.06z"></path>
                                    </svg>
                                </button>
                                <input 
                                    type="text" 
                                    placeholder="Type a message..." 
                                    className="flex-1 bg-[#21262d] border border-[#30363d] rounded-full py-3 px-5 text-sm text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    disabled={processing}
                                />
                                <button 
                                    type="submit"
                                    disabled={processing || !data.message.trim()}
                                    className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                                    ) : (
                                        <Send className="w-5 h-5 text-white" />
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center bg-[#0d1117]">
                            <div className="w-24 h-24 rounded-full bg-[#161b22] flex items-center justify-center mb-4">
                                <MessageCircle className="w-12 h-12 text-gray-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-200 mb-2">Select a conversation</h2>
                            <p className="text-sm text-gray-500 text-center max-w-xs">
                                Choose a chat from the sidebar to start messaging
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}