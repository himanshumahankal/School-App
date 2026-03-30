import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface ChatGroup {
    id: number;
    name: string;
    type: string;
    description: string | null;
    latest_message: {
        message: string;
        user_name: string;
        created_at: string;
    } | null;
}

interface Message {
    id: number;
    message: string;
    user_id: number;
    user_name: string;
    created_at: string;
}

export default function ChatIndex() {
    const { groups } = usePage<{ groups: ChatGroup[] }>().props;
    const [selectedGroup, setSelectedGroup] = useState<ChatGroup | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const { data, setData, post, processing, reset } = useForm({
        message: '',
    });

    const loadMessages = (groupId: number) => {
        fetch(`/chat/group/${groupId}`)
            .then(res => res.json())
            .then(data => setMessages(data))
            .catch(err => console.error('Failed to load messages:', err));
    };

    useEffect(() => {
        if (selectedGroup) {
            loadMessages(selectedGroup.id);
            const interval = setInterval(() => loadMessages(selectedGroup.id), 5000);
            return () => clearInterval(interval);
        }
    }, [selectedGroup]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedGroup || !data.message.trim()) return;

        post(route('chat.send', { group_id: selectedGroup.id }), {
            onSuccess: () => {
                reset('message');
                loadMessages(selectedGroup.id);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Chat" />
            <div className="flex h-[calc(100vh-64px)]">
                <div className="w-80 border-r border-gray-200 bg-white">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Chat Groups</h2>
                    </div>
                    <div className="overflow-y-auto h-full">
                        {groups.map((group) => (
                            <button
                                key={group.id}
                                onClick={() => setSelectedGroup(group)}
                                className={`w-full p-4 text-left border-b hover:bg-gray-50 ${
                                    selectedGroup?.id === group.id ? 'bg-blue-50' : ''
                                }`}
                            >
                                <div className="font-medium">{group.name}</div>
                                <div className="text-xs text-gray-500 uppercase">{group.type}</div>
                                {group.latest_message && (
                                    <div className="text-sm text-gray-600 mt-1 truncate">
                                        {group.latest_message.user_name}: {group.latest_message.message}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    {selectedGroup ? (
                        <>
                            <div className="p-4 border-b bg-white">
                                <h2 className="text-lg font-semibold">{selectedGroup.name}</h2>
                                <p className="text-sm text-gray-500">{selectedGroup.description}</p>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.user_id === 1 ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs rounded-lg p-3 ${
                                                msg.user_id === 1
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-white border'
                                            }`}
                                        >
                                            <div className="text-xs font-semibold mb-1">{msg.user_name}</div>
                                            <div>{msg.message}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={sendMessage} className="p-4 border-t bg-white">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-2 border rounded-lg"
                                        disabled={processing}
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing || !data.message.trim()}
                                        className="px-6 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            Select a chat group to start messaging
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
